import { writable } from 'svelte/store';
import { BROWSER } from 'esm-env';

export type Theme = 'light' | 'dark';

export interface ThemeOptions {
	/** localStorage key for persisting theme preference */
	key?: string;
	/** Default theme when no preference is stored */
	fallback?: Theme;
}

const DEFAULT_KEY = 'ui-kit-theme';

/**
 * Creates a reactive theme store with light/dark mode support.
 *
 * - Reads initial value from localStorage (if available)
 * - Falls back to `prefers-color-scheme` media query
 * - Toggles the `dark` class on `document.documentElement`
 * - Persists changes to localStorage
 *
 * @example
 * ```svelte
 * <script>
 *   import { createTheme } from '@emdzej/ui-kit/theme';
 *   const { theme, toggleTheme, setTheme } = createTheme();
 * </script>
 *
 * <button onclick={toggleTheme}>
 *   Current: {$theme}
 * </button>
 * ```
 */
export function createTheme(options?: ThemeOptions) {
	const key = options?.key ?? DEFAULT_KEY;
	const fallback = options?.fallback ?? 'light';

	const initial = resolveInitialTheme(key, fallback);
	const theme = writable<Theme>(initial);

	if (BROWSER) {
		// Apply on creation
		applyTheme(initial);

		// Sync to DOM + localStorage on every change
		theme.subscribe((value) => {
			applyTheme(value);
			try {
				localStorage.setItem(key, value);
			} catch {
				// localStorage may be unavailable (private browsing, etc.)
			}
		});

		// Listen for system preference changes (when no stored preference)
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			try {
				if (!localStorage.getItem(key)) {
					theme.set(e.matches ? 'dark' : 'light');
				}
			} catch {
				theme.set(e.matches ? 'dark' : 'light');
			}
		};
		mediaQuery.addEventListener('change', handleChange);
	}

	function toggleTheme() {
		theme.update((current) => (current === 'light' ? 'dark' : 'light'));
	}

	function setTheme(value: Theme) {
		theme.set(value);
	}

	return {
		theme,
		toggleTheme,
		setTheme
	};
}

function resolveInitialTheme(key: string, fallback: Theme): Theme {
	if (!BROWSER) return fallback;

	try {
		const stored = localStorage.getItem(key);
		if (stored === 'light' || stored === 'dark') return stored;
	} catch {
		// localStorage unavailable
	}

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}

	return fallback;
}

function applyTheme(theme: Theme) {
	if (!BROWSER) return;
	const root = document.documentElement;
	if (theme === 'dark') {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
}
