import ReactMarkdown from 'react-markdown';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { NotificationData } from '../../../../../../entities/modules/notifications/types';
import SmallCrossIcon from '../../../atoms/Icons/SmallCrossIcon';
import css from './index.module.css';

type Props = {
	open: boolean;
	setOpen: (state: boolean) => void;
	content: NotificationData;
};

const NotificationModal = ({ open, setOpen, content }: Props) => {
	return (
		<Modal
			open={open}
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
			{content?.title && (
				<h3 className={css['title']}>{content?.title}</h3>
			)}
			{content?.text && (
				<ReactMarkdown className={css['text']}>
					{content?.text}
				</ReactMarkdown>
			)}
			{content?.image && (
				<div className={css['image']}>
					<img src={content?.image} loading="lazy" />
				</div>
			)}
		</Modal>
	);
};

export default NotificationModal;
