import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const baseLayoutPath = resolve(rootDir, 'src/layouts/BaseLayout.astro');
const headerPath = resolve(rootDir, 'src/layouts/header/Header.astro');
const themeTogglePath = resolve(rootDir, 'src/components/theme/ThemeToggle.astro');
const themeToggleStylesPath = resolve(rootDir, 'src/components/theme/theme-toggle.css');
const themeRuntimePath = resolve(rootDir, 'src/components/theme/themeRuntime.ts');
const homeScriptPath = resolve(rootDir, 'src/scripts/home-page.ts');
const headerRuntimePath = resolve(rootDir, 'src/layouts/header/headerRuntime.ts');
const homePage = readFileSync(homePagePath, 'utf8');
const baseLayout = readFileSync(baseLayoutPath, 'utf8');
const headerSource = readFileSync(headerPath, 'utf8');
const themeToggleSource = readFileSync(themeTogglePath, 'utf8');
const themeToggleStylesSource = readFileSync(themeToggleStylesPath, 'utf8');
const themeRuntime = readFileSync(themeRuntimePath, 'utf8');
const homeScript = readFileSync(homeScriptPath, 'utf8');
const headerRuntime = readFileSync(headerRuntimePath, 'utf8');

describe('theme toggle contract', () => {
	it('renders a theme toggle control with accessibility semantics', () => {
		expect(homePage).toContain("import BaseLayout from '../layouts/BaseLayout.astro'");
		expect(baseLayout).toContain("import Header from './header/Header.astro'");
		expect(baseLayout).toContain('<Header />');
		expect(headerSource).toContain("import ThemeToggle from '../../components/theme/ThemeToggle.astro'");
		expect(headerSource).toContain('<ThemeToggle />');
		expect(themeToggleSource).toContain("import './theme-toggle.css';");
		expect(themeToggleStylesSource).toContain('.theme-toggle {');
		expect(themeToggleStylesSource).toContain('.theme-icon-moon {');
		expect(themeToggleSource).toContain('class="theme-toggle"');
		expect(themeToggleSource).toContain('aria-pressed="false"');
		expect(themeToggleSource).toContain('aria-label="Toggle color theme"');
	});

	it('includes client-side persistence and toggle state update hooks', () => {
		expect(homeScript).toContain('initHeaderRuntime({');
		expect(headerRuntime).toContain('initThemeRuntime()');
		expect(themeRuntime).toContain("const themeToggle = document.querySelector('.theme-toggle')");
		expect(themeRuntime).toContain('localStorage.setItem(\'theme-preference\', nextTheme)');
		expect(themeRuntime).toContain('document.documentElement.dataset.theme = nextTheme');
		expect(themeRuntime).toContain('themeToggle.setAttribute(\'aria-pressed\', String(nextTheme === \'dark\'))');
	});
});
