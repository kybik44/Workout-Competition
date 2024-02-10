import {
	ProfileResult,
	TolstoyTokenData,
	SignInResponse,
	SignUpData,
	SignInData,
	ResetPasswordRequestData,
	ResetPasswordData,
	ProfileScoreData,
	StravaUser,
} from './../types';
import Axios from '../../../../app/axios';
import { AxiosResponse } from 'axios';

export const signUp = (data: SignUpData) => Axios.post('/auth/signup/', data);

export const signIn = (
	data: SignInData
): Promise<AxiosResponse<SignInResponse>> => Axios.post('/auth/token/', data);

export const getMe = (token: string): Promise<AxiosResponse<any>> =>
	Axios.get('/auth/me/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getTolstoyToken = (
	token: string
): Promise<AxiosResponse<TolstoyTokenData>> =>
	Axios.get(`/auth/tolstoyCommentsToken/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const resetPasswordRequest = (data: ResetPasswordRequestData) =>
	Axios.post(`/auth/reset-password-request/`, data);

export const resetPassword = (data: ResetPasswordData) =>
	Axios.post(`/auth/reset-password/`, data);

export const updateProfile = (data: FormData, user: string, token: string) =>
	Axios.patch(`/auth/users/${user}/`, data, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const sendEmailToken = (token: string) =>
	Axios.post(`/auth/acceptEmailToken/`, { token });

export const getProfileResults = (
	token: string
): Promise<AxiosResponse<ProfileResult[]>> =>
	Axios.get(`/score/profile/disciplines/board/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getProfileScore = (
	token: string
): Promise<AxiosResponse<ProfileScoreData>> =>
	Axios.get(`/score/profile/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const sendStravaAuthCode = (
	token: string,
	code: string
): Promise<AxiosResponse<any>> =>
	Axios.post(
		'auth/strava/authorization-code/',
		{ code: code },
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);

export const getStravaToken = (
	token: string
): Promise<AxiosResponse<StravaUser>> =>
	Axios.get(`/score/profile/strava-account/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const disconnectStrava = (token: string) =>
	Axios.post(
		`/auth/strava/disconnect/`,
		{},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);
