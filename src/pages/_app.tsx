// global styles here
import '../app/styles/base/global.css';
import '../app/styles/abstract/variable.css';
import '../app/styles/abstract/typography.css';
import '../../public/fonts/fonts.css';

import { StoreContextWrap } from '../entities/store/store';
import { AuthWrap } from '../entities/modules/auth';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			typeof document !== 'undefined' &&
			document.documentElement
		) {
			const root = document.documentElement;

			root.setAttribute('translate', `no`);
		}
	}, []);

	return (
		<>
			<StoreContextWrap>
				<AuthWrap>
					<Component {...pageProps} />
				</AuthWrap>
			</StoreContextWrap>
		</>
	);
}

export default MyApp;
