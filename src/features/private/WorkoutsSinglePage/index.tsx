import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { postProfileWorkouts } from '../../../shared/api/workouts';
import { TOKEN_KEY } from '../../../shared/lib/constants/global';
import storage from '../../../shared/lib/utils/storage';
import PublicTemplateGeneric from '../../../shared/templates/PublicTemplateGeneric';
import ButtonArrow from '../../../shared/ui/components/atoms/ButtonArrow';
import ClockIcon from '../../../shared/ui/components/atoms/Icons/CloсkIcon';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import ParticipationModal from '../../../shared/ui/components/molecules/modals/ParticipationModal';
import css from './index.module.css';

const WorkoutsSinglePage = ({ workout }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string>(undefined);

	const router = useRouter();
	const { pathname } = router;

	const [workouts, setWorkouts] = useState(workout);

	const handleWorkoutSubscribe = async () => {
		try {
			await postProfileWorkouts(workout[0].id, storage.get(TOKEN_KEY));
			let newWorkout = await workouts.map((w) =>
				w.id === workout[0].id
					? { ...w, participation: !w.participation }
					: w
			);
			setWorkouts(newWorkout);
		} catch (err) {
			setServerError('Error');
		} finally {
			setIsOpen(true);
		}
	};

	const onClose = () => {
		setIsOpen(false);
		setServerError(null);
	};
	return (
		<PublicTemplateGeneric title="Тренировка">
			<Head
				isSmallHead={true}
				background={'football'}
				pathname={pathname}
			/>
			<section className={css['workout']}>
				<div className={`content ${css['inner']}`}>
					<ButtonArrow
						direction="left"
						buttonType={'back'}
						onClick={() => router.push('/workouts')}
					>
						Все тренировки
					</ButtonArrow>

					{workouts?.map((i) => (
						<div className={css['workout-card']} key={i.id}>
							<h2 className={css['title']}>{i.title}</h2>
							<div className={css['card-inner']}>
								<img
									src={i.image}
									alt="Thumbnail"
									width="277"
									height="306"
									loading="lazy"
									className={css['thumbnail']}
								/>
								<div className={css['info']}>
									<div className={css['date-container']}>
										<p className={css['date']}>
											{new Date(i?.date)
												.toLocaleDateString('ru-RU', {
													day: 'numeric',
													month: 'long',
													year: 'numeric',
												})
												.replace(/[.,г]/gi, '')}
										</p>
										<p className={css['time']}>
											<ClockIcon
												className={css['icon']}
											/>
											{new Date(i?.date)
												.toLocaleTimeString()
												.slice(0, -3)}
										</p>
									</div>
									<ReactMarkdown className={css['details']}>
										{i.details}
									</ReactMarkdown>
									<button
										className={`${css['disappears-button']}
										${i.participation ? css['disabled-button'] : ''}`}
										onClick={() => setIsOpen(!isOpen)}
										disabled={
											i?.participation ||
											!i?.is_active ||
											!i?.are_places
										}
									>
										{!i?.participation && i?.are_places
											? 'Записаться'
											: (i?.participation &&
													i?.are_places) ||
											  (i?.participation &&
													!i?.are_places)
											? 'Вы уже записаны'
											: 'Мест нет'}
									</button>
								</div>
							</div>
						</div>
					))}

					<ParticipationModal
						acceptHandler={handleWorkoutSubscribe}
						isOpen={isOpen}
						setOpen={setIsOpen}
						serverError={serverError}
						title="Вы уверены, что пойдете на тренировку? Готовы записаться?"
						errorText="Вам не удалось записаться на тренировку. Попробуте снова!"
						successTitle="Вы записались на тренировку!"
						successText="Добавляйте ежедневно свои успехи, чтобы отслеживать прогресс."
						acceptButton="Да"
						declineButton="Нет"
						onSuccess="message"
						onClose={onClose}
					/>
				</div>
			</section>
			<Footer />
		</PublicTemplateGeneric>
	);
};

export default WorkoutsSinglePage;
