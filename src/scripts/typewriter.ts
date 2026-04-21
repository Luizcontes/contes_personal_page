const TYPE_SPEED_MS = 22;
const CURSOR_CLASS = 'typewriter-cursor';
const HIDDEN_CLASS = 'typewriter-hidden';

interface TypewriterOptions {
	onComplete?: () => void;
}

export function typewriterEffect(element: HTMLElement, options: TypewriterOptions = {}): () => void {
	const text = element.textContent ?? '';

	// Respect reduced-motion preference — show text immediately, no animation.
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reducedMotion || !text) {
		options.onComplete?.();
		return () => {};
	}

	// Preserve full text for screen readers before we clear the visible content.
	element.setAttribute('aria-label', text);
	element.textContent = '';
	element.classList.add(CURSOR_CLASS);

	let index = 0;
	let cancelled = false;

	const type = (): void => {
		if (cancelled) return;
		if (index < text.length) {
			element.textContent = text.slice(0, index + 1);
			index++;
			setTimeout(type, TYPE_SPEED_MS);
		} else {
			options.onComplete?.();
		}
	};

	setTimeout(type, TYPE_SPEED_MS);

	// Return a cancel function that stops the loop and restores the full text.
	return (): void => {
		cancelled = true;
		element.textContent = text;
		element.classList.remove(CURSOR_CLASS);
	};
}

export function typewriterSequence(elements: HTMLElement[]): () => void {
	if (!elements.length) return () => {};

	let cancelCurrent: (() => void) | null = null;
	let cancelled = false;

	// Hide all elements after the first — revealed just before their turn.
	elements.slice(1).forEach((el) => el.classList.add(HIDDEN_CLASS));

	const typeNext = (index: number): void => {
		if (cancelled || index >= elements.length) return;

		const el = elements[index];
		const isLast = index === elements.length - 1;

		// Reveal the element right before typing it.
		el.classList.remove(HIDDEN_CLASS);

		cancelCurrent = typewriterEffect(el, {
			onComplete: () => {
				if (!isLast) {
					// Move cursor to the next element.
					el.classList.remove(CURSOR_CLASS);
					typeNext(index + 1);
				}
				// Last element keeps CURSOR_CLASS so the cursor stays blinking.
			},
		});
	};

	typeNext(0);

	return (): void => {
		cancelled = true;
		cancelCurrent?.();
		elements.forEach((el) => {
			el.classList.remove(CURSOR_CLASS);
			el.classList.remove(HIDDEN_CLASS);
		});
	};
}
