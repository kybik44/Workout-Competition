import { AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from '../../../../app/axios';

import { UserfilesResponseType } from '../types';

export const GetUserfiles = (
	contest: number,
	config: AxiosRequestConfig,
	page?: string
): Promise<AxiosResponse<UserfilesResponseType>> =>
	axios.get(
		!page
			? `/files/?album=${contest}`
			: `/files/?album=${contest}&page=${page}`,
		{
			...config,
		}
	);

export const PostLike = (
	userfile: number,
	config: AxiosRequestConfig
): Promise<AxiosResponse<any>> =>
	axios.post(`/files/likes/`, { userfile }, config);

export const DeleteLike = (
	userfile: number,
	config: AxiosRequestConfig
): Promise<AxiosResponse<any>> =>
	axios.delete(`/files/likes/`, { data: { userfile }, ...config });

export const PostFile = (
	form: FormData,
	config: AxiosRequestConfig
): Promise<AxiosResponse<any>> => axios.post(`/files/`, form, config);
