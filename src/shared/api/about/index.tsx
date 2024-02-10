import Axios from '../../../app/axios';

export const getChallengesData = (token: string) =>
	Axios.get(`/score/challenges/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const subscribeChallenge = (id: number, token: string) =>
	Axios.post(
		`/score/profile/challenges/`,
		{
			challenge_id: id,
		},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
