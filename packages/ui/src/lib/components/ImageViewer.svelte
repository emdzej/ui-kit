<!--
  @component ImageViewer

  Full-screen image lightbox overlay. Shows an image with backdrop blur,
  close button, and escape-key dismissal.

  @example
  ```svelte
  <ImageViewer src={lightboxSrc} onclose={() => (lightboxSrc = null)} />
  ```
-->
<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { X } from '@lucide/svelte';

	interface Props {
		/** Image URL to display. `null` = closed. */
		src: string | null;
		/** Alt text for the image */
		alt?: string;
		/** Callback to close the viewer */
		onclose: () => void;
	}

	let { src, alt = '', onclose }: Props = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onclose();
		}
	}

	$effect(() => {
		if (!BROWSER || !src) return;
		window.addEventListener('keydown', handleKeydown);
		// Prevent body scroll
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			window.removeEventListener('keydown', handleKeydown);
			document.body.style.overflow = prev;
		};
	});
</script>

{#if src}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-label={alt || 'Image viewer'}
		tabindex="-1"
	>
		<button
			type="button"
			onclick={onclose}
			class="absolute top-4 right-4 rounded-full bg-surface-alt/90 p-2 text-on-surface hover:bg-surface-hover transition-colors"
			aria-label="Close"
		>
			<X class="size-5" aria-hidden="true" />
		</button>
		<img
			{src}
			{alt}
			class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-ui-lg"
		/>
	</div>
{/if}
