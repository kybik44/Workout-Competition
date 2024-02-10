import { AxiosResponse } from 'axios';
import Axios from '../../../app/axios';
import { ChartId, ChartPeriod } from '../../../entities/types';

export const getChartData = (
	token: string,
	chart_id: ChartId,
	period: ChartPeriod
): Promise<
	AxiosResponse<{
		labels: string[];
		datasets: { label: string; data: number[] }[];
	}>
> =>
	Axios.get('/score/chartdata/', {
		headers: {
			Authorization: `Token ${token}`,
		},
		params: {
			chart_id,
			period,
		},
	});

export const getLeadersPeriods = (token: string) =>
	Axios.get(`/score/week-leaders/period/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const postProfileLike = (id: string, token: string) =>
	Axios.post(
		`/score/profile/likes/`,
		{
			profile: id,
		},
		{
			headers: {
				Authorization: `Token ${token}`,
			},
		}
	);

export const deleteProfileLike = (id: string, token: string) =>
	Axios.delete(`/score/profile/likes/`, {
		data: {
			profile: id,
		},
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getStatisticsActivities = (token: string) =>
	Axios.get(`/score/activities/`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
