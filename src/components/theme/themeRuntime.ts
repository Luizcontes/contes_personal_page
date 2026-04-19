export function initThemeRuntime(): void {
	const themeToggle = document.querySelector('.theme-toggle');

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
}
