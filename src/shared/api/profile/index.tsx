import { AxiosResponse } from 'axios';
import Axios from '../../../app/axios';
import {
	ProfileResult,
	ProfileScoreData,
} from '../../../entities/modules/auth/types';
import {
	ActivitiesResponse,
	ChallengeData,
	ResultImageData,
	WorkoutData,
} from '../../../entities/types';

export const getVideoUrls = (
	parts: number,
	extension: string,
	token: string
): Promise<AxiosResponse<{ key: string; upload_id: string; urls: any[] }>> =>
	Axios.post(
		'/files/upload-urls/',
		{
			number_of_parts: parts,
			file_extension: extension,
		},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);

export const sendParts = (
	key: string,
	upload_id: string,
	parts: any[],
	token: string
): Promise<
	AxiosResponse<{
		url: string;
	}>
> =>
	Axios.post(
		'/files/upload-complete/',
		{
			key: key,
			upload_id: upload_id,
			parts: parts,
		},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);

export const sendActivities = (data: FormData, token: string) =>
	Axios.post(`/score/profile/activities/`, data, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getProfileChallenges = (
	token: string
): Promise<AxiosResponse<ChallengeData[]>> =>
	Axios.get(`/score/profile/challenges/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const unsubscribeWorkout = (token: string, workout: number) =>
	Axios.delete(`/score/profile/workouts/`, {
		data: {
			workout_id: workout,
		},
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getProfileActivities = (
	token: string,
	filter?: string
): Promise<AxiosResponse<ActivitiesResponse>> =>
	Axios.get(`/score/profile/activities/${filter ? filter : ''}`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const removeProfileActivity = (token: string, id: number) =>
	Axios.delete(`/score/profile/activities/${id}/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getProfileActivitiesById = (
	token: string,
	id: string,
	filter?: string
): Promise<AxiosResponse<ActivitiesResponse>> =>
	Axios.get(
		`/score/external-profile/activities/${id}/${filter ? filter : ''}`,
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);

export const getProfileChallengesById = (
	token: string,
	id: string
): Promise<AxiosResponse<ChallengeData[]>> =>
	Axios.get(`/score/external-profile/challenges/${id}/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getProfileResultsById = (
	token: string,
	id: string
): Promise<AxiosResponse<ProfileResult[]>> =>
	Axios.get(`/score/external-profile/disciplines/board/${id}/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getProfileWorkoutsById = (
	token: string,
	id: string
): Promise<AxiosResponse<WorkoutData[]>> =>
	Axios.get(`/score/external-profile/workouts/${id}/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getProfileScoreById = (
	token: string,
	id: string
): Promise<AxiosResponse<ProfileScoreData>> =>
	Axios.get(`/score/external-profile/${id}/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const generateImage = (
	token: string
): Promise<AxiosResponse<ResultImageData>> =>
	Axios.post(
		'/score/statistics-image/',
		{},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
