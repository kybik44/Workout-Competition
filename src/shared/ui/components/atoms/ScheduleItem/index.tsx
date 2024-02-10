import { AxiosError } from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { WorkoutData } from '../../../../../entities/types';
import { unsubscribeWorkout } from '../../../../api/profile';
import { postProfileWorkouts } from '../../../../api/workouts';
import { TOKEN_KEY } from '../../../../lib/constants/global';
import useMedia from '../../../../lib/hooks/useMedia';
import storage from '../../../../lib/utils/storage';
import ParticipationModal from '../../molecules/modals/ParticipationModal';
import ClockIcon from '../Icons/CloсkIcon';
import PlusIcon from '../Icons/PlusIcon';
import css from './index.module.css';

type Props = {
	workout: WorkoutData;
	unsubscribe?: boolean;
	setWorkouts?: (state: WorkoutData[]) => void;
	workoutsList?: WorkoutData[];
	publicProfile?: boolean;
};

const ScheduleCard = ({
	workout,
	unsubscribe,
	workoutsList,
	setWorkouts,
	publicProfile,
}: Props) => {
	const isMobile = useMedia('(max-width: 768px)');

	const token = storage.get(TOKEN_KEY);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string>(undefined);

	const [currentWorkout, setCurrentWorkout] = useState(workout);

	const handleWorkoutSubscribe = async () => {
		try {
			await postProfileWorkouts(workout.id, token);
			const newWorkout = {
				...workout,
				participation: !workout.participation,
			};
			setCurrentWorkout(newWorkout);
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				setServerError(data[Object.keys(data)[0]]);
			}
		} finally {
		}
	};

	const handleUnsubscribe = async () => {
		try {
			await unsubscribeWorkout(token, currentWorkout?.id);
			await setWorkouts(
				workoutsList?.filter((w) => w?.id !== currentWorkout?.id)
			);
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				setServerError(data[Object.keys(data)[0]]);
			}
		}
	};

	const onClose = () => {
		setIsOpen(false);
		setServerError(null);
	};

	return (
		<div className={css['card']}>
			<img
				src={currentWorkout?.image}
				alt="Thumbnail"
				width={174}
				height={174}
				loading="lazy"
				className={css['thumbnail']}
			/>
			<div className={css['inner']}>
				<div className={css['info']}>
					<div className={css['card-head']}>
						<h3 className={css['title']}>
							{currentWorkout?.title}
						</h3>
						<ReactMarkdown className={css['description']}>
							{currentWorkout?.details}
						</ReactMarkdown>
					</div>
					<Link
						href={`/workouts/${currentWorkout?.id}?participation=${currentWorkout?.participation}&discipline_id=${currentWorkout?.discipline_id}`}
					>
						<a className={css['about-button']}>
							<span className={css['about-circle']}>
								<PlusIcon className={css['plus']} />
							</span>
							больше информации
						</a>
					</Link>
				</div>

				<div className={css['buttons-container']}>
					<div className={css['date-container']}>
						<p className={css['date']}>
							{new Date(currentWorkout?.date)
								.toLocaleDateString('ru-RU', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})
								.replace(/[.,г]/gi, '')}
						</p>
						<p className={css['time']}>
							<ClockIcon className={css['icon']} />
							{new Date(currentWorkout?.date)
								.toLocaleTimeString()
								.slice(0, -3)}
						</p>
					</div>
					{!unsubscribe && !publicProfile && (
						<button
							className={`${css['disappears-button']}
						${currentWorkout?.participation ? css['disabled-button'] : ''}`}
							onClick={() => setIsOpen(!isOpen)}
							disabled={
								currentWorkout?.participation ||
								!currentWorkout?.is_active ||
								!currentWorkout?.are_places
							}
						>
							{!currentWorkout?.participation &&
								currentWorkout?.are_places
								? 'Записаться'
								: (currentWorkout?.participation &&
									currentWorkout?.are_places) ||
									(currentWorkout?.participation &&
										!currentWorkout?.are_places)
									? 'Вы уже записаны'
									: 'Мест нет'}
						</button>
					)}
					{unsubscribe && !publicProfile && (
						<button
							className={`${css['disappears-button']}`}
							onClick={() => setIsOpen(!isOpen)}
						>
							Отменить тренировку
						</button>
					)}
				</div>
			</div>
			<ParticipationModal
				acceptHandler={
					!unsubscribe ? handleWorkoutSubscribe : handleUnsubscribe
				}
				isOpen={isOpen}
				setOpen={setIsOpen}
				serverError={serverError}
				title={
					!unsubscribe
						? 'Вы уверены, что пойдете на тренировку? Готовы записаться?'
						: 'Вы уверены, что хотите отменить тренировку?'
				}
				errorText="Вам не удалось записаться на тренировку. Попробуте снова!"
				successTitle="Вы записались на тренировку!"
				acceptButton="Да"
				declineButton="Нет"
				onSuccess={unsubscribe ? 'close' : 'message'}
				onClose={onClose}
			/>
		</div>
	);
};

export default ScheduleCard;
