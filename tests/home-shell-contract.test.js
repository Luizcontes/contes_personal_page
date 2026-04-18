import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const homePage = readFileSync(homePagePath, 'utf8');

describe('home item 1 contract: page shell and anchor skeleton', () => {
	it('defines a single main content region for the home page shell', () => {
		expect(homePage).toContain('<main');
	});

	it('contains anchor-ready section ids for who-i-am, projects, and contact', () => {
		expect(homePage).toContain('id="who-i-am"');
		expect(homePage).toContain('id="projects"');
		expect(homePage).toContain('id="contact"');
	});

	it('keeps section ordering aligned with IA hierarchy', () => {
		const heroIndex = homePage.indexOf('id="hero"');
		const whoIAmIndex = homePage.indexOf('id="who-i-am"');
		const projectsIndex = homePage.indexOf('id="projects"');
		const recentPostsIndex = homePage.indexOf('id="blog"');
		const contactIndex = homePage.indexOf('id="contact"');

		expect(heroIndex).toBeGreaterThan(-1);
		expect(whoIAmIndex).toBeGreaterThan(-1);
		expect(projectsIndex).toBeGreaterThan(-1);
		expect(recentPostsIndex).toBeGreaterThan(-1);
		expect(contactIndex).toBeGreaterThan(-1);
		expect(heroIndex).toBeLessThan(whoIAmIndex);
		expect(whoIAmIndex).toBeLessThan(projectsIndex);
		expect(projectsIndex).toBeLessThan(recentPostsIndex);
		expect(recentPostsIndex).toBeLessThan(contactIndex);
	});

	it('uses token-driven shell class hooks for spacing rhythm', () => {
		expect(homePage).toContain('class="home-shell"');
		expect(homePage).toContain('class="home-section"');
	});
});
