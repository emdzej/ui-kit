<script lang="ts">
	import { AppHeader, ThemeToggle, SettingsButton, Modal, createTheme } from '@emdzej/ui-kit';
	import { Package, FileText, Heart, ChevronDown } from '@lucide/svelte';

	const { theme, toggleTheme } = createTheme({ key: 'docs-demo-theme' });

	let settingsOpen = $state(false);
	let selectedApp = $state('wdsx');

	const codeExample = `<` + `script>
  import { AppHeader, ThemeToggle, SettingsButton, createTheme }
    from '@emdzej/ui-kit';
  import MySettingsPanel from './MySettingsPanel.svelte';

  const { theme, toggleTheme } = createTheme({ key: 'my-app-theme' });
  let settingsOpen = $state(false);
<` + `/script>

<AppHeader>
  {#snippet brand()}
    <a href="/" class="text-lg font-semibold">MyApp</a>
  {/snippet}
  {#snippet nav()}
    <a href="/docs">Docs</a>
    <a href="/api">API</a>
  {/snippet}
  {#snippet actions()}
    <ThemeToggle {theme} onToggle={toggleTheme} />
    <SettingsButton bind:open={settingsOpen} />
  {/snippet}
</AppHeader>

<MySettingsPanel bind:open={settingsOpen} />`;
</script>

<h1 class="text-2xl font-bold mb-2">AppShell Components</h1>
<p class="text-muted mb-8">
	Composable header primitives for building app-level layouts.
	These components provide the shared structure while apps supply their own domain-specific content through snippets.
</p>

