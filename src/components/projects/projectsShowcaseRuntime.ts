import { ui, defaultLang } from '../../i18n/ui';

type ProjectCard = HTMLButtonElement & {
	dataset: DOMStringMap & {
		projectSlug?: string;
		projectTitleKey?: string;
		projectSummaryKey?: string;
		projectPreview?: string;
		projectLiveUrl?: string;
		projectRepoUrl?: string;
	};
};

const dictionary = ui as Record<string, Record<string, string>>;

const translate = (key: string): string => {
	const locale = document.documentElement.lang || defaultLang;
	return dictionary[locale]?.[key] ?? dictionary[defaultLang]?.[key] ?? key;
};

export function initProjectsShowcase(): void {
	const showcase = document.querySelector('[data-projects-showcase]');
	if (!(showcase instanceof HTMLElement) || showcase.dataset.runtimeInitialized === 'true') {
		return;
	}
	showcase.dataset.runtimeInitialized = 'true';

	const cards = Array.from(showcase.querySelectorAll('[data-project-card]')).filter(
		(card): card is ProjectCard => card instanceof HTMLButtonElement
	);
	const grid = showcase.querySelector('[data-projects-card-grid]');
	const title = showcase.querySelector('[data-featured-title]');
	const summary = showcase.querySelector('[data-featured-summary]');
	const preview = showcase.querySelector('[data-featured-preview]');
	const cta = showcase.querySelector('[data-featured-cta]');
	const previousButton = showcase.querySelector('[data-projects-previous]');
	const nextButton = showcase.querySelector('[data-projects-next]');
	let hasCarouselInteraction = false;
	let selectionLock = false;
	let selectionLockTimer: number | null = null;

	if (
		!grid ||
		!(title instanceof HTMLElement) ||
		!(summary instanceof HTMLElement) ||
		!(preview instanceof HTMLImageElement) ||
		!(cta instanceof HTMLAnchorElement)
	) {
		return;
	}

	const selectProject = (card: ProjectCard): void => {
		selectionLock = true;
		if (selectionLockTimer !== null) {
			window.clearTimeout(selectionLockTimer);
		}
		selectionLockTimer = window.setTimeout(() => {
			selectionLock = false;
			selectionLockTimer = null;
		}, 800);

		cards.forEach((item) => {
			item.dataset.projectFeatured = String(item === card);
		});
		showcase.dataset.featuredProject = card.dataset.projectSlug;
		title.dataset.i18n = card.dataset.projectTitleKey ?? '';
		title.textContent = translate(card.dataset.projectTitleKey ?? '');
		summary.dataset.i18n = card.dataset.projectSummaryKey ?? '';
		summary.textContent = translate(card.dataset.projectSummaryKey ?? '');
		preview.src = card.dataset.projectPreview ?? '';
		preview.alt = translate(card.dataset.projectTitleKey ?? '');
		preview.dataset.featuredPreviewAlt = card.dataset.projectTitleKey ?? '';
		preview.dataset.i18nAlt = card.dataset.projectTitleKey ?? '';

		const destination = card.dataset.projectLiveUrl || card.dataset.projectRepoUrl;
		cta.href = destination || '#';
		cta.classList.toggle('projects-cta--disabled', !destination);
		cta.setAttribute('aria-disabled', String(!destination));
		cta.tabIndex = destination ? 0 : -1;
		cta.dataset.i18n = destination ? 'projects.cta.visit' : 'projects.cta.unavailable';
		const label = cta.querySelector('[data-project-cta-label]');
		if (label instanceof HTMLElement) {
			label.textContent = destination
				? translate('projects.cta.visit')
				: translate('projects.cta.unavailable');
		}
	};

	cards.forEach((card) => {
		card.addEventListener('click', () => selectProject(card));
	});

	const moveCarousel = (direction: number): void => {
		const currentIndex = cards.findIndex(
			(card) => card.dataset.projectFeatured === 'true'
		);
		if (currentIndex < 0) return;

		const nextIndex = (currentIndex + direction + cards.length) % cards.length;
		hasCarouselInteraction = true;
		const card = cards[nextIndex];
		card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
		if (card) selectProject(card);
	};

	previousButton?.addEventListener('click', () => moveCarousel(-1));
	nextButton?.addEventListener('click', () => moveCarousel(1));

	const observer = new IntersectionObserver(
		(entries) => {
			if (!hasCarouselInteraction || selectionLock) return;
			const mostVisible = entries
				.filter((entry) => entry.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (mostVisible?.target instanceof HTMLButtonElement) {
				selectProject(mostVisible.target as ProjectCard);
			}
		},
		{ root: grid, threshold: 0.75 }
	);
	cards.forEach((card) => observer.observe(card));
}
