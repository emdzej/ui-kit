import type { Action } from 'svelte/action';

/**
 * Svelte action that calls a handler when a click occurs outside the element.
 *
 * @example
 * ```svelte
 * <div use:clickOutside={() => (open = false)}>
 *   Dropdown content
 * </div>
 * ```
 */
export const clickOutside: Action<HTMLElement, () => void> = (node, handler) => {
	let currentHandler = handler;

	const handleClick = (event: MouseEvent) => {
		if (
			currentHandler &&
			node &&
			!node.contains(event.target as Node) &&
			!event.defaultPrevented
		) {
			currentHandler();
		}
	};

	// Use a microtask delay to avoid triggering on the click that opens the element
	const startListening = () => {
		document.addEventListener('click', handleClick, true);
	};

	// Delay to next tick so the opening click doesn't immediately close
	requestAnimationFrame(() => {
		startListening();
	});

	return {
		update(newHandler: () => void) {
			currentHandler = newHandler;
		},
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
