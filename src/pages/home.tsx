import { AxiosRequestConfig } from 'axios';
import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { GetUserfiles } from '../entities/modules/contest/api';
import { UserFilesType } from '../entities/modules/contest/types';
import { NewsContent, WorkoutData } from '../entities/types';
import { getNewsPageData } from '../shared/api/cms/gql';
import { GetWorkouts } from '../shared/api/content';
import { TOKEN_KEY } from '../shared/lib/constants/global';

export { default } from '../features/private/HomePage';

const getWorkoutsContent = async (token) => {
	try {
		const data = await GetWorkouts(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getPhotoalbumContent = async (contest, token) => {
	try {
		const data = await GetUserfiles(contest, token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getNewsContent = async (limit, page) => {
	try {
		const data = await getNewsPageData(limit, page);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}): Promise<
	GetServerSidePropsResult<{
		workouts: WorkoutData[];
		photoalbumPhotos: UserFilesType;
		news: NewsContent[];
	}>
> => {
	const parsedCookies = req.headers.cookie
		? cookie.parse(req.headers.cookie)
		: null;

	const access =
		parsedCookies && parsedCookies[TOKEN_KEY]
			? parsedCookies[TOKEN_KEY]
			: null;

	const RequestConfigs: AxiosRequestConfig = {
		headers: { Authorization: `Token ${access}` },
	};

	try {
		const workouts = await getWorkoutsContent(access);
		const firstContest = await getPhotoalbumContent(1, RequestConfigs);
		const { news } = await getNewsContent(3, 1);
		return {
			props: {
				workouts: workouts.data,
				photoalbumPhotos: firstContest.data.results,
				news: news,
			},
		};
	} catch (e) {
		console.log(JSON.parse(JSON.stringify(e)));

		return {
			props: {
				workouts: null,
				photoalbumPhotos: null,
				news: null,
			},
		};
	}
};
