import { Achievement, Team } from '../../../types';

export type UserType = {
	id: string;
	first_name: string;
	last_name: string;
	third_name: string;
	avatar: string;
	city: string;
	email: string;
	date_of_birth: string;
	gender: 'male' | 'female';
	member_of_previous_event: boolean;
	phone_number: string;
	username: string;
	team: string | null;
	shop_score: number;
};

export type ProfileResult = {
	discipline_name: string;
	total_value: number;
	total_score: number;
	unit: 'min' | 'km';
};

export type SignUpData = {
	first_name: string;
	last_name: string;
	third_name: string;
	password: string;
	gender: 'male' | 'female';
	date_of_birth: string;
	city: string;
	phone_number: string;
	email: string;
	member_of_previous_event: boolean;
	team_id: number;
};

export type SignInData = {
	username: string;
	password: string;
};

export type SignInResponse = {
	username: string;
	password: string;
	token: string;
};

export type TolstoyTokenData = {
	token: string;
};

export type ResetPasswordRequestData = {
	email: string;
};

export type ResetPasswordData = {
	token: string;
	password: string;
};

export type ProfileScoreData = {
	id: string;
	team: Team;
	achievements: Achievement[];
	is_strava_connected: boolean;
	user_info: UserType;
};

export type StravaUser = {
	user_id: number;
	access_token: string;
	refresh_token: string;
	expires_at: string;
};
