import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import SmallCrossIcon from '../../../atoms/Icons/SmallCrossIcon';
import css from './index.module.css';

type Props = {
	isOpen: boolean;
	setOpen: (state: boolean) => void;
	image: string;
};

const ResultsModal = ({ isOpen, setOpen, image }: Props) => {
	return (
		<Modal
			open={isOpen}
			onClose={() => setOpen(false)}
			center
			showCloseIcon={false}
			classNames={{
				modal: css['modal'],
			}}
		>
			<button onClick={() => setOpen(false)} className={css['close']}>
				<SmallCrossIcon />
			</button>
			<div className={css['image-wrapper']}>
				<img src={image} alt="Results" />
			</div>
		</Modal>
	);
};

export default ResultsModal;
