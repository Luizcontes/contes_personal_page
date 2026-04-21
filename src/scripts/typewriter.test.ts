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

	it('preserves full text for screen readers via aria-label', () => {
		expect(source).toContain('aria-label');
	});

	it('tracks cancelled state to stop the animation loop', () => {
		expect(source).toContain('cancelled');
	});

	it('adds and removes a cursor class to mark the active element', () => {
		expect(source).toContain('CURSOR_CLASS');
		expect(source).toContain('classList.add');
		expect(source).toContain('classList.remove');
	});

	it('chains elements in sequence and keeps cursor on last element', () => {
		expect(source).toContain('typeNext');
		expect(source).toContain('isLast');
	});

	it('hides subsequent elements until their turn to type', () => {
		expect(source).toContain('HIDDEN_CLASS');
		expect(source).toContain('typewriter-hidden');
	});
});
