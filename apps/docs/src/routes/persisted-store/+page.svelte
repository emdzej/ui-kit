<script lang="ts">
	import { createPersistedStore } from '@emdzej/ui-kit';

	// Simple string list store
	const todos = createPersistedStore<string[]>({
		key: 'ui-kit-demo-todos',
		initial: ['Buy groceries', 'Walk the dog']
	});

	let newTodo = $state('');

	function addTodo() {
		const trimmed = newTodo.trim();
		if (!trimmed) return;
		todos.update((items) => [...items, trimmed]);
		newTodo = '';
	}

	function removeTodo(index: number) {
		todos.update((items) => items.filter((_, i) => i !== index));
	}

	// Counter store for reset demo
	const counter = createPersistedStore<number>({
		key: 'ui-kit-demo-counter',
		initial: 0
	});

	// Object store for export/import demo
	interface UserPrefs {
		name: string;
		language: string;
		notifications: boolean;
	}

	const prefs = createPersistedStore<UserPrefs>({
		key: 'ui-kit-demo-prefs',
		initial: { name: 'John', language: 'en', notifications: true }
	});

	let exportedJSON = $state('');
	let importJSON = $state('');
	let importResult = $state<string | null>(null);
</script>

<h1 class="text-2xl font-bold mb-2">createPersistedStore</h1>
<p class="text-muted mb-8">
	A factory for Svelte stores backed by localStorage. SSR-safe, with built-in
	JSON serialization, reset, and export/import.
</p>

<!-- Simple list -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">Persisted todo list</h2>
	<p class="text-xs text-muted mb-3">Add items, then refresh the page — they persist in localStorage.</p>

	<form
		class="flex gap-2 mb-4"
		onsubmit={(e) => { e.preventDefault(); addTodo(); }}
	>
		<input
			type="text"
			bind:value={newTodo}
			placeholder="Add a todo..."
			class="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
		/>
		<button
			type="submit"
			class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity"
		>
			Add
		</button>
	</form>

	{#if $todos.length === 0}
		<p class="text-sm text-muted italic">No items. Add one above.</p>
	{:else}
		<ul class="space-y-1">
			{#each $todos as todo, i}
				<li class="flex items-center justify-between rounded-lg border border-border bg-surface-alt px-3 py-2">
					<span class="text-sm text-on-surface">{todo}</span>
					<button
						class="text-xs text-muted hover:text-error transition-colors"
						onclick={() => removeTodo(i)}
					>
						remove
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="mt-3 flex gap-2">
		<button
			class="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-surface-hover transition-colors"
			onclick={() => todos.reset()}
		>
			Reset to default
		</button>
	</div>
</section>

<!-- Counter with reset -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">Counter with reset</h2>

	<div class="flex items-center gap-4">
		<button
			class="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-on-surface hover:bg-surface-hover transition-colors"
			onclick={() => counter.update((n) => n - 1)}
		>
			-
		</button>
		<span class="text-2xl font-bold text-on-surface tabular-nums w-12 text-center">{$counter}</span>
		<button
			class="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-on-surface hover:bg-surface-hover transition-colors"
			onclick={() => counter.update((n) => n + 1)}
		>
			+
		</button>
		<button
			class="rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-on-surface transition-colors"
			onclick={() => counter.reset()}
		>
			Reset (0)
		</button>
	</div>
</section>

<!-- Export / Import -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">Export / Import</h2>
	<p class="text-xs text-muted mb-3">
		Current prefs: <code class="bg-surface-alt px-1 py-0.5 rounded text-xs">{JSON.stringify($prefs)}</code>
	</p>

	<div class="flex flex-wrap gap-2 mb-4">
		<button
			class="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-on-primary hover:opacity-90 transition-opacity"
			onclick={() => { prefs.set({ name: 'Jane', language: 'de', notifications: false }); }}
		>
			Set to Jane/de
		</button>
		<button
			class="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-surface-hover transition-colors"
			onclick={() => { exportedJSON = prefs.exportJSON(); }}
		>
			Export JSON
		</button>
		<button
			class="rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-on-surface transition-colors"
			onclick={() => prefs.reset()}
		>
			Reset
		</button>
	</div>

	{#if exportedJSON}
		<div class="mb-4">
			<p class="block text-xs font-medium text-on-surface mb-1">Exported:</p>
			<pre class="rounded-lg border border-border bg-surface-alt p-3 text-xs text-muted overflow-x-auto">{exportedJSON}</pre>
		</div>
	{/if}

	<div>
		<label for="import-json-input" class="block text-xs font-medium text-on-surface mb-1">Import JSON:</label>
		<div class="flex gap-2">
			<input
				id="import-json-input"
				type="text"
				bind:value={importJSON}
				placeholder="name: Alice, language: fr, notifications: true"
				class="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring font-mono"
			/>
			<button
				class="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-on-primary hover:opacity-90 transition-opacity"
				onclick={() => {
					const result = prefs.importJSON(importJSON);
					importResult = result.success ? 'Imported!' : result.error;
					setTimeout(() => { importResult = null; }, 2000);
				}}
			>
				Import
			</button>
		</div>
		{#if importResult}
			<p class="mt-1 text-xs {importResult === 'Imported!' ? 'text-primary' : 'text-error'}">{importResult}</p>
		{/if}
	</div>
</section>

<!-- API -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">API</h2>
	<div class="overflow-x-auto rounded-lg border border-border">
		<table class="w-full text-sm">
			<thead class="bg-surface-alt">
				<tr>
					<th class="px-4 py-2 text-left font-medium text-on-surface">Method</th>
					<th class="px-4 py-2 text-left font-medium text-on-surface">Description</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				<tr><td class="px-4 py-2 font-mono text-xs">subscribe</td><td class="px-4 py-2 text-muted">Svelte store contract ($store syntax)</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">set(value)</td><td class="px-4 py-2 text-muted">Replace the value</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">update(fn)</td><td class="px-4 py-2 text-muted">Update via function</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">get()</td><td class="px-4 py-2 text-muted">Synchronous read</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">reset()</td><td class="px-4 py-2 text-muted">Restore initial value, clear localStorage</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">exportJSON()</td><td class="px-4 py-2 text-muted">Serialize to JSON string</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">importJSON(json, merge?)</td><td class="px-4 py-2 text-muted">Deserialize from JSON, optional merge fn</td></tr>
			</tbody>
		</table>
	</div>
</section>
