import { initPrimaryNavRuntime } from '../../components/menu/primaryNavRuntime';
import { initLanguagePickerRuntime } from '../../components/language-picker/languagePickerRuntime';
import { initThemeRuntime } from '../../components/theme/themeRuntime';

interface HeaderRuntimeOptions {
	applyTranslations: (locale: string, langPicker: Element | null, langOptions: NodeListOf<Element>) => void;
	getResolvedLocale: (value: string | null | undefined) => string;
	fallbackLocale: string;
	updateContactMailtoHref: (locale: string) => void;
}

export function initHeaderRuntime({
	applyTranslations,
	getResolvedLocale,
	fallbackLocale,
	updateContactMailtoHref,
}: HeaderRuntimeOptions): void {
	const siteHeader = document.querySelector('.site-header');
	const navToggle = document.querySelector('.nav-toggle');
	const langPicker = document.querySelector('.lang-picker');
	const langOptions = document.querySelectorAll('.lang-picker-list [role="option"]');

	const closeNavPanel = () => {
		if (siteHeader instanceof HTMLElement && navToggle instanceof HTMLButtonElement) {
			siteHeader.dataset.navOpen = 'false';
			navToggle.setAttribute('aria-expanded', 'false');
		}
	};

	// Initialize primary nav runtime
	initPrimaryNavRuntime({
		closeNavPanel,
		closeLangPanel: () => {},
	});

	// Initialize language picker runtime
	const { closeLangPanel } = initLanguagePickerRuntime({
		applyTranslations,
		updateContactMailtoHref,
		closeNavPanel,
	});

	// Initialize theme runtime
	initThemeRuntime();

	const initialLocale = getResolvedLocale(document.documentElement.lang || fallbackLocale);
	applyTranslations(initialLocale, langPicker, langOptions);
	updateContactMailtoHref(initialLocale);
	document.documentElement.dataset.i18nReady = 'true';
}
