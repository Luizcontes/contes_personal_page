import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const homePage = readFileSync(resolve('src/pages/index.astro'), 'utf-8');
const contactEmailCta = readFileSync(resolve('src/components/contact-email-cta.astro'), 'utf-8');
const uiSource = readFileSync(resolve('src/i18n/ui.ts'), 'utf-8');
const utilsSource = readFileSync(resolve('src/i18n/utils.ts'), 'utf-8');
const homePageScript = readFileSync(resolve('src/scripts/home-page.ts'), 'utf-8');

describe('i18n ui dictionary contract', () => {
	it('exports languages, defaultLang, and ui from src/i18n/ui.ts', () => {
		expect(uiSource).toContain('export const languages');
		expect(uiSource).toContain('export const defaultLang');
		expect(uiSource).toContain('export const ui');
		expect(uiSource).toContain("'en'");
		expect(uiSource).toContain("'pt-br'");
		expect(uiSource).toContain('es');
	});

	it('includes keys needed to translate visible home page text', () => {
		expect(uiSource).toContain('nav.home');
		expect(uiSource).toContain('hero.eyebrow');
		expect(uiSource).toContain('hero.support');
		expect(uiSource).toContain('section.contact');
		expect(uiSource).toContain('lang.option.pt-br');
		expect(uiSource).toContain('contact.mailto.subject');
		expect(uiSource).toContain('contact.mailto.body');
	});
});

describe('i18n utils contract', () => {
	it('exports resolveLang and useTranslations from src/i18n/utils.ts', () => {
		expect(utilsSource).toContain('export function resolveLang');
		expect(utilsSource).toContain('export function useTranslations');
	});

	it('exports a helper to build localized contact mailto href', () => {
		expect(utilsSource).toContain('export function getContactMailtoHref');
		expect(utilsSource).toContain('encodeURIComponent');
	});
});

describe('i18n bootstrap contract', () => {
	it('includes a pre-paint locale bootstrap script that checks localStorage and navigator.language', () => {
		expect(homePage).toContain("localStorage.getItem('locale-preference')");
		expect(homePage).toContain('navigator.language');
		expect(homePage).toContain('document.documentElement.lang');
	});
});

describe('language picker runtime contract', () => {
	it('renders translation hooks in markup for text and aria labels', () => {
		expect(homePage).toContain('data-i18n="nav.home"');
		expect(homePage).toContain('data-i18n="hero.eyebrow"');
		expect(homePage).toContain('data-i18n-aria-label="theme.label"');
	});

	it('renders a contact email link hook with a non-JS mailto fallback', () => {
		expect(homePage).toContain("import ContactEmailCta from '../components/contact-email-cta.astro'");
		expect(homePage).toContain('<ContactEmailCta />');
		expect(contactEmailCta).toContain('id="contact"');
		expect(contactEmailCta).toContain('data-i18n="section.contact"');
		expect(contactEmailCta).toContain('data-contact-email-link');
		expect(contactEmailCta).toContain('contactFallbackMailtoHref');
		expect(contactEmailCta).toContain('mailto:');
		expect(contactEmailCta).toContain('getContactMailtoHref(locale)');
	});

	it('applies in-page translations without navigating to another route', () => {
		expect(homePage).toContain("import { initHomePage } from '../scripts/home-page'");
		expect(homePage).toContain('initHomePage()');
		expect(homePageScript).toContain('const applyTranslations = (locale: string');
		expect(homePageScript).toContain('applyTranslations(selectedLocale');
		expect(homePageScript).not.toContain('window.location.href =');
	});

	it('closes nav panel before opening language panel', () => {
		expect(homePageScript).toContain('const closeNavPanel = () =>');
		expect(homePageScript).toContain('if (!isOpen) {');
		expect(homePageScript).toContain('closeNavPanel();');
	});

	it('maps sections to nav targets for scroll-synced highlighting', () => {
		expect(homePageScript).toContain('const sectionNavMap = new Map([');
		expect(homePageScript).toContain("['hero', '/']");
		expect(homePageScript).toContain("['who-i-am', '/#who-i-am']");
		expect(homePageScript).toContain("['projects', '/#projects']");
		expect(homePageScript).toContain("['blog', '/#blog']");
		expect(homePageScript).toContain("['contact', '/#contact']");
		expect(homePageScript).toContain('const setActiveNavLink = (targetHref: string) =>');
	});

	it('updates contact mailto href when locale is initialized and changed', () => {
		expect(homePageScript).toContain('updateContactMailtoHref(initialLocale');
		expect(homePageScript).toContain('updateContactMailtoHref(selectedLocale');
	});

	it('lang picker is positioned before the theme toggle in markup', () => {
		const langPickerIndex = homePage.indexOf('lang-picker');
		const themeToggleIndex = homePage.indexOf('theme-toggle');
		expect(langPickerIndex).toBeGreaterThan(-1);
		expect(themeToggleIndex).toBeGreaterThan(-1);
		expect(langPickerIndex).toBeLessThan(themeToggleIndex);
	});
});
