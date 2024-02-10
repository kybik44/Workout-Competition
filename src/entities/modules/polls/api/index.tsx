import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ActivePollsType, PollStatisticsType, PollType } from '../types';
import axios from '../../../../app/axios';

export type GetPollRequestDataType = {
	id: number;
	config: AxiosRequestConfig;
};
export const GetPollById = ({
	id,
	config,
}: GetPollRequestDataType): Promise<AxiosResponse<PollType>> =>
	axios.get(`/polls/${id}/`, config);

export const GetActivePolls = (
	config: AxiosRequestConfig
): Promise<AxiosResponse<ActivePollsType>> =>
	axios.get('/polls/?active=True', config);

export type PostVoteRequestDataType = {
	data: {
		poll: number;
		choice: number;
	};
	config: AxiosRequestConfig;
};
export const PostVote = ({
	data,
	config,
}: PostVoteRequestDataType): Promise<AxiosResponse<any>> =>
	axios.post('/polls/vote/', data, config);

export const GetResultsForPoll = (
	id: number,
	config: AxiosRequestConfig
): Promise<AxiosResponse<PollStatisticsType>> =>
	axios.get(`/polls/statistics/${id}/`, config);
