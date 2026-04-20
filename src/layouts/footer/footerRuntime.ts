export function initFooterRuntime() {
	const footer = document.querySelector('[data-sticky]') as HTMLElement;
	if (!footer) return;

	const triggerSection = document.querySelector('#projects') as HTMLElement | null;

	// On pages without the trigger section (non-home pages), make footer always sticky.
	if (!triggerSection) {
		footer.setAttribute('data-sticky', 'true');
		return;
	}

	const syncStickyState = () => {
		// Match the same visual trigger line implied by nav observer rootMargin bottom (-45%).
		const triggerLine = window.innerHeight * 0.1;
		const sectionTop = triggerSection.getBoundingClientRect().top;
		const shouldBeSticky = sectionTop <= triggerLine;
		footer.setAttribute('data-sticky', shouldBeSticky ? 'true' : 'false');
	};

	// Keep footer state in sync in both directions at the exact same trigger boundary.
	syncStickyState();
	window.addEventListener('scroll', syncStickyState, { passive: true });
	window.addEventListener('resize', syncStickyState);
}
