<script lang="ts">
	import { SearchInput } from '@emdzej/ui-kit';

	let value1 = $state('');
	let value2 = $state('');
	let submitted = $state('');
</script>

<h1 class="text-2xl font-bold mb-2">SearchInput</h1>
<p class="text-muted mb-8">Search text input with icon, Cmd/Ctrl+K shortcut, and Escape to clear.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Default</h2>
	<SearchInput
		bind:value={value1}
		placeholder="Search parts..."
		onsubmit={(q) => (submitted = q)}
		class="max-w-md"
	/>
	{#if value1}
		<p class="mt-2 text-sm text-muted">Value: "{value1}"</p>
	{/if}
	{#if submitted}
		<p class="mt-1 text-sm text-success">Submitted: "{submitted}"</p>
	{/if}
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Without keyboard shortcut</h2>
	<SearchInput
		bind:value={value2}
		placeholder="No shortcut badge..."
		shortcut={false}
		class="max-w-md"
	/>
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
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">value</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Current input value (bindable)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">placeholder</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">'Search...'</td><td class="p-2">Placeholder text</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">oninput</td><td class="p-2 text-muted">(value: string) => void</td><td class="p-2 text-muted">—</td><td class="p-2">Called on every input change</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">onsubmit</td><td class="p-2 text-muted">(value: string) => void</td><td class="p-2 text-muted">—</td><td class="p-2">Called on Enter key</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">shortcut</td><td class="p-2 text-muted">boolean</td><td class="p-2 text-muted">true</td><td class="p-2">Enable Cmd/Ctrl+K focus shortcut</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">class</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Additional CSS classes</td></tr>
			</tbody>
		</table>
	</div>
</section>
