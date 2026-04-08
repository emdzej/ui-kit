import type { Action } from 'svelte/action';

export interface ImageMagnifyOptions {
	/** Zoom magnification factor (default: 5) */
	zoom?: number;
	/** Lens diameter in pixels (default: 180) */
	lensSize?: number;
	/** CSS selector for images to magnify within the container.
	 *  Defaults to 'img' (all images). */
	selector?: string;
	/** Activation method: 'alt' requires Alt/Option key held, 'always' shows on hover (default: 'alt') */
	activation?: 'alt' | 'always';
	/** Optional callback when an image is clicked */
	onclick?: (src: string) => void;
}

/**
 * Svelte action that adds a magnifying-glass lens on image hover.
 * Attach to a container element — all matching images inside will be magnifiable.
 *
 * The lens uses CSS `background-image` to show a zoomed region of the source
 * image, centered under the cursor. Activated by holding Alt/Option (default)
 * or on all hovers.
 *
 * @example
 * ```svelte
 * <article use:imageMagnify={{ zoom: 5, lensSize: 200 }}>
 *   <img src="/diagram.png" alt="Diagram" />
 * </article>
 * ```
 *
 * @example With click-to-open lightbox:
 * ```svelte
 * <div use:imageMagnify={{ onclick: (src) => (lightboxSrc = src) }}>
 *   <img src="/photo.jpg" alt="Photo" />
 * </div>
 * ```
 */
export const imageMagnify: Action<HTMLElement, ImageMagnifyOptions | undefined> = (
	node,
	options
) => {
	let opts = resolveOptions(options);
	let lens: HTMLDivElement | null = null;
	let cursorStyle: HTMLStyleElement | null = null;
	let activeImg: HTMLImageElement | null = null;
	let hideTimeout: ReturnType<typeof setTimeout> | null = null;

	function resolveOptions(o: ImageMagnifyOptions | undefined): Required<ImageMagnifyOptions> {
		return {
			zoom: o?.zoom ?? 5,
			lensSize: o?.lensSize ?? 180,
			selector: o?.selector ?? 'img',
			activation: o?.activation ?? 'alt',
			onclick: o?.onclick ?? (() => {})
		};
	}

	function createLens(): HTMLDivElement {
		const el = document.createElement('div');
		el.style.cssText = `
			position: fixed;
			border-radius: 50%;
			border: 3px solid rgba(255,255,255,0.9);
			box-shadow: 0 4px 20px rgba(0,0,0,0.3);
			pointer-events: none;
			opacity: 0;
			transition: opacity 0.15s ease;
			z-index: 9999;
			background-repeat: no-repeat;
			will-change: transform, background-position;
		`;
		document.body.appendChild(el);
		return el;
	}

	function createCursorStyle(): HTMLStyleElement {
		const style = document.createElement('style');
		style.textContent = `[data-magnify-target] { cursor: zoom-in; }`;
		document.head.appendChild(style);
		return style;
	}

	function findImage(target: EventTarget | null): HTMLImageElement | null {
		if (!target || !(target instanceof Element)) return null;
		const img = target.closest(opts.selector) as HTMLImageElement | null;
		if (!img || !node.contains(img)) return null;
		return img;
	}

	function showLens(img: HTMLImageElement, clientX: number, clientY: number) {
		if (!lens) lens = createLens();
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			hideTimeout = null;
		}

		const rect = img.getBoundingClientRect();
		const relX = clientX - rect.left;
		const relY = clientY - rect.top;
		const z = opts.zoom;
		const size = opts.lensSize;

		// Background image and zoom
		lens.style.width = `${size}px`;
		lens.style.height = `${size}px`;
		lens.style.backgroundImage = `url(${img.src})`;
		lens.style.backgroundSize = `${rect.width * z}px ${rect.height * z}px`;

		// Center the zoomed region under the lens
		const bgX = -(relX * z - size / 2);
		const bgY = -(relY * z - size / 2);
		lens.style.backgroundPosition = `${bgX}px ${bgY}px`;

		// Position lens centered on cursor
		lens.style.left = `${clientX - size / 2}px`;
		lens.style.top = `${clientY - size / 2}px`;
		lens.style.opacity = '1';

		activeImg = img;
	}

	function hideLens() {
		if (!lens) return;
		lens.style.opacity = '0';
		hideTimeout = setTimeout(() => {
			if (lens) lens.style.backgroundImage = '';
		}, 150);
		activeImg = null;
	}

	function handleMouseMove(e: MouseEvent) {
		if (opts.activation === 'alt' && !e.altKey) {
			if (activeImg) hideLens();
			return;
		}

		const img = findImage(e.target);
		if (img) {
			showLens(img, e.clientX, e.clientY);
		} else if (activeImg) {
			hideLens();
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (e.key === 'Alt' && activeImg) {
			hideLens();
		}
	}

	function handleMouseLeave() {
		if (activeImg) hideLens();
	}

	function handleClick(e: MouseEvent) {
		if (!opts.onclick) return;
		const img = findImage(e.target);
		if (img) {
			opts.onclick(img.src);
		}
	}

	// Mark magnifiable images for cursor styling
	function tagImages() {
		node.querySelectorAll(opts.selector).forEach((img) => {
			img.setAttribute('data-magnify-target', '');
		});
	}

	function untagImages() {
		node.querySelectorAll('[data-magnify-target]').forEach((img) => {
			img.removeAttribute('data-magnify-target');
		});
	}

	// Initialize
	cursorStyle = createCursorStyle();
	tagImages();
	node.addEventListener('mousemove', handleMouseMove);
	node.addEventListener('mouseleave', handleMouseLeave);
	node.addEventListener('click', handleClick);
	document.addEventListener('keyup', handleKeyUp);

	return {
		update(newOptions: ImageMagnifyOptions | undefined) {
			opts = resolveOptions(newOptions);
			// Re-tag images (selector might have changed)
			untagImages();
			tagImages();
			// Update lens size if it exists
			if (lens) {
				lens.style.width = `${opts.lensSize}px`;
				lens.style.height = `${opts.lensSize}px`;
			}
		},
		destroy() {
			node.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseleave', handleMouseLeave);
			node.removeEventListener('click', handleClick);
			document.removeEventListener('keyup', handleKeyUp);
			untagImages();
			if (hideTimeout) clearTimeout(hideTimeout);
			if (lens) {
				lens.remove();
				lens = null;
			}
			if (cursorStyle) {
				cursorStyle.remove();
				cursorStyle = null;
			}
		}
	};
};
