import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const homeScriptPath = resolve(rootDir, 'src/scripts/home-page.ts');
const homePage = readFileSync(homePagePath, 'utf8');
const homeScript = readFileSync(homeScriptPath, 'utf8');

describe('navigation contract', () => {
	it('renders semantic header and primary navigation landmarks', () => {
		expect(homePage).toContain('<header');
		expect(homePage).toContain('<nav');
		expect(homePage).toContain('aria-label="Primary"');
		expect(homePage).toContain('<ul');
	});

	it('includes all required navigation links with correct targets', () => {
		expect(homePage).toContain('href="/"');
		expect(homePage).toContain('>Home<');

		expect(homePage).toContain('href="/#who-i-am"');
		expect(homePage).toContain('>Who I Am<');

		expect(homePage).toContain('href="/#projects"');
		expect(homePage).toContain('>Projects<');

		expect(homePage).toContain('href="/#blog"');
		expect(homePage).toContain('>Blog<');

		expect(homePage).toContain('href="/#contact"');
		expect(homePage).toContain('>Contact<');
	});

	it('includes a mobile navigation toggle contract for progressive enhancement', () => {
		expect(homePage).toContain('class="nav-toggle"');
		expect(homePage).toContain('aria-expanded="false"');
		expect(homePage).toContain('aria-controls="primary-nav"');
		expect(homePage).toContain('id="primary-nav"');
	});

	it('uses a three-strip icon and accessible label in mobile toggle', () => {
		expect(homePage).toContain('class="nav-toggle-icon"');
		expect(homePage).toContain('class="nav-toggle-bar"');
		expect(homePage.match(/class="nav-toggle-bar"/g)?.length ?? 0).toBe(3);
		expect(homePage).toContain('class="sr-only"');
		expect(homePage).toContain('Menu');
	});

	it('defines mobile open-close state hooks for navigation behavior', () => {
		expect(homePage).toContain('data-nav-open="false"');
		expect(homeScript).toContain('const navToggle = document.querySelector(\'.nav-toggle\')');
		expect(homeScript).toContain('navToggle.setAttribute(\'aria-expanded\', String(nextOpen))');
		expect(homeScript).toContain('siteHeader.dataset.navOpen = String(nextOpen)');
	});

	it('closes language panel before opening mobile navigation panel', () => {
		expect(homeScript).toContain('const closeLangPanel = () =>');
		expect(homeScript).toContain('if (nextOpen) {');
		expect(homeScript).toContain('closeLangPanel();');
	});
});
