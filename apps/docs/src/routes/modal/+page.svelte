<script lang="ts">
	import { Modal } from '@emdzej/ui-kit';

	let basicOpen = $state(false);
	let confirmOpen = $state(false);
	let wideOpen = $state(false);
	let noCloseOpen = $state(false);
</script>

<h1 class="text-2xl font-bold mb-2">Modal</h1>
<p class="text-muted mb-8">Dialog component built on Bits UI. Focus trapping, escape-to-close, portal rendering, and full ARIA attributes.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Basic</h2>
	<button
		onclick={() => (basicOpen = true)}
		class="px-4 py-2 rounded-md border border-border bg-surface-alt hover:bg-surface-raised transition-colors"
	>
		Open modal
	</button>
	<Modal bind:open={basicOpen} title="Settings" description="Manage your preferences.">
		<div class="space-y-4">
			<p class="text-sm text-on-surface">This modal has focus trapping, escape key dismissal, and clicks on the overlay to close.</p>
			<button
				onclick={() => (basicOpen = false)}
				class="px-4 py-2 rounded-md bg-primary text-on-primary hover:opacity-90 transition-opacity"
			>
				Done
			</button>
		</div>
	</Modal>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Confirm dialog</h2>
	<button
		onclick={() => (confirmOpen = true)}
		class="px-4 py-2 rounded-md bg-error text-white hover:opacity-90 transition-opacity"
	>
		Delete item
	</button>
	<Modal bind:open={confirmOpen} title="Delete item?" description="This action cannot be undone." maxWidth="max-w-sm">
		<div class="flex gap-2 justify-end">
			<button
				onclick={() => (confirmOpen = false)}
				class="px-4 py-2 rounded-md border border-border bg-surface-alt hover:bg-surface-raised transition-colors"
			>
				Cancel
			</button>
			<button
				onclick={() => { alert('Deleted!'); confirmOpen = false; }}
				class="px-4 py-2 rounded-md bg-error text-white hover:opacity-90 transition-opacity"
			>
				Delete
			</button>
		</div>
	</Modal>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Wide modal</h2>
	<button
		onclick={() => (wideOpen = true)}
		class="px-4 py-2 rounded-md border border-border bg-surface-alt hover:bg-surface-raised transition-colors"
	>
		Open wide (max-w-2xl)
	</button>
	<Modal bind:open={wideOpen} title="Wide modal" maxWidth="max-w-2xl">
		<p class="text-sm text-muted">This modal uses <code>maxWidth="max-w-2xl"</code> for wider content.</p>
	</Modal>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">No close button</h2>
	<button
		onclick={() => (noCloseOpen = true)}
		class="px-4 py-2 rounded-md border border-border bg-surface-alt hover:bg-surface-raised transition-colors"
	>
		Open (closable=false)
	</button>
	<Modal bind:open={noCloseOpen} title="Forced interaction" closable={false}>
		<div class="space-y-4">
			<p class="text-sm text-on-surface">No close button. You must use the action button. Escape and overlay click still work.</p>
			<button
				onclick={() => (noCloseOpen = false)}
				class="px-4 py-2 rounded-md bg-primary text-on-primary hover:opacity-90 transition-opacity"
			>
				Accept
			</button>
		</div>
	</Modal>
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
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">open</td><td class="p-2 text-muted">boolean</td><td class="p-2 text-muted">false</td><td class="p-2">Whether modal is open (bindable)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">title</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">—</td><td class="p-2">Modal heading</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">description</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">—</td><td class="p-2">Text below the title</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">closable</td><td class="p-2 text-muted">boolean</td><td class="p-2 text-muted">true</td><td class="p-2">Show X close button</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">maxWidth</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">'max-w-lg'</td><td class="p-2">Tailwind max-width class</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">children</td><td class="p-2 text-muted">Snippet</td><td class="p-2 text-muted">—</td><td class="p-2">Modal body content</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">onclose</td><td class="p-2 text-muted">() => void</td><td class="p-2 text-muted">—</td><td class="p-2">Called on close</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">class</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Additional CSS classes</td></tr>
			</tbody>
		</table>
	</div>
</section>
