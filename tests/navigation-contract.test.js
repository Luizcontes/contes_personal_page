import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const homePagePath = resolve(rootDir, 'src/pages/index.astro');
const baseLayoutPath = resolve(rootDir, 'src/layouts/BaseLayout.astro');
const headerPath = resolve(rootDir, 'src/layouts/header/Header.astro');
const headerStylesPath = resolve(rootDir, 'src/layouts/header/header.css');
const primaryNavPath = resolve(rootDir, 'src/components/menu/PrimaryNav.astro');
const primaryNavStylesPath = resolve(rootDir, 'src/components/menu/primary-nav.css');
const primaryNavRuntimePath = resolve(rootDir, 'src/components/menu/primaryNavRuntime.ts');
const homeScriptPath = resolve(rootDir, 'src/scripts/home-page.ts');
const headerRuntimePath = resolve(rootDir, 'src/layouts/header/headerRuntime.ts');
const languagePickerRuntimePath = resolve(rootDir, 'src/components/language-picker/languagePickerRuntime.ts');
const homePage = readFileSync(homePagePath, 'utf8');
const baseLayout = readFileSync(baseLayoutPath, 'utf8');
const headerSource = readFileSync(headerPath, 'utf8');
const headerStylesSource = readFileSync(headerStylesPath, 'utf8');
const primaryNavSource = readFileSync(primaryNavPath, 'utf8');
const primaryNavStylesSource = readFileSync(primaryNavStylesPath, 'utf8');
const primaryNavRuntime = readFileSync(primaryNavRuntimePath, 'utf8');
const homeScript = readFileSync(homeScriptPath, 'utf8');
const headerRuntime = readFileSync(headerRuntimePath, 'utf8');
const languagePickerRuntime = readFileSync(languagePickerRuntimePath, 'utf8');

describe('navigation contract', () => {
	it('renders semantic header and primary navigation landmarks', () => {
		expect(homePage).toContain("import BaseLayout from '../layouts/BaseLayout.astro'");
		expect(baseLayout).toContain("import Header from './header/Header.astro'");
		expect(baseLayout).toContain('<Header />');
		expect(headerSource).toContain('<header');
		expect(headerSource).toContain("import './header.css';");
		expect(headerStylesSource).toContain('.site-header {');
		expect(headerStylesSource).toContain('.site-header-inner {');
		expect(headerStylesSource).toContain('.header-controls {');
		expect(headerSource).toContain("import PrimaryNav from '../../components/menu/PrimaryNav.astro'");
		expect(headerSource).toContain('<PrimaryNav />');
		expect(primaryNavSource).toContain("import './primary-nav.css';");
		expect(primaryNavStylesSource).toContain('.nav-toggle {');
		expect(primaryNavStylesSource).toContain('.primary-nav {');
		expect(primaryNavSource).toContain('<nav');
		expect(primaryNavSource).toContain('aria-label="Primary"');
		expect(primaryNavSource).toContain('<ul');
	});

	it('includes all required navigation links with correct targets', () => {
		expect(primaryNavSource).toContain('href="/"');
		expect(primaryNavSource).toContain('>Home<');

		expect(primaryNavSource).toContain('href="/#who-i-am"');
		expect(primaryNavSource).toContain('>Who I Am<');

		expect(primaryNavSource).toContain('href="/#projects"');
		expect(primaryNavSource).toContain('>Projects<');

		expect(primaryNavSource).toContain('href="/#blog"');
		expect(primaryNavSource).toContain('>Blog<');

		expect(primaryNavSource).toContain('href="/#contact"');
		expect(primaryNavSource).toContain('>Contact<');
	});

	it('includes a mobile navigation toggle contract for progressive enhancement', () => {
		expect(primaryNavSource).toContain('class="nav-toggle"');
		expect(primaryNavSource).toContain('aria-expanded="false"');
		expect(primaryNavSource).toContain('aria-controls="primary-nav"');
		expect(primaryNavSource).toContain('id="primary-nav"');
	});

	it('uses a three-strip icon and accessible label in mobile toggle', () => {
		expect(primaryNavSource).toContain('class="nav-toggle-icon"');
		expect(primaryNavSource).toContain('class="nav-toggle-bar"');
		expect(primaryNavSource.match(/class="nav-toggle-bar"/g)?.length ?? 0).toBe(3);
		expect(primaryNavSource).toContain('class="sr-only"');
		expect(primaryNavSource).toContain('Menu');
	});

	it('defines mobile open-close state hooks for navigation behavior', () => {
		expect(headerSource).toContain('data-nav-open="false"');
		expect(primaryNavRuntime).toContain('const navToggle = document.querySelector(\'.nav-toggle\')');
		expect(primaryNavRuntime).toContain('navToggle.setAttribute(\'aria-expanded\', String(nextOpen))');
		expect(primaryNavRuntime).toContain('siteHeader.dataset.navOpen = String(nextOpen)');
		expect(primaryNavRuntime).toContain('primaryNav.addEventListener(\'click\', (event) => {');
		expect(primaryNavRuntime).toContain('closeNavPanel();');
		expect(headerRuntime).toContain('initPrimaryNavRuntime({');
		expect(homeScript).toContain('initHeaderRuntime({');
	});

	it('closes language panel before opening mobile navigation panel', () => {
		expect(languagePickerRuntime).toContain('const closeLangPanel = () =>');
		expect(primaryNavRuntime).toContain('if (nextOpen) {');
		expect(primaryNavRuntime).toContain('closeLangPanel();');
	});

	it('tracks active nav section while scrolling with IntersectionObserver', () => {
		expect(primaryNavRuntime).toContain('new IntersectionObserver(');
		expect(primaryNavRuntime).toContain("['hero', '/']");
		expect(primaryNavRuntime).toContain("['who-i-am', '/#who-i-am']");
		expect(primaryNavRuntime).toContain("['projects', '/#projects']");
		expect(primaryNavRuntime).toContain("['blog', '/#blog']");
		expect(primaryNavRuntime).toContain("['contact', '/#contact']");
		expect(primaryNavRuntime).toContain('observer.observe(section);');
	});
});
