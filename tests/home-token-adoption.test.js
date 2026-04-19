import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const homePage = readFileSync(homePagePath, 'utf8');
const baseLayoutPath = resolve(rootDir, 'src/layouts/BaseLayout.astro');
const baseLayout = readFileSync(baseLayoutPath, 'utf8');

describe('home page token adoption', () => {
	it('imports the global stylesheet for token-driven styling', () => {
		expect(baseLayout).toContain("import '../styles/global.css';");
	});

	it('does not hardcode approved theme colors in the page source', () => {
		const disallowedColors = [
			'#0a0f1e',
			'#131929',
			'#1e2d4a',
			'#22d3ee',
			'#a78bfa',
			'#e2e8f0',
			'#64748b',
		];

		for (const color of disallowedColors) {
			expect(homePage).not.toContain(color);
		}
	});
});