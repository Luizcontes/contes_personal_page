export function initFooterRuntime() {
	const footer = document.querySelector('[data-sticky]') as HTMLElement;
	if (!footer) {
		window.requestAnimationFrame(initFooterRuntime);
		return;
	}
	if (footer.dataset.runtimeInitialized === 'true') return;
	footer.dataset.runtimeInitialized = 'true';

	const triggerCta = document.querySelector('.hero-cta-primary') as HTMLElement | null;
	const header = document.querySelector('.site-header') as HTMLElement | null;
	let isSticky = footer.dataset.sticky === 'true';
	let isExpanded = footer.dataset.expanded === 'true';
	let frameRequest: number | null = null;

	const syncFooterState = () => {
		frameRequest = null;
		const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
		const ctaBottom = triggerCta?.getBoundingClientRect().bottom ?? 0;
		const shouldStick = triggerCta ? ctaBottom <= headerBottom : true;
		const documentHeight = document.documentElement.scrollHeight;
		const viewportBottom = window.scrollY + window.innerHeight;
		const distanceFromBottom = Math.max(0, documentHeight - viewportBottom);
		const collapseThreshold = footer.offsetHeight + 64;
		const shouldExpand = isExpanded
			? distanceFromBottom <= collapseThreshold
			: distanceFromBottom <= 32;

		if (shouldStick !== isSticky) {
			isSticky = shouldStick;
			footer.setAttribute('data-sticky', String(isSticky));
		}

		if (shouldExpand !== isExpanded) {
			isExpanded = shouldExpand;
			footer.setAttribute('data-expanded', String(isExpanded));
		}
	};

	const requestSync = () => {
		if (frameRequest !== null) return;
		frameRequest = window.requestAnimationFrame(syncFooterState);
	};

	syncFooterState();
	window.addEventListener('scroll', requestSync, { passive: true });
	window.addEventListener('resize', requestSync);
}
