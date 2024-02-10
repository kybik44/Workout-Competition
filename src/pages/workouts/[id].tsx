import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useCookie } from 'next-cookie';
import router from 'next/router';
import workouts from '.';
import { WorkoutData } from '../../entities/types';
import { GetWorkouts } from '../../shared/api/content';
import { TOKEN_KEY } from '../../shared/lib/constants/global';

export { default } from '../../features/private/WorkoutsSinglePage';

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}): Promise<
	GetServerSidePropsResult<{
		workout: void | WorkoutData[];
	}>
> => {
	const queryId = Number(query.id);

	const parsedCookies = req.headers.cookie
		? cookie.parse(req.headers.cookie)
		: null;

	const access =
		parsedCookies && parsedCookies[TOKEN_KEY]
			? parsedCookies[TOKEN_KEY]
			: null;

	try {
		const data = await GetWorkouts(access)
			.then((res) => res.data.filter((i) => i.id === queryId))
			.catch((err) => console.log(err));
		return {
			props: {
				workout: data,
			},
		};
	} catch (e) {
		console.log(JSON.parse(JSON.stringify(e)));

		return {
			props: {
				workout: null,
			},
		};
	}
};
