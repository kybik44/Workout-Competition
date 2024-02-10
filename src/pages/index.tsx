import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { getMe } from '../entities/modules/auth';
import { TOKEN_KEY } from '../shared/lib/constants/global';

export { default } from '../features/public/StartPage';

export const getServerSideProps: GetServerSideProps = async ({
	req: { headers },
}): Promise<
	GetServerSidePropsResult<{
		isAuth: boolean;
	}>
> => {
	const parsedCookies = headers.cookie ? cookie.parse(headers.cookie) : null;
	if (headers.cookie && parsedCookies && parsedCookies[TOKEN_KEY]) {
		const token = parsedCookies[TOKEN_KEY];
		try {
			const { data } = await getMe(token);
			return {
				redirect: {
					destination: '/home',
					permanent: false,
				},
			};
		} catch (error) {
			return {
				props: {
					isAuth: false,
				},
			};
		}
	}
	return {
		props: {
			isAuth: false,
		},
	};
};
