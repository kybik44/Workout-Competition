import { AxiosResponse } from 'axios';
import Axios from '../../../../app/axios';
import {
	OrderData,
	OrderInfoData,
	PickupPointData,
	ShopItemData,
} from '../types';

export const getShopItemDatas = (
	token: string
): Promise<AxiosResponse<ShopItemData[]>> =>
	Axios.get('/shop/items/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getPickupPonts = (
	token: string
): Promise<AxiosResponse<PickupPointData[]>> =>
	Axios.get('/shop/points/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const sendOrder = (data: OrderData, token: string) =>
	Axios.post('/shop/orders/', data, {
		headers: {
			Authorization: `Token ${token}`,
		},
	});

export const getOrders = (
	token: string
): Promise<AxiosResponse<OrderInfoData>> =>
	Axios.get('/shop/orders/', {
		headers: {
			Authorization: `Token ${token}`,
		},
	});
