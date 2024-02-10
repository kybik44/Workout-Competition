import { createContext, useState } from 'react';

type tolstoyAuthTokenType = undefined | string;
export type StoreContextType = {
	tolstoyAuthToken: tolstoyAuthTokenType;
	setTolstoyAuthToken: (state: tolstoyAuthTokenType) => void;
};
export const StoreContext = createContext<StoreContextType>(
	(null as unknown) as StoreContextType
);

export const StoreContextWrap = ({ children }) => {
	const [
		tolstoyAuthToken,
		setTolstoyAuthToken,
	] = useState<tolstoyAuthTokenType>(undefined);

	return (
		<StoreContext.Provider
			value={{ tolstoyAuthToken, setTolstoyAuthToken }}
		>
			{children}
		</StoreContext.Provider>
	);
};
