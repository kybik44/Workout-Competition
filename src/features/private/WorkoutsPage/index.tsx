import { useRouter } from 'next/router';
import { WorkoutData } from '../../../entities/types';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import ScheduleCard from '../../../shared/ui/components/atoms/ScheduleItem';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import css from './index.module.css';

type Props = {
	workouts: WorkoutData[];
};

const WorkoutsPage = ({ workouts }: Props) => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<PrivateTemplateGeneric title="Тренировки">
			<Head
				isSmallHead={true}
				background={'football'}
				pathname={pathname}
			/>
			<section className={css['workouts']}>
				<div className={`content ${css['inner']}`}>
					<h2 className={css['title']}>
						Ближайшие офлайн тренировки
					</h2>
					<div className={css['schedule']}>
						{workouts?.map((item) => (
							<ScheduleCard workout={item} key={item.id} />
						))}
					</div>
				</div>
			</section>
			<Footer />
		</PrivateTemplateGeneric>
	);
};

export default WorkoutsPage;
