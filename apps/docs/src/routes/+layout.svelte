<script lang="ts">
	import '../app.css';
	import { createTheme, ThemeToggle } from '@emdzej/ui-kit';
	import { page } from '$app/state';

	let { children } = $props();
	const { theme, toggleTheme } = createTheme();

	const nav = [
		{ label: 'Overview', href: '/' },
		{ heading: 'Foundation' },
		{ label: 'Theme & Tokens', href: '/theme' },
		{ heading: 'App Shell' },
		{ label: 'AppHeader / Toggle / Settings', href: '/app-shell' },
		{ heading: 'Components' },
		{ label: 'SearchInput', href: '/search-input' },
		{ label: 'Breadcrumb', href: '/breadcrumb' },
		{ label: 'Card', href: '/card' },
		{ label: 'Modal', href: '/modal' },
		{ label: 'Drawer', href: '/drawer' },
		{ label: 'CascadingSelect', href: '/cascading-select' },
		{ label: 'Dropdown', href: '/dropdown' },
		{ label: 'TreeView', href: '/tree-view' },
		{ label: 'ImageViewer', href: '/image-viewer' },
		{ heading: 'Stores' },
		{ label: 'createPersistedStore', href: '/persisted-store' },
		{ heading: 'Actions' },
		{ label: 'clickOutside', href: '/actions/click-outside' },
		{ label: 'imageMagnify', href: '/actions/image-magnify' }
	];

	const isActive = (href: string) => page.url?.pathname === href;
</script>

<div class="flex min-h-screen bg-surface text-on-surface">
	<!-- Sidebar -->
	<aside class="w-60 shrink-0 border-r border-border bg-surface-alt overflow-y-auto">
		<div class="p-5 border-b border-border">
			<a href="/" class="text-lg font-bold text-on-surface">@emdzej/ui-kit</a>
			<p class="text-xs text-muted mt-0.5">v0.1.0</p>
		</div>

		<nav class="p-3 space-y-0.5">
			{#each nav as item}
				{#if item.heading}
					<div class="px-3 pt-5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
						{item.heading}
					</div>
				{:else}
					<a
						href={item.href}
						class="block rounded-lg px-3 py-2 text-sm transition-colors
							{isActive(item.href ?? '')
								? 'bg-primary text-on-primary font-medium shadow-ui-sm'
								: 'text-muted hover:bg-surface-hover hover:text-on-surface'}"
					>
						{item.label}
					</a>
				{/if}
			{/each}
		</nav>

		<div class="p-4 border-t border-border mt-auto">
			<ThemeToggle {theme} onToggle={toggleTheme} showLabel class="w-full" />
		</div>
	</aside>

	<!-- Main content -->
	<main class="flex-1 overflow-y-auto">
		<div class="max-w-3xl mx-auto px-8 py-10">
			{@render children()}
		</div>
	</main>
</div>
