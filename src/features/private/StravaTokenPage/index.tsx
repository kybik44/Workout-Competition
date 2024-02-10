import { useEffect, useState } from 'react';
import { sendStravaAuthCode } from '../../../entities/modules/auth/api';
import { TOKEN_KEY } from '../../../shared/lib/constants/global';
import storage from '../../../shared/lib/utils/storage';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import css from './index.module.css';

type Props = {
	code: string;
};

const StravaTokenPage = ({ code }) => {
	const [loading, setLoading] = useState(true);
	const [sendingError, setSendingError] = useState(undefined);

	useEffect(() => {
		const sendCode = async () => {
			try {
				const token = storage.get(TOKEN_KEY);
				await sendStravaAuthCode(token, code);
			} catch (error) {
				setSendingError('Ошибка подключения STRAVA. Попробуйте позже');
			} finally {
				setLoading(false);
			}
		};

		sendCode();
	}, []);

	return (
		<PrivateTemplateGeneric title="Подтвержение">
			<section className={css['wrapper']}>
				{loading ? <p>Strava verification...</p> : null}
				{sendingError ? <p>{sendingError}</p> : null}
				{!loading && !sendingError ? (
					<p>
						STRAVA успешно подтверждена. Вернитесь на страницу
						профиля и обновите страницу
					</p>
				) : null}
			</section>
		</PrivateTemplateGeneric>
	);
};

StravaTokenPage.getInitialProps = ({ query }) => {
	return { code: query.code };
};

export default StravaTokenPage;
