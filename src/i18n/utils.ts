import { ui, defaultLang } from './ui';
import { CONTACT_EMAIL } from '../constants/app';

export type Lang = keyof typeof ui;

export function resolveLang(value: string | null | undefined): Lang {
	if (value && value in ui) {
		return value as Lang;
	}
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
		return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
	};
}

export function getContactMailtoHref(locale: string): string {
	const resolvedLocale = resolveLang(locale);
	const subject =
		(ui[resolvedLocale] as Record<string, string>)['contact.mailto.subject'] ??
		ui[defaultLang]['contact.mailto.subject'];
	const body =
		(ui[resolvedLocale] as Record<string, string>)['contact.mailto.body'] ??
		ui[defaultLang]['contact.mailto.body'];

	return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
