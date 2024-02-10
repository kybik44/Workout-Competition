import Markdown from 'markdown-to-jsx';
import { ActivityAboutData } from '../../../../../entities/types';
import WarningIcon from '../../atoms/Icons/WarningIcon';
import ActivityDescription from '../ActivityDescription';

import css from './index.module.css';

type Props = {
	activity: ActivityAboutData;
};

const Activity = ({ activity }: Props) => {
	return (
		<div className={css['activity']}>
			<div className={css['info']}>
				<h3 className={css['title']}>{activity.title}</h3>
				{activity.new && (
					<p className={css['new']}>
						<WarningIcon className={css['icon']} />
						Новое обязательное условие:
					</p>
				)}
				<Markdown className={css['updates']}>
					{activity.updates}
				</Markdown>
			</div>
			<div className={css['descriptions']}>
				{activity.activity_description.map(
					({ description, images, dark_background }, idx) => (
						<ActivityDescription
							key={idx}
							darkBackground={dark_background}
							description={description}
							images={images}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default Activity;
