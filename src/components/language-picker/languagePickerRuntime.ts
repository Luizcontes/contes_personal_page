interface LanguagePickerRuntimeOptions {
	applyTranslations: (locale: string, langPicker: Element | null, langOptions: NodeListOf<Element>) => void;
	updateContactMailtoHref: (locale: string) => void;
	closeNavPanel: () => void;
}

export function initLanguagePickerRuntime({
	applyTranslations,
	updateContactMailtoHref,
	closeNavPanel,
}: LanguagePickerRuntimeOptions): { closeLangPanel: () => void } {
	const langPicker = document.querySelector('.lang-picker');
	const langOptions = document.querySelectorAll('.lang-picker-list [role="option"]');

	const closeLangPanel = () => {
		if (langPicker instanceof HTMLButtonElement) {
			langPicker.setAttribute('aria-expanded', 'false');
		}
	};

	if (langPicker instanceof HTMLButtonElement) {
		langPicker.addEventListener('click', () => {
			const isOpen = langPicker.getAttribute('aria-expanded') === 'true';
			if (!isOpen) {
				closeNavPanel();
			}
			langPicker.setAttribute('aria-expanded', String(!isOpen));
		});

		langOptions.forEach((option) => {
			if (option instanceof HTMLElement) {
				option.addEventListener('click', (event) => {
					event.stopPropagation();
					const selectedLocale = option.dataset.lang ?? 'en';
					localStorage.setItem('locale-preference', selectedLocale);
					applyTranslations(selectedLocale, langPicker, langOptions);
					updateContactMailtoHref(selectedLocale);
					closeLangPanel();
					langPicker.blur();
				});
			}
		});

		document.addEventListener('click', (event) => {
			const targetNode = event.target;
			if (targetNode instanceof Node && !langPicker.contains(targetNode)) {
				closeLangPanel();
			}
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				closeLangPanel();
				closeNavPanel();
				langPicker.blur();
			}
		});
	}

	return { closeLangPanel };
}
