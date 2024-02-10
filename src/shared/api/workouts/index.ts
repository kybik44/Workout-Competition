import { AxiosResponse } from 'axios';
import Axios from '../../../app/axios';
import { WorkoutData } from '../../../entities/types';

export const postProfileWorkouts = (
	workout_id: number,
	token: string
): Promise<AxiosResponse<any>> =>
	Axios.post(
		'/score/profile/workouts/',
		{ workout_id },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);

export const getProfileWorkouts = (
	token: string
): Promise<AxiosResponse<WorkoutData[]>> =>
	Axios.get('/score/profile/workouts/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
