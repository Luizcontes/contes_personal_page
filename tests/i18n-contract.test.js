import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const astroConfig = readFileSync(resolve('astro.config.mjs'), 'utf-8');
const homePage = readFileSync(resolve('src/pages/index.astro'), 'utf-8');

describe('i18n config contract', () => {
	it('declares all three supported locales in astro.config.mjs', () => {
		expect(astroConfig).toContain("defaultLocale: 'en'");
		expect(astroConfig).toContain("'en'");
		expect(astroConfig).toContain("'pt-br'");
		expect(astroConfig).toContain("'es'");
	});

	it('uses prefixDefaultLocale: false so English stays at root', () => {
		expect(astroConfig).toContain('prefixDefaultLocale: false');
	});
});

describe('i18n ui dictionary contract', () => {
	it('exports languages, defaultLang, and ui from src/i18n/ui.ts', () => {
		const ui = readFileSync(resolve('src/i18n/ui.ts'), 'utf-8');
		expect(ui).toContain('export const languages');
		expect(ui).toContain('export const defaultLang');
		expect(ui).toContain('export const ui');
		expect(ui).toContain("'en'");
		expect(ui).toContain("'pt-br'");
		expect(ui).toContain('es');
	});

	it('includes nav label translations for all three locales', () => {
		const ui = readFileSync(resolve('src/i18n/ui.ts'), 'utf-8');
		expect(ui).toContain('nav.home');
		expect(ui).toContain('nav.whoIAm');
		expect(ui).toContain('nav.projects');
		expect(ui).toContain('nav.blog');
		expect(ui).toContain('nav.contact');
	});
});

describe('i18n utils contract', () => {
	it('exports getLangFromUrl, useTranslations, and useTranslatedPath from src/i18n/utils.ts', () => {
		const utils = readFileSync(resolve('src/i18n/utils.ts'), 'utf-8');
		expect(utils).toContain('export function getLangFromUrl');
		expect(utils).toContain('export function useTranslations');
		expect(utils).toContain('export function useTranslatedPath');
	});
});

describe('i18n bootstrap contract', () => {
	it('includes a pre-paint locale bootstrap script that checks localStorage and navigator.language', () => {
		expect(homePage).toContain("localStorage.getItem('locale-preference')");
		expect(homePage).toContain('navigator.language');
		expect(homePage).toContain('document.documentElement.lang');
	});
});

describe('language picker contract', () => {
	it('renders a language picker button with accessible semantics', () => {
		expect(homePage).toContain('class="lang-picker"');
		expect(homePage).toContain('aria-label');
	});

	it('lang picker is positioned before the theme toggle in markup', () => {
		const langPickerIndex = homePage.indexOf('lang-picker');
		const themeToggleIndex = homePage.indexOf('theme-toggle');
		expect(langPickerIndex).toBeGreaterThan(-1);
		expect(themeToggleIndex).toBeGreaterThan(-1);
		expect(langPickerIndex).toBeLessThan(themeToggleIndex);
	});
});
