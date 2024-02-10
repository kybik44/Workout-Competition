import { AxiosResponse } from 'axios';
import Axios from '../../../app/axios';
import { CharityInputs } from '../../ui/components/organisms/Charity/validation';
import { CharityCount, CharityInfo } from './../../../entities/types';

export const getCharityInfo = (
	token: string
): Promise<AxiosResponse<CharityInfo>> =>
	Axios.get('/charity/info/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getCharityCount = (
	token: string
): Promise<AxiosResponse<CharityCount>> =>
	Axios.get('/charity/total/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const donateCharity = (data: CharityInputs, token: string) =>
	Axios.post('/charity/donate/', data, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
