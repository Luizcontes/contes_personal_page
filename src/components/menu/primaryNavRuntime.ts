interface PrimaryNavRuntimeOptions {
	closeNavPanel: () => void;
	closeLangPanel: () => void;
}

const normalizePath = (pathname: string): string => {
	const trimmedPath = pathname.replace(/\/+$/, '');
	return trimmedPath === '' ? '/' : trimmedPath;
};

export function initPrimaryNavRuntime({ closeNavPanel, closeLangPanel }: PrimaryNavRuntimeOptions): void {
	const siteHeader = document.querySelector('.site-header');
	const navToggle = document.querySelector('.nav-toggle');
	const primaryNav = document.querySelector('#primary-nav');
	const isTouchNavigation = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

	const navLinks =
		primaryNav instanceof HTMLElement
			? Array.from(primaryNav.querySelectorAll('a[href]')).filter(
					(link) => link instanceof HTMLAnchorElement
				)
			: [];

	const sectionNavMap = new Map([
		['hero', '/'],
		['projects', '/#projects'],
		['stack', '/#stack'],
		['experience', '/#experience'],
		['blog', '/#blog'],
		['contact', '/#contact'],
	]);

	const setActiveNavLink = (targetHref: string) => {
		if (!navLinks.length) {
			return;
		}

		const resolvedTarget = new URL(targetHref, window.location.origin);
		const targetPath = normalizePath(resolvedTarget.pathname);
		const targetHash = resolvedTarget.hash;

		const activeLink =
			navLinks.find((link) => {
				const parsedLink = new URL(link.href, window.location.origin);
				return (
					normalizePath(parsedLink.pathname) === targetPath && parsedLink.hash === targetHash
				);
			}) ?? null;

		navLinks.forEach((link) => {
			link.removeAttribute('aria-current');
		});

		if (activeLink) {
			const currentType = targetHash ? 'location' : 'page';
			activeLink.setAttribute('aria-current', currentType);
		}
	};

	const syncActiveNavLink = () => {
		if (!navLinks.length) {
			return;
		}

		const currentPath = normalizePath(window.location.pathname);
		const currentHash = window.location.hash;

		if (currentPath === '/' && currentHash) {
			setActiveNavLink(`/${currentHash}`);
			return;
		}

		// On non-root pages (e.g. /who-i-am), match the exact path.
		// Only fall back to '/' when actually on the home page.
		const exactMatch = navLinks.find((link) => {
			const parsed = new URL(link.href, window.location.origin);
			return normalizePath(parsed.pathname) === currentPath && !parsed.hash;
		});

		if (exactMatch) {
			setActiveNavLink(currentPath);
		} else if (currentPath === '/') {
			setActiveNavLink('/');
		} else {
			// On a page with no matching nav link — remove all highlights.
			navLinks.forEach((link) => link.removeAttribute('aria-current'));
		}
	};

	syncActiveNavLink();
	window.addEventListener('hashchange', syncActiveNavLink);

	if (navLinks.length && typeof IntersectionObserver !== 'undefined') {
		const trackedSections = Array.from(sectionNavMap.keys())
			.map((sectionId) => document.querySelector(`#${sectionId}`))
			.filter((section): section is HTMLElement => section instanceof HTMLElement);

		let activeSectionId = '';

		const syncActiveSection = () => {
			const readingLine = Math.max(64, window.innerHeight * 0.35);
			const sectionAtReadingLine =
				trackedSections
					.map((section) => ({ section, rect: section.getBoundingClientRect() }))
					.filter(({ rect }) => rect.top <= readingLine && rect.bottom > readingLine)
					.sort((left, right) => right.rect.top - left.rect.top)[0]?.section ??
				trackedSections
					.map((section) => ({ section, rect: section.getBoundingClientRect() }))
					.filter(({ rect }) => rect.bottom > 64)
					.sort((left, right) => Math.abs(left.rect.top - readingLine) - Math.abs(right.rect.top - readingLine))[0]
					?.section;

			if (!(sectionAtReadingLine instanceof HTMLElement) || !sectionAtReadingLine.id) {
				return;
			}

			if (sectionAtReadingLine.id === activeSectionId) {
				return;
			}

			activeSectionId = sectionAtReadingLine.id;
			const focusedLink = document.activeElement;
			if (
				focusedLink instanceof HTMLAnchorElement &&
				navLinks.includes(focusedLink)
			) {
				focusedLink.blur();
			}

			const targetHref = sectionNavMap.get(activeSectionId);
			if (targetHref) {
				setActiveNavLink(targetHref);
			}
		};

		const observer = new IntersectionObserver(
			() => syncActiveSection(),
			{
				rootMargin: '-64px 0px -45% 0px',
				threshold: [0.1, 0.25, 0.5],
			}
		);

		trackedSections.forEach((section) => {
			observer.observe(section);
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
			if (nextOpen) {
				closeLangPanel();
			}
			siteHeader.dataset.navOpen = String(nextOpen);
			navToggle.setAttribute('aria-expanded', String(nextOpen));
			navToggle.blur();
		});

		primaryNav.addEventListener('click', (event) => {
			const target = event.target;
			if (target instanceof HTMLAnchorElement) {
				closeNavPanel();
				if (isTouchNavigation) {
					target.blur();
				}
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
				} else {
					// Allow default navigation for non-anchor links
				}
			}
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				closeNavPanel();
				navToggle.blur();
			}
		});
	}
}
