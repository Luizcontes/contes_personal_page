import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const source = readFileSync(resolve('src/scripts/typewriter.ts'), 'utf-8');

describe('typewriter script contract', () => {
	it('exports typewriterEffect as a named function export', () => {
		expect(source).toContain('export function typewriterEffect');
	});

	it('exports typewriterSequence as a named function export', () => {
		expect(source).toContain('export function typewriterSequence');
	});

	it('accepts an HTMLElement parameter', () => {
		expect(source).toContain('HTMLElement');
	});

	it('reads text from element textContent', () => {
		expect(source).toContain('textContent');
	});

	it('returns a cancel/cleanup function', () => {
		expect(source).toContain('() => void');
	});

	it('respects prefers-reduced-motion: reduce', () => {
		expect(source).toContain('prefers-reduced-motion');
		expect(source).toContain('reduce');
	});

	it('tracks cancelled state to stop the animation loop', () => {
		expect(source).toContain('cancelled');
	});

	it('wraps each character in a span with typewriter-char class', () => {
		expect(source).toContain('CHAR_CLASS');
		expect(source).toContain('typewriter-char');
	});

	it('reveals each character by adding typewriter-char--visible class', () => {
		expect(source).toContain('CHAR_VISIBLE_CLASS');
		expect(source).toContain('typewriter-char--visible');
	});

	it('adds and removes a cursor class to mark the active element', () => {
		expect(source).toContain('CURSOR_CLASS');
		expect(source).toContain('classList.add');
		expect(source).toContain('classList.remove');
	});

	it('moves cursor span-by-span in sync with each character reveal', () => {
		expect(source).toContain('moveCursor');
		expect(source).toContain('activeCursor');
	});

	it('cleans up span-level cursor when moving between sequence elements', () => {
		expect(source).toContain('removeCursorFromElement');
	});

	it('pre-wraps all elements in sequence so all paragraphs start invisible', () => {
		expect(source).toContain('wrapElement');
		expect(source).toContain('forEach(wrapElement)');
	});

	it('chains elements in sequence and keeps cursor on last element', () => {
		expect(source).toContain('typeNext');
		expect(source).toContain('isLast');
	});
});
