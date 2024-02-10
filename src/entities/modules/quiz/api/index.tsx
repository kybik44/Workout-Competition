import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from '../../../../app/axios';

import {
	ActiveQuizTypes,
	QuizAnswerType,
	QuizResultsType,
	QuizType,
} from '../types';

export const GetActiveQuizs = (
	config: AxiosRequestConfig
): Promise<AxiosResponse<ActiveQuizTypes>> =>
	axios.get(`/quiz/?active=True`, config);

export const GetQuizById = (
	id: number,
	config: AxiosRequestConfig
): Promise<AxiosResponse<QuizType>> => axios.get(`/quiz/${id}/`, config);

type PostQuizRequestDataType = {
	data: {
		quiz_id: number;
		answers: QuizAnswerType[];
	};
	config: AxiosRequestConfig;
};
export const PostQuiz = ({
	data,
	config,
}: PostQuizRequestDataType): Promise<AxiosResponse<QuizResultsType>> =>
	axios.post(`/quiz/answers/`, data, config);
