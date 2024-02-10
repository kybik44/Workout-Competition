export { default } from '../features/private/StatisticsPage';
import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { LeadersPeriod } from '../entities/types';
import { getLeadersPeriods } from '../shared/api/statistics';
import { TOKEN_KEY } from '../shared/lib/constants/global';

const getPeriods = async (token: string) => {
	try {
		const { data } = await getLeadersPeriods(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

export const getServerSideProps: GetServerSideProps = async ({
	req: { headers },
}): Promise<
	GetServerSidePropsResult<{
		periods: LeadersPeriod[];
	}>
> => {
	const parsedCookies = headers.cookie ? cookie.parse(headers.cookie) : null;
	if (headers.cookie && parsedCookies && parsedCookies[TOKEN_KEY]) {
		const token = parsedCookies[TOKEN_KEY];
		const periods = await getPeriods(token);
		return {
			props: {
				periods: periods,
			},
		};
	}
	return {
		redirect: {
			destination: `/register`,
			permanent: false,
		},
	};
};
