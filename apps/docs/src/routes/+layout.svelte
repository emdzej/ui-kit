<script lang="ts">
	import '../app.css';
	import { createTheme } from '@emdzej/ui-kit';
	import { page } from '$app/state';
	import { Sun, Moon } from '@lucide/svelte';

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
					<Moon class="size-4" />
				{:else}
					<Sun class="size-4" />
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
