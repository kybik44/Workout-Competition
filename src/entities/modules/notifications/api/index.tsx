import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Axios from '../../../../app/axios';
import { NotificationData } from '../types';

export const getNotifications = (
	type: string | number,
	config: AxiosRequestConfig
): Promise<AxiosResponse<NotificationData[]>> =>
	Axios.get(`/notifications/?type=${type}`, config);
