import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const homeScriptPath = resolve(rootDir, 'src/scripts/home-page.ts');
const homePage = readFileSync(homePagePath, 'utf8');
const homeScript = readFileSync(homeScriptPath, 'utf8');

describe('theme toggle contract', () => {
	it('renders a theme toggle control with accessibility semantics', () => {
		expect(homePage).toContain('class="theme-toggle"');
		expect(homePage).toContain('aria-pressed="false"');
		expect(homePage).toContain('aria-label="Toggle color theme"');
	});

	it('includes client-side persistence and toggle state update hooks', () => {
		expect(homeScript).toContain('const themeToggle = document.querySelector(\'.theme-toggle\')');
		expect(homeScript).toContain('localStorage.setItem(\'theme-preference\', nextTheme)');
		expect(homeScript).toContain('document.documentElement.dataset.theme = nextTheme');
		expect(homeScript).toContain('themeToggle.setAttribute(\'aria-pressed\', String(nextTheme === \'dark\'))');
	});
});
