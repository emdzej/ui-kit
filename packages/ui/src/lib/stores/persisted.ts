import { writable, type Writable, get } from 'svelte/store';
import { BROWSER } from 'esm-env';

export interface PersistedStoreOptions<T> {
	/** localStorage key */
	key: string;
	/** Initial/default value when nothing is stored */
	initial: T;
	/**
	 * Optional custom serializer. Defaults to JSON.stringify/JSON.parse.
	 * Useful for Map, Set, or other non-plain-JSON types.
	 */
	serialize?: (value: T) => string;
	/**
	 * Optional custom deserializer. Defaults to JSON.parse.
	 * Should return `undefined` if the stored data is invalid/corrupt.
	 */
	deserialize?: (raw: string) => T | undefined;
}

export interface PersistedStore<T> {
	/** The Svelte readable store (subscribe only) */
	subscribe: Writable<T>['subscribe'];
	/** Update the store value */
	set: (value: T) => void;
	/** Update the store value via an updater function */
	update: (updater: (current: T) => T) => void;
	/** Get the current value synchronously */
	get: () => T;
	/** Reset to initial value and clear localStorage */
	reset: () => void;
	/** Export current value as a JSON string */
	exportJSON: () => string;
	/**
	 * Import data from a JSON string.
	 * Returns `{ success: true }` or `{ success: false, error: string }`.
	 * By default replaces the current value. Pass a `merge` function to
	 * combine imported data with the current value.
	 */
	importJSON: (
		json: string,
		merge?: (current: T, imported: T) => T
	) => { success: true } | { success: false; error: string };
}

/**
 * Creates a Svelte store backed by localStorage with JSON serialization.
 *
 * SSR-safe: on the server, the store uses the initial value and skips
 * localStorage access entirely.
 *
 * @example
 * ```ts
 * const favourites = createPersistedStore({
 *   key: 'my-app-favourites',
 *   initial: [] as string[]
 * });
 *
 * // Read
 * $favourites // via subscribe
 * favourites.get() // synchronous
 *
 * // Write
 * favourites.update(items => [...items, 'new-item']);
 *
 * // Export / Import
 * const json = favourites.exportJSON();
 * favourites.importJSON(json);
 *
 * // Merge on import
 * favourites.importJSON(json, (current, imported) => [
 *   ...current,
 *   ...imported.filter(i => !current.includes(i))
 * ]);
 * ```
 */
export function createPersistedStore<T>(options: PersistedStoreOptions<T>): PersistedStore<T> {
	const { key, initial } = options;
	const serialize = options.serialize ?? JSON.stringify;
	const deserialize = options.deserialize ?? ((raw: string) => {
		try {
			return JSON.parse(raw) as T;
		} catch {
			return undefined;
		}
	});

	// Resolve initial value from localStorage (browser only)
	let startValue = initial;
	if (BROWSER) {
		try {
			const stored = localStorage.getItem(key);
			if (stored !== null) {
				const parsed = deserialize(stored);
				if (parsed !== undefined) {
					startValue = parsed;
				}
			}
		} catch {
			// localStorage unavailable
		}
	}

	const store = writable<T>(startValue);

	// Persist on every change (browser only)
	if (BROWSER) {
		store.subscribe((value) => {
			try {
				localStorage.setItem(key, serialize(value));
			} catch {
				// localStorage full or unavailable
			}
		});
	}

	function reset() {
		store.set(initial);
		if (BROWSER) {
			try {
				localStorage.removeItem(key);
			} catch {
				// ignore
			}
		}
	}

	function exportJSON(): string {
		return serialize(get(store));
	}

	function importJSON(
		json: string,
		merge?: (current: T, imported: T) => T
	): { success: true } | { success: false; error: string } {
		try {
			const parsed = deserialize(json);
			if (parsed === undefined) {
				return { success: false, error: 'Invalid data format' };
			}
			if (merge) {
				store.update((current) => merge(current, parsed));
			} else {
				store.set(parsed);
			}
			return { success: true };
		} catch (e) {
			return {
				success: false,
				error: e instanceof Error ? e.message : 'Import failed'
			};
		}
	}

	return {
		subscribe: store.subscribe,
		set: store.set,
		update: store.update,
		get: () => get(store),
		reset,
		exportJSON,
		importJSON
	};
}
