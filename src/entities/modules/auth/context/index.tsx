import React from 'react';

import { UserType } from '../types';
import useAuth from '../hooks/useAuth';

import { TOKEN_KEY } from '../../../../shared/lib/constants/global';

export type AuthContextType = {
	auth: UserType;
	setAuth: (state: UserType) => void;
	loading: boolean;
	setLoading: (state: boolean) => void;
};
export const AuthContext = React.createContext(
	(null as unknown) as AuthContextType
);

const AuthWrap = ({ children }) => {
	const { auth, loading, setAuth, setLoading } = useAuth({
		tokenName: TOKEN_KEY,
	});

	return (
		<AuthContext.Provider value={{ auth, loading, setAuth, setLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthWrap;
