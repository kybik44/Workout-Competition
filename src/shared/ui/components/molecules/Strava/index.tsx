import router from 'next/router';
import { ComponentProps, useState } from 'react';
import {
	disconnectStrava
} from '../../../../../entities/modules/auth/api';
import { STRAVA_ACCESS_URL, TOKEN_KEY } from '../../../../lib/constants/global';
import storage from '../../../../lib/utils/storage';
import StravaWhiteIcon from '../../atoms/Icons/StravaWhiteIcon';
import StravaInstructionModal from '../modals/StravaInstructionModal';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	isConnected: boolean;
};

const Strava = ({ isConnected, className, ...props }: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	const disconnect = async (token: string) => {
		if (token) {
			try {
				await disconnectStrava(token);
				router.reload();
			} catch (e) { }
		}
	};

	return (
		<div className={`${css['wrapper']} ${className ? className : ''}`}>
			{!isConnected && (
				<>
					<a
						href={STRAVA_ACCESS_URL}
						target="_blank"
						className={css['connect']}
					>
						<p className={css['text']}>
							Подключить
							<br />
							<StravaWhiteIcon className={css['icon']} />
						</p>
					</a>
					<button
						type="button"
						onClick={() => setOpen(true)}
						className={css['instruction']}
					>
						<p className={css['text']}>
							Как подключить
							<br />
							<StravaWhiteIcon className={css['icon']} />
						</p>
					</button>
					<StravaInstructionModal isOpen={open} setOpen={setOpen} />
				</>
			)}
			{isConnected && (
				<>
					<div className={css['connected']}>
						<p className={css['text']}>
							Данные
							<br />
							<StravaWhiteIcon className={css['icon']} />
							<br />
							автоматичсеки отражаются в Ваших результатах
						</p>
					</div>
					<button
						onClick={() => disconnect(storage.get(TOKEN_KEY))}
						type="button"
						className={css['disconnect']}
					>
						<p className={css['text']}>
							Отключить
							<br />
							<StravaWhiteIcon className={css['icon']} />
						</p>
					</button>
				</>
			)}
		</div>
	);
};

export default Strava;
