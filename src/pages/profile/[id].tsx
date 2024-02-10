export { default } from '../../features/private/PublicProfilePage';
import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import {
	ProfileResult,
	ProfileScoreData,
} from '../../entities/modules/auth/types';

import {
	ActivitiesResponse,
	ChallengeData,
	WorkoutData,
} from '../../entities/types';
import {
	getProfileActivitiesById,
	getProfileChallengesById,
	getProfileResultsById,
	getProfileScoreById,
	getProfileWorkoutsById,
} from '../../shared/api/profile';
import { TOKEN_KEY } from '../../shared/lib/constants/global';

const getResults = async (token: string, id: string) => {
	try {
		const { data } = await getProfileResultsById(token, id);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getScore = async (token: string, id: string) => {
	try {
		const { data } = await getProfileScoreById(token, id);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getChallenges = async (token: string, id: string) => {
	try {
		const { data } = await getProfileChallengesById(token, id);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getWorkouts = async (token: string, id: string) => {
	try {
		const { data } = await getProfileWorkoutsById(token, id);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getActivities = async (token: string, id: string, filter?: string) => {
	try {
		const { data } = await getProfileActivitiesById(token, id, filter);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

export const getServerSideProps: GetServerSideProps = async ({
	req: { headers },
	params: { id },
}): Promise<
	GetServerSidePropsResult<{
		results: ProfileResult[];
		score: ProfileScoreData;
		challenges: ChallengeData[];
		workouts: WorkoutData[];
		activities: ActivitiesResponse;
		profile: string;
	}>
> => {
	const parsedCookies = headers.cookie ? cookie.parse(headers.cookie) : null;
	if (headers.cookie && parsedCookies && parsedCookies[TOKEN_KEY]) {
		const token = parsedCookies[TOKEN_KEY];
		const results = await getResults(token, id?.toString());
		const score = await getScore(token, id?.toString());
		const challenges = await getChallenges(token, id?.toString());
		const workouts = await getWorkouts(token, id?.toString());
		const activities = await getActivities(
			token,
			id?.toString(),
			'?offset=0&limit=10'
		);

		return {
			props: {
				score: score,
				results: results,
				challenges: challenges,
				workouts: workouts,
				activities: activities,
				profile: id?.toString(),
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
