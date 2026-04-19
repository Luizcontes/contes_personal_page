import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const baseLayoutPath = resolve(rootDir, 'src/layouts/BaseLayout.astro');
const globalStylesPath = resolve(rootDir, 'src/styles/global.css');

const baseLayout = readFileSync(baseLayoutPath, 'utf8');
const globalStyles = readFileSync(globalStylesPath, 'utf8');

describe('theme contract', () => {
	it('defines light and dark theme token maps in global stylesheet', () => {
		expect(globalStyles).toContain('html[data-theme="dark"]');
		expect(globalStyles).toContain('html[data-theme="light"]');
		expect(globalStyles).toContain('--color-bg');
		expect(globalStyles).toContain('--color-text');
	});

	it('includes a pre-paint theme bootstrap in the document head', () => {
		expect(baseLayout).toContain('const storedTheme = localStorage.getItem(\'theme-preference\')');
		expect(baseLayout).toContain('window.matchMedia(\'(prefers-color-scheme: dark)\')');
		expect(baseLayout).toContain('document.documentElement.dataset.theme = resolvedTheme');
	});
});
