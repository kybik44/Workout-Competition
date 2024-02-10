import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { WorkoutData } from '../../entities/types';
import { GetWorkouts } from '../../shared/api/content';
import { TOKEN_KEY } from '../../shared/lib/constants/global';

export { default } from '../../features/private/WorkoutsPage';

export const getServerSideProps: GetServerSideProps = async ({
	req,
}): Promise<
	GetServerSidePropsResult<{
		workouts: WorkoutData[];
	}>
> => {
	const parsedCookies = req.headers.cookie
		? cookie.parse(req.headers.cookie)
		: null;

	const access =
		parsedCookies && parsedCookies[TOKEN_KEY]
			? parsedCookies[TOKEN_KEY]
			: null;

	try {
		const { data } = await GetWorkouts(access);
		return {
			props: {
				workouts: data,
			},
		};
	} catch (e) {
		console.log(JSON.parse(JSON.stringify(e)));

		return {
			props: {
				workouts: null,
			},
		};
	}
};
