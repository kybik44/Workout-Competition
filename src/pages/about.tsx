import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import {
	AboutInfoContent,
	AboutScoreContent,
	ActivityAboutData,
	ChallengeData,
	ResultRulesContent,
} from '../entities/types';
import { getChallengesData } from '../shared/api/about';
import {
	getAboutPageInfo,
	getAboutScoresContent,
	getResultRules,
} from '../shared/api/cms/gql';
import { TOKEN_KEY } from '../shared/lib/constants/global';

export { default } from '../features/private/AboutPage';

const getChallenges = async (token: string) => {
	try {
		const { data } = await getChallengesData(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getRules = async () => {
	try {
		const data = await getResultRules();
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getAboutInfo = async () => {
	try {
		const data = await getAboutPageInfo();
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getScoresContent = async () => {
	try {
		const data = await getAboutScoresContent();
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
		activities: ActivityAboutData[];
		rules: ResultRulesContent;
		info: AboutInfoContent;
		scoresInfo: AboutScoreContent;
		challenges: ChallengeData[];
	}>
> => {
	const parsedCookies = headers.cookie ? cookie.parse(headers.cookie) : null;
	if (headers.cookie && parsedCookies && parsedCookies[TOKEN_KEY]) {
		const token = parsedCookies[TOKEN_KEY];
		const { rules } = await getRules();
		const { info } = await getAboutInfo();
		const { scoresInfo } = await getScoresContent();
		const challenges = await getChallenges(token);

		return {
			props: {
				activities: rules.activities,
				rules: rules,
				info: info,
				scoresInfo: scoresInfo,
				challenges: challenges,
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
