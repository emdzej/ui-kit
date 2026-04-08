<script lang="ts">
	import '../app.css';
	import { createTheme } from '@emdzej/ui-kit';
	import { page } from '$app/state';

	let { children } = $props();
	const { theme, toggleTheme } = createTheme();

	const nav = [
		{ label: 'Overview', href: '/' },
		{ heading: 'Foundation' },
		{ label: 'Theme & Tokens', href: '/theme' },
		{ heading: 'Components' },
		{ label: 'SearchInput', href: '/search-input' },
		{ label: 'Breadcrumb', href: '/breadcrumb' },
		{ label: 'Card', href: '/card' },
		{ label: 'Modal', href: '/modal' },
		{ label: 'CascadingSelect', href: '/cascading-select' },
		{ label: 'Dropdown', href: '/dropdown' },
		{ label: 'TreeView', href: '/tree-view' },
		{ label: 'ImageViewer', href: '/image-viewer' },
		{ heading: 'Actions' },
		{ label: 'clickOutside', href: '/actions/click-outside' },
		{ label: 'imageMagnify', href: '/actions/image-magnify' }
	];

	const isActive = (href: string) => page.url?.pathname === href;
</script>

<div class="flex min-h-screen bg-surface text-on-surface">
	<!-- Sidebar -->
	<aside class="w-60 shrink-0 border-r border-border bg-surface-alt overflow-y-auto">
		<div class="p-4 border-b border-border">
			<a href="/" class="text-lg font-bold text-on-surface">@emdzej/ui-kit</a>
			<p class="text-xs text-muted mt-0.5">v0.1.0</p>
		</div>

		<nav class="p-3 space-y-1">
			{#each nav as item}
				{#if item.heading}
					<div class="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted">
						{item.heading}
					</div>
				{:else}
					<a
						href={item.href}
					class="block rounded-md px-3 py-1.5 text-sm transition-colors
						{isActive(item.href ?? '')
							? 'bg-primary/10 text-primary font-medium'
							: 'text-on-surface hover:bg-surface-raised'}"
					>
						{item.label}
					</a>
				{/if}
			{/each}
		</nav>

		<div class="p-4 border-t border-border mt-auto">
			<button
				onclick={toggleTheme}
				class="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted hover:bg-surface-raised transition-colors"
			>
				{#if $theme === 'dark'}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
						<path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd"/>
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
						<path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z"/>
					</svg>
				{/if}
				{$theme === 'dark' ? 'Dark' : 'Light'}
			</button>
		</div>
	</aside>

	<!-- Main content -->
	<main class="flex-1 overflow-y-auto">
		<div class="max-w-3xl mx-auto p-8">
			{@render children()}
		</div>
	</main>
</div>
