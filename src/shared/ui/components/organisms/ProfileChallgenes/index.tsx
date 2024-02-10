import { ComponentProps, useEffect, useState } from 'react';
import { ChallengeData, WorkoutData } from '../../../../../entities/types';
import ScheduleCard from '../../atoms/ScheduleItem';
import ChallengeProgress from '../../molecules/ChallengeProgress';
import css from './index.module.css';

type Props = ComponentProps<'section'> & {
	challenges?: ChallengeData[];
	workouts?: WorkoutData[];
	personal?: boolean;
};

const ProfileChallenges = ({
	challenges,
	workouts,
	className,
	personal,
	...props
}: Props) => {
	const [currentWorkouts, setCurrentWorkouts] = useState<
		WorkoutData[] | null
	>(null);

	useEffect(() => {
		workouts && workouts?.length > 0 && setCurrentWorkouts(workouts);
	}, [workouts]);

	return (
		<section
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>
					{personal
						? 'Мои челленджи и тренировки'
						: 'Челленджи и тренировки'}
				</h2>
				{challenges && challenges?.length > 0 && (
					<div className={css['challenges']}>
						{challenges?.map((challenge, idx) => (
							<ChallengeProgress
								title={challenge?.title}
								progress={
									(challenge?.progress /
										challenge?.condition) *
									100
								}
								key={`${challenge?.id}${idx}`}
							/>
						))}
					</div>
				)}
				{currentWorkouts &&
					currentWorkouts?.length > 0 &&
					challenges &&
					challenges?.length > 0 && <hr className={css['line']} />}
				{currentWorkouts && currentWorkouts?.length > 0 && (
					<div className={css['workouts-wrapper']}>
						<h3 className={css['subtitle']}>
							{personal ? 'Мои тренировки' : 'Тренировки'}
						</h3>
						<div className={css['workouts']}>
							{currentWorkouts?.map((workout, idx) => (
								<ScheduleCard
									workout={workout}
									key={`${workout?.id}${idx}`}
									setWorkouts={setCurrentWorkouts}
									workoutsList={currentWorkouts}
									publicProfile={!personal}
									unsubscribe
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProfileChallenges;
