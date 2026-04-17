import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const globalStylesheetPath = resolve(rootDir, 'src/styles/global.css');

const requiredTokens = [
	'--color-bg',
	'--color-surface',
	'--color-border',
	'--color-accent-cyan',
	'--color-accent-purple',
	'--color-text',
	'--color-text-muted',
	'--font-sans',
	'--space-1',
	'--space-2',
	'--space-3',
	'--space-4',
	'--space-6',
	'--space-8',
	'--space-12',
	'--space-16',
	'--radius-sm',
	'--radius-md',
	'--radius-lg',
	'--radius-xl',
	'--radius-pill',
	'--shadow-sm',
	'--shadow-md',
	'--shadow-lg',
	'--shadow-glow-cyan',
	'--shadow-glow-purple',
	'--ease-standard',
	'--duration-fast',
	'--duration-base',
	'--duration-slow',
];

describe('design token contract', () => {
	it('defines the global stylesheet for design tokens', () => {
		expect(existsSync(globalStylesheetPath)).toBe(true);
	});

	it('includes every approved token in the global stylesheet', () => {
		const stylesheet = readFileSync(globalStylesheetPath, 'utf8');

		for (const token of requiredTokens) {
			expect(stylesheet).toContain(token);
		}
	});

	it('applies the page shell through token references in the global stylesheet', () => {
		const stylesheet = readFileSync(globalStylesheetPath, 'utf8');

		expect(stylesheet).toContain('font-family: var(--font-sans)');
		expect(stylesheet).toContain('background-color: var(--color-bg)');
		expect(stylesheet).toContain('color: var(--color-text)');
	});
});