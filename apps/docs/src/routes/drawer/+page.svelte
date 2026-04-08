<script lang="ts">
	import { Drawer } from '@emdzej/ui-kit';

	let basicOpen = $state(false);
	let leftOpen = $state(false);
	let wideOpen = $state(false);
	let settingsOpen = $state(false);
	let closeCount = $state(0);
</script>

<h1 class="text-2xl font-bold mb-2">Drawer</h1>
<p class="text-muted mb-8">
	A slide-in panel built on Bits UI Dialog. Provides focus trapping, escape-to-close,
	and backdrop click dismissal. Ideal for settings panels, detail views, and secondary navigation.
</p>

<!-- Basic -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">Basic (right)</h2>
	<button
		class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity"
		onclick={() => (basicOpen = true)}
	>
		Open Drawer
	</button>

	<Drawer bind:open={basicOpen} title="Basic Drawer">
		<div class="space-y-4">
			<p class="text-sm text-muted">
				This is a basic right-side drawer. Click the backdrop, press Escape,
				or use the close button to dismiss.
			</p>
			<div class="rounded-lg border border-border bg-surface p-4">
				<p class="text-sm font-medium text-on-surface">Some content</p>
				<p class="text-xs text-muted mt-1">Drawers are great for secondary views.</p>
			</div>
		</div>
	</Drawer>
</section>

<!-- Left side -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">Left side</h2>
	<button
		class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity"
		onclick={() => (leftOpen = true)}
	>
		Open Left Drawer
	</button>

	<Drawer bind:open={leftOpen} title="Left Drawer" side="left">
		<p class="text-sm text-muted">
			This drawer slides in from the left. Useful for navigation panels.
		</p>
	</Drawer>
</section>

<!-- Custom width -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">Custom width (w-96)</h2>
	<button
		class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity"
		onclick={() => (wideOpen = true)}
	>
		Open Wide Drawer
	</button>

	<Drawer bind:open={wideOpen} title="Wide Drawer" description="This drawer is 384px wide." width="w-96">
		<div class="space-y-3">
			{#each Array(8) as _, i}
				<div class="rounded-lg border border-border bg-surface p-3">
					<p class="text-sm font-medium text-on-surface">Item {i + 1}</p>
					<p class="text-xs text-muted mt-1">Scrollable content to show overflow behavior.</p>
				</div>
			{/each}
		</div>
	</Drawer>
</section>

<!-- Settings example -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">Settings panel example</h2>
	<p class="text-xs text-muted mb-2">Close count: {closeCount}</p>
	<button
		class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity"
		onclick={() => (settingsOpen = true)}
	>
		Open Settings
	</button>

	<Drawer bind:open={settingsOpen} title="Settings" onclose={() => closeCount++}>
		<div class="space-y-6">
			<div>
				<label for="drawer-demo-name" class="block text-sm font-medium text-on-surface mb-2">Display name</label>
				<input
					id="drawer-demo-name"
					type="text"
					placeholder="John Doe"
					class="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
				/>
			</div>

			<div>
				<label for="drawer-demo-lang" class="block text-sm font-medium text-on-surface mb-2">Language</label>
				<select id="drawer-demo-lang" class="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-ring">
					<option>English</option>
					<option>Deutsch</option>
					<option>Polski</option>
				</select>
			</div>

			<div class="flex items-center justify-between">
				<span class="text-sm font-medium text-on-surface">Notifications</span>
				<button
					class="relative h-6 w-11 rounded-full bg-surface-hover transition-colors"
					role="switch"
					aria-checked="false"
					aria-label="Toggle notifications"
				>
					<span class="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform"></span>
				</button>
			</div>

			<div class="border-t border-border pt-4">
				<h3 class="text-sm font-medium text-on-surface mb-3">Data</h3>
				<div class="flex gap-2">
					<button class="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-on-primary hover:opacity-90 transition-opacity">
						Export
					</button>
					<button class="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-surface-hover transition-colors">
						Import
					</button>
				</div>
			</div>
		</div>
	</Drawer>
</section>

<!-- API -->
<section class="mb-10">
	<h2 class="text-lg font-semibold mb-3">Props</h2>
	<div class="overflow-x-auto rounded-lg border border-border">
		<table class="w-full text-sm">
			<thead class="bg-surface-alt">
				<tr>
					<th class="px-4 py-2 text-left font-medium text-on-surface">Prop</th>
					<th class="px-4 py-2 text-left font-medium text-on-surface">Type</th>
					<th class="px-4 py-2 text-left font-medium text-on-surface">Default</th>
					<th class="px-4 py-2 text-left font-medium text-on-surface">Description</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				<tr><td class="px-4 py-2 font-mono text-xs">open</td><td class="px-4 py-2 font-mono text-xs">boolean</td><td class="px-4 py-2 font-mono text-xs">false</td><td class="px-4 py-2 text-muted">Bindable open state</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">title</td><td class="px-4 py-2 font-mono text-xs">string</td><td class="px-4 py-2 font-mono text-xs">-</td><td class="px-4 py-2 text-muted">Header title</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">description</td><td class="px-4 py-2 font-mono text-xs">string</td><td class="px-4 py-2 font-mono text-xs">-</td><td class="px-4 py-2 text-muted">Subtitle under title</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">closable</td><td class="px-4 py-2 font-mono text-xs">boolean</td><td class="px-4 py-2 font-mono text-xs">true</td><td class="px-4 py-2 text-muted">Show close button</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">width</td><td class="px-4 py-2 font-mono text-xs">string</td><td class="px-4 py-2 font-mono text-xs">'w-80'</td><td class="px-4 py-2 text-muted">Width class</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">side</td><td class="px-4 py-2 font-mono text-xs">'left' | 'right'</td><td class="px-4 py-2 font-mono text-xs">'right'</td><td class="px-4 py-2 text-muted">Slide-in side</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">class</td><td class="px-4 py-2 font-mono text-xs">string</td><td class="px-4 py-2 font-mono text-xs">''</td><td class="px-4 py-2 text-muted">Extra classes on panel</td></tr>
				<tr><td class="px-4 py-2 font-mono text-xs">onclose</td><td class="px-4 py-2 font-mono text-xs">() => void</td><td class="px-4 py-2 font-mono text-xs">-</td><td class="px-4 py-2 text-muted">Callback on close</td></tr>
			</tbody>
		</table>
	</div>
</section>
