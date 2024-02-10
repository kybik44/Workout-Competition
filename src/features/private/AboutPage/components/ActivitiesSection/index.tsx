import Markdown from 'markdown-to-jsx';
import {
	ActivityAboutData,
	ResultRulesContent,
} from '../../../../../entities/types';
import Activities from '../../../../../shared/ui/components/molecules/Activities';
import Warning from '../../../../../shared/ui/components/molecules/Warning';

import css from './index.module.css';

type Props = {
	activities: ActivityAboutData[];
	rules: ResultRulesContent;
};

const ActivitiesSection = ({ activities, rules }: Props) => {
	return (
		<>
			<section className={`${css['wrapper']} content`}>
				<div className={css['rules']}>
					<Markdown className={css['markdown']}>
						{rules.manual}
					</Markdown>
					<Markdown className={css['markdown']}>
						{rules.automatically}
					</Markdown>
				</div>
			</section>
			<Warning warning={rules.warning} />
			<Activities activities={activities} />
		</>
	);
};

export default ActivitiesSection;
