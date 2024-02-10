import { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getNotifications } from '../api';
import { NotificationData } from '../types';

type NotificationsReturnData = {
	notifications: NotificationData[] | null;
};

type Props = {
	token: string;
	type: string | number;
};

const useNotifications = ({ token, type }: Props): NotificationsReturnData => {
	const [notifications, setNotifications] = useState<
		NotificationData[] | null
	>(null);

	const router = useRouter();

	const requestConfig: AxiosRequestConfig = {
		headers: {
			Authorization: `Token ${token}`,
		},
	};

	const getActiveNotifications = async (type: string | number) => {
		try {
			const { data } = await getNotifications(type, requestConfig);
			setNotifications(data);
		} catch (e) {
			setNotifications(null);
		}
	};

	useEffect(() => {
		getActiveNotifications(type);
	}, []);

	return {
		notifications: notifications,
	};
};

export default useNotifications;
