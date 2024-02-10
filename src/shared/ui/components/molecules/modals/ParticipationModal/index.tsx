import { FC, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import css from './index.module.css';

type Props = {
	isOpen: boolean;
	setOpen: (state: boolean) => void;
	serverError: string | boolean | undefined;
	errorText: string;
	successTitle?: string;
	successText?: string;
	title?: string;
	subtitle?: string;
	acceptHandler: () => void;
	acceptButton: string;
	declineButton: string;
	onSuccess: 'close' | 'message';
	onClose: () => void;
};

const ParticipationModal: FC<Props> = ({
	isOpen,
	setOpen,
	serverError,
	errorText,
	successText,
	successTitle,
	title,
	subtitle,
	acceptHandler,
	acceptButton,
	declineButton,
	onSuccess,
	onClose,
}) => {
	const [success, setSuccess] = useState<boolean>(false);

	return (
		<Modal
			center
			open={isOpen}
			onClose={onClose}
			classNames={{
				modal: serverError
					? `${css['modal-error']}`
					: `${css['modal']}`,
				closeButton: `${css['close-btn']}`,
				closeIcon: `${css['close-icon']}`,
			}}
		>
			{!success && !serverError && (
				<div className={css['check']}>
					{title && <h2 className={css['title']}>{title}</h2>}
					{subtitle && <p className={css['subtitle']}>{subtitle}</p>}
					<div className={css['button-container']}>
						<button
							onClick={() => {
								acceptHandler();
								onSuccess === 'message' && !!serverError
									? setSuccess(true)
									: onSuccess === 'close' && !!serverError
										? setOpen(false)
										: null;
							}}
							className={css['buttonCheck']}
						>
							{acceptButton}
						</button>
						<button
							onClick={() => {
								onClose();
							}}
							className={`${css['buttonCheck']} ${css['transparent-button']}`}
						>
							{declineButton}
						</button>
					</div>
				</div>
			)}
			{serverError && (
				<div
					className={`${css['modal-wrap']} ${css['modal-wrap-error']}`}
				>
					<div className={css['error']}>
						<h2>О нет!</h2>
						<h3>Что-то пошло нет так!</h3>
						<p>{errorText}</p>
					</div>
				</div>
			)}
			{success && onSuccess === 'message' && (
				<div className={css['modal-wrap']}>
					<div className={css['text']}>
						<h2>Поздравляем!</h2>
						<h3>{successTitle}</h3>
						<p>{successText}</p>
						<button
							className={css['succes-button']}
							onClick={() => onClose()}
						>
							Хорошо
						</button>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default ParticipationModal;
