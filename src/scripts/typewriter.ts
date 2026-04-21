const TYPE_SPEED_MS = 22;
const CURSOR_CLASS = 'typewriter-cursor';
const CHAR_CLASS = 'typewriter-char';
const CHAR_VISIBLE_CLASS = 'typewriter-char--visible';

interface TypewriterOptions {
	onComplete?: () => void;
}

// Wraps every character in an invisible span. Safe to call only once per element.
function wrapElement(element: HTMLElement): void {
	const text = element.textContent ?? '';
	element.innerHTML = Array.from(text)
		.map((char) => `<span class="${CHAR_CLASS}">${char === '<' ? '&lt;' : char}</span>`)
		.join('');
}

// Removes the cursor class from any span inside the element.
function removeCursorFromElement(element: HTMLElement): void {
	element.querySelectorAll<HTMLSpanElement>(`.${CURSOR_CLASS}`)
		.forEach((s) => s.classList.remove(CURSOR_CLASS));
}

export function typewriterEffect(element: HTMLElement, options: TypewriterOptions = {}): () => void {
	// Respect reduced-motion preference — reveal all chars immediately, no animation.
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Wrap chars if not already done (standalone usage). In sequence usage,
	// typewriterSequence pre-wraps all elements so p2 starts invisible from load.
	const existingSpans = element.querySelectorAll<HTMLSpanElement>(`.${CHAR_CLASS}`);
	if (!existingSpans.length) {
		wrapElement(element);
	}

	const spans = Array.from(
		element.querySelectorAll<HTMLSpanElement>(`.${CHAR_CLASS}`)
	);

	if (reducedMotion || !spans.length) {
		spans.forEach((s) => s.classList.add(CHAR_VISIBLE_CLASS));
		options.onComplete?.();
		return () => {};
	}

	let activeCursor: HTMLSpanElement | null = null;

	// Moves the cursor class to a specific span so it blinks at that position.
	const moveCursor = (span: HTMLSpanElement): void => {
		activeCursor?.classList.remove(CURSOR_CLASS);
		activeCursor = span;
		span.classList.add(CURSOR_CLASS);
	};

	let index = 0;
	let cancelled = false;

	const type = (): void => {
		if (cancelled) return;
		if (index < spans.length) {
			// Move cursor and reveal the character in the same tick.
			moveCursor(spans[index]);
			spans[index].classList.add(CHAR_VISIBLE_CLASS);
			index++;
			setTimeout(type, TYPE_SPEED_MS);
		} else {
			options.onComplete?.();
		}
	};

	setTimeout(type, TYPE_SPEED_MS);

	// Cancel: reveal all remaining chars instantly and remove cursor.
	return (): void => {
		cancelled = true;
		spans.forEach((s) => s.classList.add(CHAR_VISIBLE_CLASS));
		activeCursor?.classList.remove(CURSOR_CLASS);
	};
}

export function typewriterSequence(elements: HTMLElement[]): () => void {
	if (!elements.length) return () => {};

	let cancelCurrent: (() => void) | null = null;
	let cancelled = false;

	// Pre-wrap ALL elements so every paragraph starts invisible from page load.
	elements.forEach(wrapElement);

	const typeNext = (index: number): void => {
		if (cancelled || index >= elements.length) return;

		const el = elements[index];
		const isLast = index === elements.length - 1;

		cancelCurrent = typewriterEffect(el, {
			onComplete: () => {
				if (!isLast) {
					// Remove cursor from this element's last active span.
					removeCursorFromElement(el);
					typeNext(index + 1);
				}
				// Last element's last span keeps the cursor blinking.
			},
		});
	};

	typeNext(0);

	return (): void => {
		cancelled = true;
		cancelCurrent?.();
		elements.forEach((el) => removeCursorFromElement(el));
	};
}
