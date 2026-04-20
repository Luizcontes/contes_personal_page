import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const homePage = readFileSync(resolve('src/pages/index.astro'), 'utf-8');
const baseLayout = readFileSync(resolve('src/layouts/BaseLayout.astro'), 'utf-8');
const headerSource = readFileSync(resolve('src/layouts/header/Header.astro'), 'utf-8');
const primaryNavSource = readFileSync(resolve('src/components/menu/PrimaryNav.astro'), 'utf-8');
const primaryNavRuntimeSource = readFileSync(resolve('src/components/menu/primaryNavRuntime.ts'), 'utf-8');
const languagePickerSource = readFileSync(resolve('src/components/language-picker/LanguagePicker.astro'), 'utf-8');
const languagePickerStylesSource = readFileSync(resolve('src/components/language-picker/language-picker.css'), 'utf-8');
const languagePickerRuntimeSource = readFileSync(resolve('src/components/language-picker/languagePickerRuntime.ts'), 'utf-8');
const themeToggleSource = readFileSync(resolve('src/components/theme/ThemeToggle.astro'), 'utf-8');
const footerSource = readFileSync(resolve('src/layouts/footer/Footer.astro'), 'utf-8');
const footerStylesSource = readFileSync(resolve('src/layouts/footer/footer.css'), 'utf-8');
const sendEmailButtonSource = readFileSync(resolve('src/components/send-email-button/SendEmailButton.astro'), 'utf-8');
const sendEmailButtonStylesSource = readFileSync(resolve('src/components/send-email-button/send-email-button.css'), 'utf-8');
const sendEmailButtonScriptSource = readFileSync(resolve('src/components/send-email-button/sendEmailButton.ts'), 'utf-8');
const uiSource = readFileSync(resolve('src/i18n/ui.ts'), 'utf-8');
const utilsSource = readFileSync(resolve('src/i18n/utils.ts'), 'utf-8');
const homePageScript = readFileSync(resolve('src/scripts/home-page.ts'), 'utf-8');
const headerRuntimeSource = readFileSync(resolve('src/layouts/header/headerRuntime.ts'), 'utf-8');

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
		expect(baseLayout).toContain("localStorage.getItem('locale-preference')");
		expect(baseLayout).toContain('navigator.language');
		expect(baseLayout).toContain('document.documentElement.lang');
	});
});

describe('language picker runtime contract', () => {
	it('renders translation hooks in markup for text and aria labels', () => {
		expect(homePage).toContain('import BaseLayout from "../layouts/BaseLayout.astro"');
		expect(baseLayout).toContain("import Header from './header/Header.astro'");
		expect(baseLayout).toContain('<Header />');
		expect(headerSource).toContain("import PrimaryNav from '../../components/menu/PrimaryNav.astro'");
		expect(headerSource).toContain("import LanguagePicker from '../../components/language-picker/LanguagePicker.astro'");
		expect(languagePickerSource).toContain("import './language-picker.css';");
		expect(languagePickerStylesSource).toContain('.lang-picker {');
		expect(languagePickerStylesSource).toContain('.lang-picker-list {');
		expect(languagePickerSource).toContain('data-i18n-aria-label="lang.pickerLabel"');
		expect(primaryNavSource).toContain('data-i18n="nav.home"');
		expect(homePage).toContain('data-i18n="hero.eyebrow"');
		expect(headerSource).toContain("import ThemeToggle from '../../components/theme/ThemeToggle.astro'");
		expect(headerSource).toContain('<ThemeToggle />');
		expect(themeToggleSource).toContain('data-i18n-aria-label="theme.label"');
	});

	it('renders a contact email link hook with a non-JS mailto fallback', () => {
		expect(homePage).toContain('import BaseLayout from "../layouts/BaseLayout.astro"');
		expect(baseLayout).toContain("import Footer from './footer/Footer.astro'");
		expect(baseLayout).toContain('<Footer />');
		expect(footerSource).toContain("import './footer.css';");
		expect(footerStylesSource).toContain('.site-footer {');
		expect(footerSource).toContain("import SendEmailButton from '../../components/send-email-button/SendEmailButton.astro'");
		expect(footerSource).toContain('<SendEmailButton locale={locale} />');
		expect(sendEmailButtonSource).toContain("import './send-email-button.css';");
		expect(sendEmailButtonSource).toContain("import { getSendEmailButtonState } from './sendEmailButton'");
		expect(sendEmailButtonStylesSource).toContain('.send-email-button {');
		expect(sendEmailButtonSource).toContain('data-contact-email-link');
		expect(sendEmailButtonSource).toContain('contactFallbackMailtoHref');
		expect(sendEmailButtonScriptSource).toContain('export function getSendEmailButtonState');
		expect(sendEmailButtonScriptSource).toContain("'send-email-button'");
		expect(sendEmailButtonScriptSource).toContain('mailto:');
		expect(sendEmailButtonScriptSource).toContain('getContactMailtoHref(resolvedLocale)');
	});

	it('applies in-page translations without navigating to another route', () => {
		expect(baseLayout).toContain("import { initHomePage } from '../scripts/home-page'");
		expect(baseLayout).toContain('initHomePage()');
		expect(homePageScript).toContain('const applyTranslations = (locale: string');
		expect(homePageScript).toContain('initHeaderRuntime({');
		expect(languagePickerRuntimeSource).toContain('applyTranslations(selectedLocale');
		expect(homePageScript).not.toContain('window.location.href =');
	});

	it('closes nav panel before opening language panel', () => {
		expect(languagePickerRuntimeSource).toContain('if (!isOpen) {');
		expect(languagePickerRuntimeSource).toContain('closeNavPanel();');
		expect(languagePickerSource).toContain('class="lang-picker"');
	});

	it('maps sections to nav targets for scroll-synced highlighting', () => {
		expect(primaryNavRuntimeSource).toContain('const sectionNavMap = new Map([');
		expect(primaryNavRuntimeSource).toContain("['hero', '/']");
		expect(primaryNavRuntimeSource).toContain("['projects', '/#projects']");
		expect(primaryNavRuntimeSource).toContain("['blog', '/#blog']");
		expect(primaryNavRuntimeSource).toContain("['contact', '/#contact']");
		expect(primaryNavRuntimeSource).toContain('const setActiveNavLink = (targetHref: string) =>');
	});

	it('updates contact mailto href when locale is initialized and changed', () => {
		expect(headerRuntimeSource).toContain('updateContactMailtoHref(initialLocale');
		expect(languagePickerRuntimeSource).toContain('updateContactMailtoHref(selectedLocale');
	});

	it('lang picker is positioned before the theme toggle in markup', () => {
		const languagePickerComponentIndex = headerSource.indexOf('<LanguagePicker />');
		const themeToggleComponentIndex = headerSource.indexOf('<ThemeToggle />');
		expect(languagePickerComponentIndex).toBeGreaterThan(-1);
		expect(themeToggleComponentIndex).toBeGreaterThan(-1);
		expect(languagePickerComponentIndex).toBeLessThan(themeToggleComponentIndex);
		expect(languagePickerSource).toContain('class="lang-picker"');
	});
});
