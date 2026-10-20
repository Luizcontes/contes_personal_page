import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const homePage = readFileSync(homePagePath, 'utf8');
const globalStylesheetPath = resolve(rootDir, 'src/styles/global.css');
const globalStylesheet = readFileSync(globalStylesheetPath, 'utf8');
const baseLayoutPath = resolve(rootDir, 'src/layouts/BaseLayout.astro');
const baseLayout = readFileSync(baseLayoutPath, 'utf8');
const footerPath = resolve(rootDir, 'src/layouts/footer/Footer.astro');
const footer = readFileSync(footerPath, 'utf8');

describe('home item 1 contract: page shell and anchor skeleton', () => {
	it('defines a single main content region for the home page shell', () => {
		expect(homePage).toContain('<main');
	});

	it('contains anchor-ready section ids for projects', () => {
		expect(homePage).toContain('id="projects"');
		expect(homePage).toContain('id="stack"');
		expect(homePage).toContain('id="experience"');
	});

	it('keeps section ordering aligned with IA hierarchy', () => {
		const heroIndex = homePage.indexOf('id="hero"');
		const projectsIndex = homePage.indexOf('id="projects"');
		const recentPostsIndex = homePage.indexOf('id="blog"');
		const stackIndex = homePage.indexOf('id="stack"');
		const experienceIndex = homePage.indexOf('id="experience"');
		const layoutIndex = homePage.indexOf('<BaseLayout');

		expect(heroIndex).toBeGreaterThan(-1);
		expect(projectsIndex).toBeGreaterThan(-1);
		expect(recentPostsIndex).toBeGreaterThan(-1);
		expect(stackIndex).toBeGreaterThan(-1);
		expect(experienceIndex).toBeGreaterThan(-1);
		expect(layoutIndex).toBeGreaterThan(-1);
		expect(baseLayout).toContain('<Footer />');
		expect(heroIndex).toBeLessThan(stackIndex);
		expect(stackIndex).toBeLessThan(experienceIndex);
		expect(experienceIndex).toBeLessThan(projectsIndex);
		expect(projectsIndex).toBeLessThan(recentPostsIndex);
	});

	it('uses token-driven shell class hooks for spacing rhythm', () => {
		expect(homePage).toContain('class="home-shell"');
		expect(homePage).toContain('class="home-section"');
	});

	it('highlights the stack section as the featured home section', () => {
		expect(homePage).toContain(
			'<section id="stack" class="home-section home-section--highlighted">'
		);
	});

	it('uses a full-viewport background layer without a section separator', () => {
		expect(globalStylesheet).toContain('.home-section--highlighted::before');
		expect(globalStylesheet).toContain('width: 100vw');
		expect(globalStylesheet).toContain('transform: translateX(-50%)');
		expect(globalStylesheet).not.toContain('border-bottom: 1px solid var(--color-section-highlight-edge)');
	});
});
