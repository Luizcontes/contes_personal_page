import { CONTACT_EMAIL } from '../../constants/app';
import { defaultLang } from '../../i18n/ui';
import { getContactMailtoHref } from '../../i18n/utils';

export interface SendEmailButtonState {
	className: string;
	contactFallbackMailtoHref: string;
	contactMailtoHref: string;
}

export function getSendEmailButtonState(
	locale: string | undefined,
	className: string | undefined
): SendEmailButtonState {
	const resolvedLocale = locale ?? defaultLang;
	const resolvedClassName = className ?? 'send-email-button';

	return {
		className: resolvedClassName,
		contactFallbackMailtoHref: `mailto:${CONTACT_EMAIL}`,
		contactMailtoHref: getContactMailtoHref(resolvedLocale),
	};
}
