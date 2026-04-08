<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import type { Writable } from 'svelte/store';
	import type { Theme } from '../theme/index.js';

	interface Props {
		/** The theme store from createTheme() */
		theme: Writable<Theme>;
		/** The toggle function from createTheme() */
		onToggle: () => void;
		/** Show label text next to the icon */
		showLabel?: boolean;
		/** Additional CSS classes */
		class?: string;
	}

	let { theme, onToggle, showLabel = false, class: className = '' }: Props = $props();
</script>

<button
	type="button"
	onclick={onToggle}
	class="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted
		hover:bg-surface-hover hover:text-on-surface transition-colors {className}"
	aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if $theme === 'dark'}
		<Moon class="size-4" />
	{:else}
		<Sun class="size-4" />
	{/if}
	{#if showLabel}
		<span>{$theme === 'dark' ? 'Dark' : 'Light'}</span>
	{/if}
</button>
