import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import SmallCrossIcon from '../../../atoms/Icons/SmallCrossIcon';
import StravaOrangeIcon from '../../../atoms/Icons/StravaOrangeIcon';
import css from './index.module.css';

type Props = {
	isOpen: boolean;
	setOpen: (state: boolean) => void;
};

const StravaInstructionModal = ({ isOpen, setOpen }: Props) => {
	return (
		<Modal
			center
			open={isOpen}
			onClose={() => setOpen(false)}
			showCloseIcon={false}
			classNames={{
				modal: css['modal'],
			}}
		>
			<button
				type="button"
				className={css['close']}
				onClick={() => setOpen(false)}
			>
				<SmallCrossIcon />
			</button>
			<h2 className={css['title']}>
				Как подключить <StravaOrangeIcon />
			</h2>
			<div className={css['image-wrapper']}>
				<picture>
					<source
						media="(max-width: 786px)"
						srcSet="/images/profile/strava-mob.png 1x, /images/profile/strava-mob@2x.png 2x"
					/>
					<img
						src="/images/profile/strava.png"
						alt="Strava"
						srcSet="/images/profile/strava.png 1x, /images/profile/strava@2x.png 2x"
						loading="lazy"
					/>
				</picture>
			</div>
		</Modal>
	);
};

export default StravaInstructionModal;
