export const languages = {
	en: 'EN',
	'pt-br': 'PT',
	es: 'ES',
} as const;

export const defaultLang = 'en' as const;

export const ui = {
	en: {
		'nav.home': 'Home',
		'nav.whoIAm': 'Who I Am',
		'nav.projects': 'Projects',
		'nav.blog': 'Blog',
		'nav.contact': 'Contact',
		'lang.label': 'Language',
		'theme.label': 'Toggle color theme',
	},
	'pt-br': {
		'nav.home': 'Início',
		'nav.whoIAm': 'Quem Sou',
		'nav.projects': 'Projetos',
		'nav.blog': 'Blog',
		'nav.contact': 'Contato',
		'lang.label': 'Idioma',
		'theme.label': 'Alternar tema de cor',
	},
	es: {
		'nav.home': 'Inicio',
		'nav.whoIAm': 'Quién Soy',
		'nav.projects': 'Proyectos',
		'nav.blog': 'Blog',
		'nav.contact': 'Contacto',
		'lang.label': 'Idioma',
		'theme.label': 'Cambiar tema de color',
	},
} as const;
