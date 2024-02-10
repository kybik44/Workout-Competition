export { default } from '../../features/private/ProfilePage';
import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import {
	getProfileResults,
	getProfileScore,
} from '../../entities/modules/auth/api';
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
	getProfileActivities,
	getProfileChallenges,
} from '../../shared/api/profile';
import { getProfileWorkouts } from '../../shared/api/workouts';
import { TOKEN_KEY } from '../../shared/lib/constants/global';

const getResults = async (token: string) => {
	try {
		const { data } = await getProfileResults(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getScore = async (token: string) => {
	try {
		const { data } = await getProfileScore(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getChallenges = async (token: string) => {
	try {
		const { data } = await getProfileChallenges(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getWorkouts = async (token: string) => {
	try {
		const { data } = await getProfileWorkouts(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getActivities = async (token: string, filter?: string) => {
	try {
		const { data } = await getProfileActivities(token, filter);
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
		results: ProfileResult[];
		score: ProfileScoreData;
		challenges: ChallengeData[];
		workouts: WorkoutData[];
		activities: ActivitiesResponse;
	}>
> => {
	const parsedCookies = headers.cookie ? cookie.parse(headers.cookie) : null;
	if (headers.cookie && parsedCookies && parsedCookies[TOKEN_KEY]) {
		const token = parsedCookies[TOKEN_KEY];
		const results = await getResults(token);
		const score = await getScore(token);
		const challenges = await getChallenges(token);
		const workouts = await getWorkouts(token);
		const activities = await getActivities(token, '?offset=0&limit=10');
		return {
			props: {
				score: score,
				results: results,
				challenges: challenges,
				workouts: workouts,
				activities: activities,
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
