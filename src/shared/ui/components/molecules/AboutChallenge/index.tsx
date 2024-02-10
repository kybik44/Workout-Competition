import { AxiosError } from 'axios';
import { ComponentProps, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChallengeData } from '../../../../../entities/types';
import { subscribeChallenge } from '../../../../api/about';
import { TOKEN_KEY } from '../../../../lib/constants/global';
import dateLiveTape from '../../../../lib/utils/dateLiveTape';
import storage from '../../../../lib/utils/storage';
import ParticipationModal from '../modals/ParticipationModal';
import css from './index.module.css';

type Props = ComponentProps<'article'> & {
	challenge: ChallengeData;
};

const AboutChallenge = ({ challenge, className, ...props }: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [
		currentChallenge,
		setCurrentChallenge,
	] = useState<ChallengeData | null>(null);

	useEffect(() => {
		challenge && setCurrentChallenge(challenge);
	}, [challenge]);

	const subscribeRequest = async () => {
		try {
			await subscribeChallenge(challenge?.id, storage.get(TOKEN_KEY));
			setCurrentChallenge({
				...challenge,
				participation: true,
			});
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				setError(data[Object.keys(data)[0]]);
			}
		}
	};
	return (
		<article
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={css['info']}>
				{currentChallenge?.title && (
					<h2 className={css['title']}>{currentChallenge?.title}</h2>
				)}
				{currentChallenge?.short_details && (
					<p className={css['subtitle']}>
						{currentChallenge?.short_details}
					</p>
				)}
				{currentChallenge?.start_time && currentChallenge?.end_time && (
					<p className={css['time']}>
						{dateLiveTape(currentChallenge?.start_time)} -{' '}
						{dateLiveTape(currentChallenge?.end_time)}
					</p>
				)}
				{currentChallenge?.image && (
					<div className={css['mobile-image']}>
						<img
							src={currentChallenge?.image}
							alt={currentChallenge?.title}
							loading="lazy"
						/>
					</div>
				)}
				{currentChallenge?.details && (
					<ReactMarkdown className={css['details']}>
						{currentChallenge?.details}
					</ReactMarkdown>
				)}

				<button
					type="button"
					onClick={() => setOpen(true)}
					className={css['accept']}
					disabled={currentChallenge?.participation}
				>
					{currentChallenge?.participation
						? 'Вы уже записаны'
						: 'Принять участие'}
				</button>
			</div>
			{currentChallenge?.image && (
				<img
					src={currentChallenge?.image}
					alt={currentChallenge?.title}
					width={478}
					height={324}
					loading="lazy"
					className={css['thumbnail']}
				/>
			)}
			<ParticipationModal
				isOpen={open}
				setOpen={setOpen}
				onSuccess="close"
				title="Готовы записаться на челлендж?"
				acceptButton="Да"
				declineButton="Нет"
				acceptHandler={subscribeRequest}
				onClose={() => setOpen(false)}
				errorText={error}
				serverError={error}
			/>
		</article>
	);
};

export default AboutChallenge;
