import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const homePage = readFileSync(homePagePath, 'utf8');

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

		expect(homePage).toContain('href="/projects"');
		expect(homePage).toContain('>Projects<');

		expect(homePage).toContain('href="/blog"');
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
});
