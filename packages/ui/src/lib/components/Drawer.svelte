<!--
  @component Drawer

  A slide-in panel component built on Bits UI Dialog for accessibility
  (focus trapping, aria attributes, portal rendering, escape-to-close).

  Slides in from the right edge of the viewport. Ideal for settings panels,
  detail views, and secondary navigation.

  @example
  ```svelte
  <Drawer bind:open={showSettings} title="Settings">
    <p>Drawer content here</p>
  </Drawer>
  ```

  @example
  ```svelte
  <Drawer bind:open={showDetail} title="Item Details" width="w-96" side="right">
    <p>Detail content here</p>
  </Drawer>
  ```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog } from 'bits-ui';
	import { X } from '@lucide/svelte';

	interface Props {
		/** Whether the drawer is open (bindable) */
		open?: boolean;
		/** Optional title displayed in the drawer header */
		title?: string;
		/** Optional description below the title */
		description?: string;
		/** Show close (X) button in the header */
		closable?: boolean;
		/** Width class for the drawer panel (e.g. 'w-80', 'w-96', 'w-[400px]') */
		width?: string;
		/** Which side the drawer slides in from */
		side?: 'left' | 'right';
		/** Additional CSS classes for the content panel */
		class?: string;
		/** Drawer body content */
		children?: Snippet;
		/** Called when the drawer is closed (backdrop click, escape, close button) */
		onclose?: () => void;
	}

	let {
		open = $bindable(false),
		title,
		description,
		closable = true,
		width = 'w-80',
		side = 'right',
		class: className = '',
		children,
		onclose
	}: Props = $props();

	let prevOpen = $state(open);

	$effect(() => {
		if (prevOpen && !open) {
			onclose?.();
		}
		prevOpen = open;
	});

	const sideClasses = $derived(
		side === 'right'
			? 'right-0 top-0 h-full border-l'
			: 'left-0 top-0 h-full border-r'
	);

	const translateOpen = $derived(
		'translate-x-0'
	);

	const translateClosed = $derived(
		side === 'right' ? 'translate-x-full' : '-translate-x-full'
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
		/>
		<Dialog.Content
			class="fixed z-50 {sideClasses} {width} border-border bg-surface-alt shadow-ui-lg
				transition-transform duration-300 ease-out
				{open ? translateOpen : translateClosed}
				flex flex-col focus:outline-none {className}"
		>
			<!-- Header -->
			{#if title || closable}
				<div class="flex shrink-0 items-center justify-between border-b border-border p-4">
					<div>
						{#if title}
							<Dialog.Title class="text-lg font-semibold text-on-surface">
								{title}
							</Dialog.Title>
						{/if}
						{#if description}
							<Dialog.Description class="mt-0.5 text-sm text-muted">
								{description}
							</Dialog.Description>
						{/if}
					</div>
					{#if closable}
						<Dialog.Close
							class="rounded-full p-1.5 text-muted hover:text-on-surface hover:bg-surface-hover transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
							aria-label="Close"
						>
							<X class="size-5" aria-hidden="true" />
						</Dialog.Close>
					{/if}
				</div>
			{/if}

			<!-- Body -->
			{#if children}
				<div class="flex-1 overflow-y-auto p-4">
					{@render children()}
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
