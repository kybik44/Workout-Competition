import Link from 'next/link';
import { WorkoutData } from '../../../../../entities/types';
import ScheduleCard from '../../atoms/ScheduleItem';
import css from './index.module.css';

type Props = {
	workouts: WorkoutData[];
};

const Schedule = ({ workouts }: Props) => {
	return (
		<section className={css['wrapper']}>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>Ближайшие офлайн тренировки</h2>
				<div className={css['schedule']}>
					{workouts?.slice(0, 3).map((item) => (
						<ScheduleCard workout={item} key={item.id} />
					))}
				</div>
				<Link href={'/workouts'}>
					<a className={css['link']}>Смотреть все тренировки</a>
				</Link>
			</div>
		</section>
	);
};

export default Schedule;
