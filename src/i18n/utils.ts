import { ui, defaultLang } from './ui';

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
