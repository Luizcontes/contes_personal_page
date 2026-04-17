import { ui, defaultLang } from '../i18n/ui';

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

const normalizePath = (pathname: string): string => {
	const trimmedPath = pathname.replace(/\/+$/, '');
	return trimmedPath === '' ? '/' : trimmedPath;
};

export function initHomePage(): void {
	const siteHeader = document.querySelector('.site-header');
	const navToggle = document.querySelector('.nav-toggle');
	const primaryNav = document.querySelector('#primary-nav');
	const themeToggle = document.querySelector('.theme-toggle');
	const langPicker = document.querySelector('.lang-picker');
	const langOptions = document.querySelectorAll('.lang-picker-list [role="option"]');

	const navLinks =
		primaryNav instanceof HTMLElement
			? Array.from(primaryNav.querySelectorAll('a[href]')).filter(
					(link) => link instanceof HTMLAnchorElement
				)
			: [];

	const syncActiveNavLink = () => {
		if (!navLinks.length) {
			return;
		}

		const currentPath = normalizePath(window.location.pathname);
		const currentHash = window.location.hash;

		let activeLink: HTMLAnchorElement | null = null;

		if (currentPath === '/' && currentHash) {
			activeLink =
				navLinks.find((link) => {
					const parsedLink = new URL(link.href, window.location.origin);
					return normalizePath(parsedLink.pathname) === '/' && parsedLink.hash === currentHash;
				}) ?? null;
		}

		if (!activeLink) {
			activeLink =
				navLinks.find((link) => {
					const parsedLink = new URL(link.href, window.location.origin);
					return normalizePath(parsedLink.pathname) === currentPath && parsedLink.hash === '';
				}) ?? null;
		}

		navLinks.forEach((link) => {
			link.removeAttribute('aria-current');
		});

		if (activeLink) {
			const currentType = activeLink.hash ? 'location' : 'page';
			activeLink.setAttribute('aria-current', currentType);
		}
	};

	syncActiveNavLink();
	window.addEventListener('hashchange', syncActiveNavLink);

	if (themeToggle instanceof HTMLButtonElement) {
		const initialTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
		themeToggle.setAttribute('aria-pressed', String(initialTheme === 'dark'));

		themeToggle.addEventListener('click', () => {
			const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
			const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
			document.documentElement.dataset.theme = nextTheme;
			localStorage.setItem('theme-preference', nextTheme);
			themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
			themeToggle.blur();
		});
	}

	const initialLocale = getResolvedLocale(document.documentElement.lang || fallbackLocale);
	applyTranslations(initialLocale, langPicker, langOptions);
	document.documentElement.dataset.i18nReady = 'true';

	if (langPicker instanceof HTMLButtonElement) {
		langPicker.addEventListener('click', () => {
			const isOpen = langPicker.getAttribute('aria-expanded') === 'true';
			langPicker.setAttribute('aria-expanded', String(!isOpen));
		});

		langOptions.forEach((option) => {
			if (option instanceof HTMLElement) {
				option.addEventListener('click', (event) => {
					event.stopPropagation();
					const selectedLocale = option.dataset.lang ?? 'en';
					localStorage.setItem('locale-preference', selectedLocale);
					applyTranslations(selectedLocale, langPicker, langOptions);
					langPicker.setAttribute('aria-expanded', 'false');
					langPicker.blur();
				});
			}
		});

		document.addEventListener('click', (event) => {
			const targetNode = event.target;
			if (targetNode instanceof Node && !langPicker.contains(targetNode)) {
				langPicker.setAttribute('aria-expanded', 'false');
			}
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				langPicker.setAttribute('aria-expanded', 'false');
				langPicker.blur();
			}
		});
	}

	if (
		siteHeader instanceof HTMLElement &&
		navToggle instanceof HTMLButtonElement &&
		primaryNav instanceof HTMLElement
	) {
		navToggle.addEventListener('click', () => {
			const isOpen = siteHeader.dataset.navOpen === 'true';
			const nextOpen = !isOpen;
			siteHeader.dataset.navOpen = String(nextOpen);
			navToggle.setAttribute('aria-expanded', String(nextOpen));
			navToggle.blur();
		});

		primaryNav.addEventListener('click', (event) => {
			const target = event.target;
			if (target instanceof HTMLAnchorElement) {
				const parsedLink = new URL(target.href, window.location.origin);
				const isHomeLink = normalizePath(parsedLink.pathname) === '/' && parsedLink.hash === '';
				const isOnHomePage = normalizePath(window.location.pathname) === '/';
				const isAnchorLink =
					normalizePath(parsedLink.pathname) === normalizePath(window.location.pathname) &&
					parsedLink.hash;

				if (isHomeLink && isOnHomePage) {
					event.preventDefault();
					history.replaceState(null, '', '/');
					window.scrollTo({ top: 0, behavior: 'smooth' });
					syncActiveNavLink();
				} else if (isAnchorLink) {
					event.preventDefault();
					const targetElement = document.querySelector(parsedLink.hash);
					if (targetElement) {
						history.replaceState(null, '', parsedLink.hash);
						targetElement.scrollIntoView({ behavior: 'smooth' });
						syncActiveNavLink();
					}
				}

				siteHeader.dataset.navOpen = 'false';
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				siteHeader.dataset.navOpen = 'false';
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}
}
