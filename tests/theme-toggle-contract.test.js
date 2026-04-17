import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const homePage = readFileSync(homePagePath, 'utf8');

describe('theme toggle contract', () => {
	it('renders a theme toggle control with accessibility semantics', () => {
		expect(homePage).toContain('class="theme-toggle"');
		expect(homePage).toContain('aria-pressed="false"');
		expect(homePage).toContain('aria-label="Toggle color theme"');
	});

	it('includes client-side persistence and toggle state update hooks', () => {
		expect(homePage).toContain('const themeToggle = document.querySelector(\'.theme-toggle\')');
		expect(homePage).toContain('localStorage.setItem(\'theme-preference\', nextTheme)');
		expect(homePage).toContain('document.documentElement.dataset.theme = nextTheme');
		expect(homePage).toContain('themeToggle.setAttribute(\'aria-pressed\', String(nextTheme === \'dark\'))');
	});
});
