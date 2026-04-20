import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const globalStylesPath = resolve(rootDir, 'src/styles/global.css');

const homePage = readFileSync(homePagePath, 'utf8');
const globalStyles = readFileSync(globalStylesPath, 'utf8');

describe('home item 3 contract: hero two-column layout', () => {
	it('keeps title above eyebrow and renders right-side profile image markup', () => {
		const titleIndex = homePage.indexOf('data-i18n="hero.title"');
		const eyebrowIndex = homePage.indexOf('data-i18n="hero.eyebrow"');

		expect(titleIndex).toBeGreaterThan(-1);
		expect(eyebrowIndex).toBeGreaterThan(-1);
		expect(titleIndex).toBeLessThan(eyebrowIndex);

		expect(homePage).toContain('class="hero-layout"');
		expect(homePage).toContain('class="hero-copy"');
		expect(homePage).toContain('class="hero-top"');
		expect(homePage).toContain('class="hero-body"');
		expect(homePage).toContain('class="hero-media"');
		expect(homePage).toContain('class="hero-image"');
		expect(homePage).toContain('src="/images/me.png"');
	});

	it('defines hero layout hooks for left copy and right image positioning', () => {
		expect(globalStyles).toContain('.hero-layout');
		expect(globalStyles).toContain('.hero-copy');
		expect(globalStyles).toContain('.hero-top');
		expect(globalStyles).toContain('.hero-body');
		expect(globalStyles).toContain('.hero-media');
		expect(globalStyles).toContain('.hero-image');
	});
});
