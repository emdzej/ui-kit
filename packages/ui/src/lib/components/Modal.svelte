<!--
  @component Modal

  A dialog/modal component built on Bits UI Dialog for accessibility
  (focus trapping, aria attributes, portal rendering, escape-to-close).

  Provides styled overlay + panel with optional title, description, and
  close button. Content is passed via the `children` snippet.

  @example
  ```svelte
  <Modal bind:open={showSettings} title="Settings">
    <p>Modal content here</p>
  </Modal>
  ```

  @example
  ```svelte
  <Modal bind:open={confirmDelete} title="Delete item?" description="This cannot be undone.">
    <div class="flex gap-2 justify-end">
      <button onclick={() => (confirmDelete = false)}>Cancel</button>
      <button onclick={handleDelete}>Delete</button>
    </div>
  </Modal>
  ```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from 'bits-ui';
	import { X } from '@lucide/svelte';

	interface Props {
		/** Whether the modal is open (bindable) */
		open?: boolean;
		/** Optional title displayed in the modal header */
		title?: string;
		/** Optional description below the title */
		description?: string;
		/** Show close (X) button in top-right corner */
		closable?: boolean;
		/** Maximum width class (e.g. 'max-w-lg', 'max-w-2xl') */
		maxWidth?: string;
		/** Additional CSS classes for the content panel */
		class?: string;
		/** Modal body content */
		children?: Snippet;
		/** Called when the modal is closed (backdrop click, escape, close button) */
		onclose?: () => void;
	}

	let {
		open = $bindable(false),
		title,
		description,
		closable = true,
		maxWidth = 'max-w-lg',
		class: className = '',
		children,
		onclose
	}: Props = $props();

	function getOpen() {
		return open;
	}

	function setOpen(value: boolean) {
		open = value;
		if (!value) {
			onclose?.();
		}
	}
</script>

<Dialog.Root bind:open={getOpen, setOpen}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
		/>
		<Dialog.Content
			class="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] {maxWidth} rounded-xl border border-border bg-surface-alt p-6 shadow-ui-lg focus:outline-none {className}"
		>
			{#if title}
				<Dialog.Title class="text-lg font-semibold text-on-surface">
					{title}
				</Dialog.Title>
			{/if}
			{#if description}
				<Dialog.Description class="mt-1 text-sm text-muted">
					{description}
				</Dialog.Description>
			{/if}

			{#if children}
				<div class="{title || description ? 'mt-4' : ''}">
					{@render children()}
				</div>
			{/if}

			{#if closable}
				<Dialog.Close
					class="absolute top-4 right-4 rounded-full p-1.5 text-muted hover:text-on-surface hover:bg-surface-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
					aria-label="Close"
				>
					<X class="size-5" aria-hidden="true" />
				</Dialog.Close>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
