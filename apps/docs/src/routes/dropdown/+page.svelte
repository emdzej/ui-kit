<script lang="ts">
	import { Dropdown } from '@emdzej/ui-kit';
	import type { DropdownItem } from '@emdzej/ui-kit';

	let lastAction = $state('');

	const simpleItems: DropdownItem[] = [
		{ label: 'Edit', onclick: () => (lastAction = 'Edit') },
		{ label: 'Duplicate', onclick: () => (lastAction = 'Duplicate') },
		{ label: 'Archive', onclick: () => (lastAction = 'Archive') },
		{ label: 'Delete', onclick: () => (lastAction = 'Delete'), variant: 'danger' }
	];

	const withDisabled: DropdownItem[] = [
		{ label: 'Copy', onclick: () => (lastAction = 'Copy') },
		{ label: 'Paste', onclick: () => (lastAction = 'Paste'), disabled: true },
		{ label: 'Cut', onclick: () => (lastAction = 'Cut') }
	];
</script>

<h1 class="text-2xl font-bold mb-2">Dropdown</h1>
<p class="text-muted mb-8">Action menu built on Bits UI DropdownMenu. Simple items array or fully composable content.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Simple items</h2>
	<Dropdown items={simpleItems}>
		{#snippet trigger()}
			<button class="px-4 py-2 rounded-lg border border-border bg-surface-alt hover:bg-surface-hover transition-colors">
				Actions
			</button>
		{/snippet}
	</Dropdown>
	{#if lastAction}
		<p class="mt-3 text-sm text-muted">Last action: {lastAction}</p>
	{/if}
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">With disabled items</h2>
	<Dropdown items={withDisabled}>
		{#snippet trigger()}
			<button class="px-4 py-2 rounded-lg border border-border bg-surface-alt hover:bg-surface-hover transition-colors">
				Edit menu
			</button>
		{/snippet}
	</Dropdown>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Align start</h2>
	<Dropdown items={simpleItems} align="start">
		{#snippet trigger()}
			<button class="px-4 py-2 rounded-lg border border-border bg-surface-alt hover:bg-surface-hover transition-colors">
				Left-aligned
			</button>
		{/snippet}
	</Dropdown>
</section>

<section>
	<h2 class="text-lg font-semibold mb-4">Props</h2>
	<div class="overflow-x-auto">
		<table class="w-full text-sm border border-border rounded-lg overflow-hidden">
			<thead class="bg-surface-raised">
				<tr>
					<th class="text-left p-2 font-medium">Prop</th>
					<th class="text-left p-2 font-medium">Type</th>
					<th class="text-left p-2 font-medium">Default</th>
					<th class="text-left p-2 font-medium">Description</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">items</td><td class="p-2 text-muted">DropdownItem[]</td><td class="p-2 text-muted">—</td><td class="p-2">Quick-use items list</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">trigger</td><td class="p-2 text-muted">Snippet</td><td class="p-2 text-muted">—</td><td class="p-2">Trigger element (required)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">children</td><td class="p-2 text-muted">Snippet</td><td class="p-2 text-muted">—</td><td class="p-2">Custom content (overrides items)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">open</td><td class="p-2 text-muted">boolean</td><td class="p-2 text-muted">false</td><td class="p-2">Open state (bindable)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">align</td><td class="p-2 text-muted">'start' | 'center' | 'end'</td><td class="p-2 text-muted">'end'</td><td class="p-2">Menu alignment</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">sideOffset</td><td class="p-2 text-muted">number</td><td class="p-2 text-muted">4</td><td class="p-2">Gap from trigger in px</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">class</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Additional CSS classes</td></tr>
			</tbody>
		</table>
	</div>
</section>
