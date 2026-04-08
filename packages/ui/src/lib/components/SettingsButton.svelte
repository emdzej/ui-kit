<script lang="ts">
	import { Settings } from '@lucide/svelte';

	interface Props {
		/** Bindable open state — controls the settings panel/modal/drawer in the consuming app */
		open?: boolean;
		/** Additional CSS classes */
		class?: string;
	}

	let { open = $bindable(false), class: className = '' }: Props = $props();
</script>

<button
	type="button"
	onclick={() => (open = !open)}
	class="inline-flex items-center justify-center rounded-lg p-2 text-muted
		hover:bg-surface-hover hover:text-on-surface transition-colors {className}"
	aria-label="Settings"
	aria-expanded={open}
>
	<Settings class="size-4" />
</button>
