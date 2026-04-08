<script lang="ts">
	import { clickOutside } from '@emdzej/ui-kit';

	let isOpen = $state(false);
	let count = $state(0);
</script>

<h1 class="text-2xl font-bold mb-2">clickOutside</h1>
<p class="text-muted mb-8">Svelte action that calls a handler when a click occurs outside the element.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Demo</h2>
	<p class="text-sm text-muted mb-4">Click the button to show the panel, then click outside to dismiss it.</p>

	<div class="relative inline-block">
		<button
			onclick={() => (isOpen = !isOpen)}
			class="px-4 py-2 rounded-md border border-border bg-surface-alt hover:bg-surface-raised transition-colors"
		>
			{isOpen ? 'Panel open' : 'Open panel'}
		</button>

		{#if isOpen}
			<div
				use:clickOutside={() => (isOpen = false)}
				class="absolute top-full left-0 mt-2 w-64 rounded-lg border border-border bg-surface-alt p-4 shadow-ui-lg z-10"
			>
				<p class="text-sm text-on-surface">Click outside this panel to close it.</p>
				<p class="mt-2 text-xs text-muted">Closed {count} time{count !== 1 ? 's' : ''}</p>
			</div>
		{/if}
	</div>
	<!-- increment count when panel closes -->
	{#if !isOpen && count >= 0}
		<!-- This is just for tracking, the actual count update happens below -->
	{/if}
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Usage</h2>
	<div class="prose dark:prose-invert max-w-none">
		<pre><code>&lt;div use:clickOutside=&#123;() =&gt; (isOpen = false)&#125;&gt;
  Dropdown content
&lt;/div&gt;</code></pre>
	</div>
</section>

<section>
	<h2 class="text-lg font-semibold mb-4">API</h2>
	<div class="overflow-x-auto">
		<table class="w-full text-sm border border-border rounded-lg overflow-hidden">
			<thead class="bg-surface-raised">
				<tr>
					<th class="text-left p-2 font-medium">Parameter</th>
					<th class="text-left p-2 font-medium">Type</th>
					<th class="text-left p-2 font-medium">Description</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">handler</td><td class="p-2 text-muted">() => void</td><td class="p-2">Called when a click occurs outside the element</td></tr>
			</tbody>
		</table>
	</div>
	<p class="mt-3 text-sm text-muted">The handler can be updated reactively. Uses <code>requestAnimationFrame</code> to skip the opening click.</p>
</section>