<!-- AppHeader -->
<section class="space-y-4 mb-12">
	<h2 class="text-lg font-semibold">AppHeader</h2>
	<p class="text-sm text-muted">
		Sticky header bar with <code class="text-xs bg-surface-raised px-1.5 py-0.5 rounded-md">brand</code>,
		<code class="text-xs bg-surface-raised px-1.5 py-0.5 rounded-md">nav</code>, and
		<code class="text-xs bg-surface-raised px-1.5 py-0.5 rounded-md">actions</code> snippet slots.
		Provides the shared visual pattern — backdrop blur, border, flex layout — while apps compose their own content.
	</p>

	<div class="rounded-lg border border-border overflow-hidden">
		<AppHeader>
			{#snippet brand()}
				<div class="flex items-center gap-2">
					<Package class="size-5 text-primary" />
					<span class="font-semibold">MyApp</span>
				</div>
			{/snippet}

			{#snippet nav()}
				<div class="flex items-center gap-1 text-sm">
					<span role="link" tabindex="0" class="cursor-pointer rounded-lg px-3 py-1.5 font-medium text-primary bg-primary-subtle">Documents</span>
					<span role="link" tabindex="0" class="cursor-pointer rounded-lg px-3 py-1.5 text-muted hover:bg-surface-hover hover:text-on-surface transition-colors">Symptoms</span>
				</div>
			{/snippet}

			{#snippet actions()}
				<ThemeToggle {theme} onToggle={toggleTheme} />
				<SettingsButton bind:open={settingsOpen} />
			{/snippet}
		</AppHeader>
	</div>

	<div class="rounded-lg border border-border bg-surface-alt p-4">
		<h3 class="text-sm font-medium mb-2">Props</h3>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-border text-left text-muted">
						<th class="pb-2 pr-4 font-medium">Prop</th>
						<th class="pb-2 pr-4 font-medium">Type</th>
						<th class="pb-2 font-medium">Description</th>
					</tr>
				</thead>
				<tbody class="text-sm">
					<tr class="border-b border-border">
						<td class="py-2 pr-4"><code class="text-xs">brand</code></td>
						<td class="py-2 pr-4 text-muted">Snippet</td>
						<td class="py-2 text-muted">Left area — logo, app name</td>
					</tr>
					<tr class="border-b border-border">
						<td class="py-2 pr-4"><code class="text-xs">nav</code></td>
						<td class="py-2 pr-4 text-muted">Snippet</td>
						<td class="py-2 text-muted">Navigation links or tabs</td>
					</tr>
					<tr class="border-b border-border">
						<td class="py-2 pr-4"><code class="text-xs">actions</code></td>
						<td class="py-2 pr-4 text-muted">Snippet</td>
						<td class="py-2 text-muted">Right area — buttons, dropdowns, toggles</td>
					</tr>
					<tr>
						<td class="py-2 pr-4"><code class="text-xs">class</code></td>
						<td class="py-2 pr-4 text-muted">string</td>
						<td class="py-2 text-muted">Additional CSS classes for the header</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<!-- AppHeader: minimal example -->
<section class="space-y-4 mb-12">
	<h2 class="text-lg font-semibold">Minimal Header</h2>
	<p class="text-sm text-muted">Only the brand snippet — no nav or actions.</p>

	<div class="rounded-lg border border-border overflow-hidden">
		<AppHeader>
			{#snippet brand()}
				<span class="text-lg font-bold">ETKx</span>
			{/snippet}
		</AppHeader>
	</div>
</section>

<!-- AppHeader: full toolbar example -->
<section class="space-y-4 mb-12">
	<h2 class="text-lg font-semibold">Full Toolbar</h2>
	<p class="text-sm text-muted">Demonstrates a richer header with a domain selector, nav links, search, and multiple action buttons — similar to how the consuming apps compose their headers.</p>

	<div class="rounded-lg border border-border overflow-hidden">
		<AppHeader>
			{#snippet brand()}
				<span class="text-lg font-semibold tracking-wide">WDSx</span>
			{/snippet}

			{#snippet nav()}
				<div class="flex items-center gap-3">
					<button class="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm hover:bg-surface-hover transition-colors">
						{selectedApp}
						<ChevronDown class="size-3.5 text-muted" />
					</button>
					<div class="hidden sm:flex items-center gap-1 text-sm">
						<span role="link" tabindex="0" class="cursor-pointer rounded-lg px-3 py-1.5 text-muted hover:bg-surface-hover hover:text-on-surface transition-colors">
							<FileText class="inline size-3.5 mr-1" />Diagrams
						</span>
						<span role="link" tabindex="0" class="cursor-pointer rounded-lg px-3 py-1.5 text-muted hover:bg-surface-hover hover:text-on-surface transition-colors">
							<Heart class="inline size-3.5 mr-1" />Favorites
						</span>
					</div>
				</div>
			{/snippet}

			{#snippet actions()}
				<ThemeToggle {theme} onToggle={toggleTheme} showLabel />
				<SettingsButton bind:open={settingsOpen} />
			{/snippet}
		</AppHeader>
	</div>
</section>

<!-- ThemeToggle -->
<section class="space-y-4 mb-12">
	<h2 class="text-lg font-semibold">ThemeToggle</h2>
	<p class="text-sm text-muted">
		Sun/moon toggle button that works with the <code class="text-xs bg-surface-raised px-1.5 py-0.5 rounded-md">createTheme()</code> store.
		Takes <code class="text-xs bg-surface-raised px-1.5 py-0.5 rounded-md">theme</code> (store) and
		<code class="text-xs bg-surface-raised px-1.5 py-0.5 rounded-md">onToggle</code> (function) as props — doesn't create its own store.
	</p>

	<div class="flex items-center gap-4">
		<div class="flex items-center gap-2 rounded-lg border border-border p-2">
			<span class="text-xs text-muted pl-2">Icon only:</span>
			<ThemeToggle {theme} onToggle={toggleTheme} />
		</div>
		<div class="flex items-center gap-2 rounded-lg border border-border p-2">
			<span class="text-xs text-muted pl-2">With label:</span>
			<ThemeToggle {theme} onToggle={toggleTheme} showLabel />
		</div>
	</div>

	<div class="rounded-lg border border-border bg-surface-alt p-4">
		<h3 class="text-sm font-medium mb-2">Props</h3>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-border text-left text-muted">
						<th class="pb-2 pr-4 font-medium">Prop</th>
						<th class="pb-2 pr-4 font-medium">Type</th>
						<th class="pb-2 font-medium">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-border">
						<td class="py-2 pr-4"><code class="text-xs">theme</code></td>
						<td class="py-2 pr-4 text-muted">Writable&lt;Theme&gt;</td>
						<td class="py-2 text-muted">The theme store from createTheme()</td>
					</tr>
					<tr class="border-b border-border">
						<td class="py-2 pr-4"><code class="text-xs">onToggle</code></td>
						<td class="py-2 pr-4 text-muted">() =&gt; void</td>
						<td class="py-2 text-muted">Toggle function from createTheme()</td>
					</tr>
					<tr class="border-b border-border">
						<td class="py-2 pr-4"><code class="text-xs">showLabel</code></td>
						<td class="py-2 pr-4 text-muted">boolean</td>
						<td class="py-2 text-muted">Show "Light"/"Dark" text next to icon (default: false)</td>
					</tr>
					<tr>
						<td class="py-2 pr-4"><code class="text-xs">class</code></td>
						<td class="py-2 pr-4 text-muted">string</td>
						<td class="py-2 text-muted">Additional CSS classes</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<!-- SettingsButton -->
<section class="space-y-4 mb-12">
	<h2 class="text-lg font-semibold">SettingsButton</h2>
	<p class="text-sm text-muted">
		Gear icon button with a bindable <code class="text-xs bg-surface-raised px-1.5 py-0.5 rounded-md">open</code> state.
		The consuming app provides its own settings panel/modal/drawer — this component only manages the trigger.
	</p>

	<div class="flex items-center gap-4">
		<div class="flex items-center gap-2 rounded-lg border border-border p-2">
			<span class="text-xs text-muted pl-2">Click to open:</span>
			<SettingsButton bind:open={settingsOpen} />
			<span class="text-xs text-muted pr-2">open = {settingsOpen}</span>
		</div>
	</div>

	<div class="rounded-lg border border-border bg-surface-alt p-4">
		<h3 class="text-sm font-medium mb-2">Props</h3>
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-border text-left text-muted">
						<th class="pb-2 pr-4 font-medium">Prop</th>
						<th class="pb-2 pr-4 font-medium">Type</th>
						<th class="pb-2 font-medium">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-border">
						<td class="py-2 pr-4"><code class="text-xs">open</code></td>
						<td class="py-2 pr-4 text-muted">boolean (bindable)</td>
						<td class="py-2 text-muted">Controls open state — bind to your settings panel</td>
					</tr>
					<tr>
						<td class="py-2 pr-4"><code class="text-xs">class</code></td>
						<td class="py-2 pr-4 text-muted">string</td>
						<td class="py-2 text-muted">Additional CSS classes</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>

<!-- Integration example -->
<section class="space-y-4">
	<h2 class="text-lg font-semibold">Integration Pattern</h2>
	<p class="text-sm text-muted">Typical usage in a consuming app's +layout.svelte:</p>

	<div class="rounded-lg border border-border bg-surface-alt p-4">
		<pre class="text-sm overflow-x-auto"><code>{codeExample}</code></pre>
	</div>
</section>

<Modal title="Settings" bind:open={settingsOpen}>
	<p class="text-sm text-muted">
		This is a demo settings panel. In a real app, this would contain theme preferences,
		export/import options, language settings, etc.
	</p>
	<div class="mt-4 space-y-3">
		<div class="flex items-center justify-between rounded-lg border border-border p-3">
			<span class="text-sm">Dark mode</span>
			<ThemeToggle {theme} onToggle={toggleTheme} />
		</div>
		<div class="flex items-center justify-between rounded-lg border border-border p-3">
			<span class="text-sm">Language</span>
			<span class="text-sm text-muted">English</span>
		</div>
	</div>
</Modal>
