import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import SmallCrossIcon from '../../../atoms/Icons/SmallCrossIcon';
import css from './index.module.css';

type Props = {
	onClose: () => void;
	isOpen: boolean;
	error?: string;
	success?: boolean;
	successTitle?: string;
	successText?: string;
	acceptButton?: string;
};

const OrderStatusModal = ({
	isOpen,
	onClose,
	error,
	success,
	successTitle,
	successText,
	acceptButton,
}: Props) => {
	return (
		<Modal
			center
			open={isOpen}
			onClose={onClose}
			showCloseIcon={false}
			classNames={{
				modal: css['modal'],
			}}
		>
			<button type="button" onClick={onClose} className={css['close']}>
				<SmallCrossIcon />
			</button>
			{(error || (successTitle && success)) && (
				<h3 className={css['title']}>{error ? error : successTitle}</h3>
			)}
			{successText && success && (
				<p className={css['text']}>{successText}</p>
			)}
			<button className={css['accept']} type="button" onClick={onClose}>
				{acceptButton ? acceptButton : 'Понятно'}
			</button>
		</Modal>
	);
};

export default OrderStatusModal;
