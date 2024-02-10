import { AxiosResponse } from 'axios';
import Axios from '../../../app/axios';
import { WorkoutData } from '../../../entities/types';

export const getAllTeams = () => Axios.get(`/score/teams/`);

export const GetWorkouts = (
	token: string
): Promise<AxiosResponse<WorkoutData[]>> =>
	Axios.get('/score/workouts/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
