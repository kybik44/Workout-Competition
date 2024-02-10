import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import SmallCrossIcon from '../../../atoms/Icons/SmallCrossIcon';
import ServerErrorMessage from '../../../atoms/ServerError';
import css from './index.module.css';
4;
type Props = {
	isOpen: boolean;
	acceptHandler: () => void;
	declineHandler: () => void;
	submitting?: boolean;
	onClose: () => void;
	onSuccess: () => void;
	serverError?: string | null;
	title?: string;
	description?: string;
	acceptText: string;
	declineText: string;
	success?: boolean;
	successMessage?: string;
	successButtonText?: string;
};

const CharityModal = ({
	isOpen,
	acceptHandler,
	declineHandler,
	submitting,
	onClose,
	onSuccess,
	serverError,
	title,
	description,
	acceptText,
	declineText,
	success,
	successMessage,
	successButtonText,
}: Props) => {
	return (
		<Modal
			center
			open={isOpen}
			onClose={onClose}
			showCloseIcon={false}
			classNames={{
				modal: css['modal'],
				overlay: css['overlay'],
			}}
		>
			<button className={css['close']} type="button" onClick={onClose}>
				<SmallCrossIcon />
			</button>
			{!success && (
				<>
					{title && <h3 className={css['title']}>{title}</h3>}
					{description && (
						<p className={css['description']}>{description}</p>
					)}
					<div className={css['controls']}>
						<button
							type="button"
							onClick={() => acceptHandler()}
							className={css['accept']}
						>
							{acceptText}
						</button>
						<button
							onClick={() => declineHandler()}
							type="button"
							className={css['decline']}
						>
							{declineText}
						</button>
					</div>
					{serverError && <ServerErrorMessage msg={serverError} />}
				</>
			)}
			{success && (
				<>
					<h3 className={css['success-title']}>{successMessage}</h3>
					<button
						type="button"
						onClick={onSuccess}
						className={css['success-button']}
					>
						{successButtonText}
					</button>
				</>
			)}
		</Modal>
	);
};

export default CharityModal;
