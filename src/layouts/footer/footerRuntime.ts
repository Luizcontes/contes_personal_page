export function initFooterRuntime() {
	const footer = document.querySelector('[data-sticky]') as HTMLElement;
	const secondSection = document.querySelector('#who-i-am') as HTMLElement;

	if (!footer || !secondSection) return;

	const syncStickyState = () => {
		// Match the same visual trigger line implied by nav observer rootMargin bottom (-45%).
		const triggerLine = window.innerHeight * 0.2;
		const sectionTop = secondSection.getBoundingClientRect().top;
		const shouldBeSticky = sectionTop <= triggerLine;
		footer.setAttribute('data-sticky', shouldBeSticky ? 'true' : 'false');
	};

	// Keep footer state in sync in both directions at the exact same trigger boundary.
	syncStickyState();
	window.addEventListener('scroll', syncStickyState, { passive: true });
	window.addEventListener('resize', syncStickyState);
}
