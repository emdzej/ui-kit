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

<form role="search" onsubmit={handleSubmit} class="{className}">
	<div class="flex items-center rounded-lg border border-border bg-surface-alt px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-ring transition-shadow">
		<Search class="size-4 shrink-0 text-muted" aria-hidden="true" />
		<input
			bind:this={inputEl}
			type="search"
			{placeholder}
			value={value}
			oninput={handleInput}
			onkeydown={handleKeydown}
			class="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-muted"
		/>
		{#if shortcut && !value}
			<kbd
				class="hidden sm:inline-flex items-center gap-0.5 shrink-0 rounded border border-border bg-surface-raised px-1.5 py-0.5 text-xs text-muted"
			>
				<span class="text-xs">{BROWSER && navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl+'}</span>K
			</kbd>
		{/if}
	</div>
</form>
