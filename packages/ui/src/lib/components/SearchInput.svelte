<!--
  @component SearchInput

  A search text input with icon and keyboard shortcut support.
  Supports Cmd/Ctrl+K to focus and Escape to clear.

  @example
  ```svelte
  <SearchInput
    bind:value={query}
    placeholder="Search parts..."
    onsubmit={(q) => goto(`/search?q=${q}`)}
  />
  ```
-->
<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { Search } from '@lucide/svelte';

	interface Props {
		/** Current input value (bindable) */
		value?: string;
		/** Placeholder text */
		placeholder?: string;
		/** Called on every input change */
		oninput?: (value: string) => void;
		/** Called on form submit (Enter key) */
		onsubmit?: (value: string) => void;
		/** Additional CSS classes for the wrapper */
		class?: string;
		/** Enable Cmd/Ctrl+K keyboard shortcut to focus */
		shortcut?: boolean;
	}

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		oninput,
		onsubmit,
		class: className = '',
		shortcut = true
	}: Props = $props();

	let inputEl: HTMLInputElement | undefined = $state();

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		oninput?.(value);
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (value.trim()) {
			onsubmit?.(value.trim());
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			value = '';
			oninput?.('');
			inputEl?.blur();
		}
	}

	$effect(() => {
		if (!BROWSER || !shortcut) return;

		const handleGlobalKeydown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				inputEl?.focus();
			}
			if (e.key === '/' && document.activeElement === document.body) {
				e.preventDefault();
				inputEl?.focus();
			}
		};

		window.addEventListener('keydown', handleGlobalKeydown);
		return () => window.removeEventListener('keydown', handleGlobalKeydown);
	});
</script>

<form role="search" onsubmit={handleSubmit} class="relative {className}">
	<div class="absolute left-3 inset-y-0 flex items-center pointer-events-none" aria-hidden="true">
		<Search class="size-4 text-muted" />
	</div>
	<input
		bind:this={inputEl}
		type="search"
		{placeholder}
		value={value}
		oninput={handleInput}
		onkeydown={handleKeydown}
		class="w-full rounded-lg border border-border bg-surface-alt pl-10 {shortcut ? 'pr-16' : 'pr-4'} py-2 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
	/>
	{#if shortcut && !value}
		<div class="absolute right-3 inset-y-0 hidden sm:flex items-center pointer-events-none">
			<kbd
				class="inline-flex items-center gap-0.5 rounded border border-border bg-surface-raised px-1.5 py-0.5 text-xs text-muted"
			>
				<span class="text-xs">{BROWSER && navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl+'}</span>K
			</kbd>
		</div>
	{/if}
</form>
