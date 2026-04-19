import { ui, defaultLang } from '../i18n/ui';
import { getContactMailtoHref } from '../i18n/utils';
import { initHeaderRuntime } from '../layouts/header/headerRuntime';

const dictionary = ui as Record<string, Record<string, string>>;
const fallbackLocale = defaultLang;

const isSupportedLocale = (value: string): boolean => {
	return Object.prototype.hasOwnProperty.call(dictionary, value);
};

const getResolvedLocale = (value: string | null | undefined): string => {
	if (value && isSupportedLocale(value)) {
		return value;
	}
	return fallbackLocale;
};

const t = (locale: string, key: string): string => {
	return dictionary[locale]?.[key] ?? dictionary[fallbackLocale]?.[key] ?? key;
};

const applyTranslations = (locale: string, langPicker: Element | null, langOptions: NodeListOf<Element>): void => {
	const resolvedLocale = getResolvedLocale(locale);
	document.documentElement.lang = resolvedLocale;

	document.querySelectorAll('[data-i18n]').forEach((element) => {
		if (!(element instanceof HTMLElement)) {
			return;
		}
		const key = element.dataset.i18n;
		if (!key) {
			return;
		}
		element.textContent = t(resolvedLocale, key);
	});

	document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
		if (!(element instanceof HTMLElement)) {
			return;
		}
		const key = element.dataset.i18nAriaLabel;
		if (!key) {
			return;
		}
		element.setAttribute('aria-label', t(resolvedLocale, key));
	});

	if (langPicker instanceof HTMLButtonElement) {
		langPicker.dataset.lang = resolvedLocale;
		langPicker.setAttribute(
			'aria-label',
			`${t(resolvedLocale, 'lang.pickerLabel')}. ${t(resolvedLocale, `lang.current.${resolvedLocale}`)}`
		);
	}

	langOptions.forEach((option) => {
		if (option instanceof HTMLElement) {
			option.setAttribute('aria-selected', String(option.dataset.lang === resolvedLocale));
		}
	});
};

export function initHomePage(): void {
	const contactEmailLinks = document.querySelectorAll('[data-contact-email-link]');

	const updateContactMailtoHref = (locale: string) => {
		contactEmailLinks.forEach((link) => {
			if (link instanceof HTMLAnchorElement) {
				link.href = getContactMailtoHref(locale);
			}
		});
	};

	initHeaderRuntime({
		applyTranslations,
		getResolvedLocale,
		fallbackLocale,
		updateContactMailtoHref,
	});
}
