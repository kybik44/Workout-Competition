import { ActivityAboutData } from '../../../../../entities/types';
import Activity from '../Activity';

import css from './index.module.css';

type Props = {
	activities: ActivityAboutData[];
};

const Activities = ({ activities }: Props) => {
	return (
		<section className={css['wrapper']}>
			<div className={`content ${css['inner']}`}>
				<div className={css['activities']}>
					{activities?.map((activity, idx) => (
						<Activity activity={activity} key={idx} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Activities;
