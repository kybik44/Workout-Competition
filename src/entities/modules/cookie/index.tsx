import Cookies from 'js-cookie';
import { COOKIE_CONSENT_KEY } from '../../../shared/lib/constants/global';

export const isCookieConsentGiven = () =>
	Cookies.get(COOKIE_CONSENT_KEY) != null;

export const setCookieConsent = () =>
	Cookies.set(COOKIE_CONSENT_KEY, '1', { expires: 99999 });
