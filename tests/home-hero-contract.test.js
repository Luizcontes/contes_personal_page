import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const globalStylesPath = resolve(rootDir, 'src/styles/global.css');

const homePage = readFileSync(homePagePath, 'utf8');
const globalStyles = readFileSync(globalStylesPath, 'utf8');

describe('home item 2 contract: hero section', () => {
	it('contains a hero section with a positioning label and supporting copy', () => {
		expect(homePage).toContain('id="hero"');
		expect(homePage).toContain('class="hero-eyebrow"');
		expect(homePage).toContain('class="hero-support"');
	});

	it('contains primary and secondary hero CTAs with valid targets', () => {
		expect(homePage).toContain('class="hero-cta hero-cta-primary"');
		expect(homePage).toContain('href="#contact"');
		expect(homePage).toContain('class="hero-cta hero-cta-secondary"');
		expect(homePage).toContain('href="/projects"');
	});

	it('uses hero-specific token-driven style hooks', () => {
		expect(globalStyles).toContain('.hero-section');
		expect(globalStyles).toContain('.hero-eyebrow');
		expect(globalStyles).toContain('.hero-support');
		expect(globalStyles).toContain('.hero-actions');
		expect(globalStyles).toContain('var(--color-accent-cyan)');
		expect(globalStyles).toContain('var(--color-accent-purple)');
	});
});
