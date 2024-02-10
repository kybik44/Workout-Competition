import { isCookieConsentGiven, setCookieConsent } from '..';
import React, { FC, useCallback, useState } from 'react';
import css from './index.module.css';

declare global {
	interface Window {
		dataLayer: any[];
	}
}

const CookiePopUp: FC = () => {
	const [isCookiePopUpOpened, setIsCookiePopUpOpened] = useState(
		typeof window === 'object' && !isCookieConsentGiven()
	);

	const handleAcceptCookies = useCallback(() => {
		setIsCookiePopUpOpened(false);
		setCookieConsent();
	}, []);

	return isCookiePopUpOpened ? (
		<div className={css['wrapper']}>
			<p className={css['text']}>
				Мы используем файлы cookie, чтобы улучшить сайт для вас{' '}
			</p>
			<button
				data-testid="cookie-popup-ok-button"
				onClick={handleAcceptCookies}
				type="button"
				className={css['accept-button']}
			>
				Принять
			</button>
		</div>
	) : null;
};

export default CookiePopUp;
