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
	<svg
		class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		aria-hidden="true"
	>
		<path
			fill-rule="evenodd"
			d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
			clip-rule="evenodd"
		/>
	</svg>
	<input
		bind:this={inputEl}
		type="search"
		{placeholder}
		value={value}
		oninput={handleInput}
		onkeydown={handleKeydown}
		class="w-full rounded-md border border-border bg-surface-alt pl-10 pr-4 py-2 text-sm text-on-surface placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
	/>
	{#if shortcut && !value}
		<kbd
			class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-surface-raised px-1.5 py-0.5 text-xs text-muted pointer-events-none"
		>
			<span class="text-xs">{BROWSER && navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl+'}</span>K
		</kbd>
	{/if}
</form>
