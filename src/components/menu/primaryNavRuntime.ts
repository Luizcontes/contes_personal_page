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

	const navLinks =
		primaryNav instanceof HTMLElement
			? Array.from(primaryNav.querySelectorAll('a[href]')).filter(
					(link) => link instanceof HTMLAnchorElement
				)
			: [];

	const sectionNavMap = new Map([
		['hero', '/'],
		['projects', '/#projects'],
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
		const sectionEntryState = new Map<HTMLElement, IntersectionObserverEntry>();

		const observer = new IntersectionObserver(
			(entries) => {
				// Update the latest known state for each section that fired
				for (const entry of entries) {
					if (entry.target instanceof HTMLElement) {
						sectionEntryState.set(entry.target, entry);
					}
				}

				// Pick the winner from ALL known states, not just the entries that fired this tick.
				// This prevents a stale-comparison bug where two adjacent sections cross their
				// thresholds at different scroll positions and the one that fires alone wins incorrectly.
				const visibleEntries = Array.from(sectionEntryState.values())
					.filter((entry) => entry.isIntersecting)
					.sort((left, right) => {
						if (right.intersectionRatio !== left.intersectionRatio) {
							return right.intersectionRatio - left.intersectionRatio;
						}
						return Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top);
					});

				const nextSection = visibleEntries[0]?.target;
				if (!(nextSection instanceof HTMLElement) || !nextSection.id) {
					return;
				}

				if (nextSection.id === activeSectionId) {
					return;
				}

				activeSectionId = nextSection.id;
				const targetHref = sectionNavMap.get(activeSectionId);
				if (targetHref) {
					setActiveNavLink(targetHref);
				}
			},
			{
				rootMargin: '-64px 0px -45% 0px',
				// 0.1 populates the state map early; 0.75 is unreachable for ~86svh sections
				// in a ~55vh observation zone so it is replaced with 0.1.
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
