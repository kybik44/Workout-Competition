import { useContext, useEffect } from 'react';

import { TOKEN_KEY } from '../../../shared/lib/constants/global';
import storage from '../../../shared/lib/utils/storage';
import { StoreContext } from '../../store/store';

import { AuthContext, getTolstoyToken } from '../auth';

export type TolstoyProps = {
	ssoIsRequired: boolean;
	chat: string | number;
};
const TolstoyComments = ({ ssoIsRequired, chat }: TolstoyProps) => {
	const { tolstoyAuthToken, setTolstoyAuthToken } = useContext(StoreContext);
	const { auth } = useContext(AuthContext);

	useEffect(() => {
		const token = storage.get(TOKEN_KEY);

		const getPythonSSO = async () => {
			try {
				const { data } = await getTolstoyToken(token);
				setTolstoyAuthToken(data.token);
			} catch (error) {
				console.log('Error');
			}
		};

		!tolstoyAuthToken && token && getPythonSSO();
		return () => !tolstoyAuthToken && token && getPythonSSO();
	}, [auth]);

	return (
		<iframe
			src={
				ssoIsRequired
					? tolstoyAuthToken
						? `/html/tolstoy.html?token=${tolstoyAuthToken}&id=${chat}`
						: ''
					: `/html/tolstoy.html?token=${tolstoyAuthToken}&id=${chat}`
			}
			style={{ border: 'none' }}
		></iframe>
	);
};

export default TolstoyComments;
