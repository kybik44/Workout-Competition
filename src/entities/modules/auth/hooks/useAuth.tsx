import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getMe } from '../api';
import { UserType } from '../types';

import storage from '../../../../shared/lib/utils/storage';
import { PRIVATE_ROUTES } from '../../../../shared/lib/constants/routes';

export type AuthModuleReturnType = {
	auth: UserType | undefined;
	loading: boolean;
	setAuth: (state: UserType) => void;
	setLoading: (state: boolean) => void;
};

export type AuthModuleIProps = {
	tokenName: string;
};

const useAuth = ({ tokenName }: AuthModuleIProps): AuthModuleReturnType => {
	const router = useRouter();

	const [auth, setAuth] = useState<UserType | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchAuth();
	}, []);

	const fetchAuth = async () => {
		setLoading(true);
		const token = storage.get(tokenName);
		if (token) {
			try {
				const { data } = await getMe(token);
				setAuth(data);
			} catch (error) {
				await setAuth(null);
				await setLoading(false);
				(await PRIVATE_ROUTES.includes(router.pathname)) &&
					router.replace('/login');
			} finally {
				setLoading(false);
			}
		} else {
			setLoading(false);
			setAuth(null);
			PRIVATE_ROUTES.includes(router.pathname) &&
				router.replace('/login');
		}
	};

	return {
		auth,
		loading,
		setAuth,
		setLoading,
	};
};

export default useAuth;
