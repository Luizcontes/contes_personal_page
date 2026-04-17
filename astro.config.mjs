// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://luizcontes.github.io',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'pt-br', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
