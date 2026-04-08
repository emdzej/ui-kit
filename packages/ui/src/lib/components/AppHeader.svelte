<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Brand area (left side) — logo, app name, etc. */
		brand?: Snippet;
		/** Navigation area — links, tabs, domain selectors */
		nav?: Snippet;
		/** Actions area (right side) — buttons, toggles, dropdowns */
		actions?: Snippet;
		/** Additional CSS classes for the header element */
		class?: string;
	}

	let { brand, nav, actions, class: className = '' }: Props = $props();
</script>

<header
	class="sticky top-0 z-40 shrink-0 border-b border-border bg-surface-alt/90 backdrop-blur-sm {className}"
>
	<div class="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
		<div class="flex items-center gap-4">
			{#if brand}
				{@render brand()}
			{/if}
			{#if nav}
				{@render nav()}
			{/if}
		</div>

		{#if actions}
			<div class="flex items-center gap-2">
				{@render actions()}
			</div>
		{/if}
	</div>
</header>
