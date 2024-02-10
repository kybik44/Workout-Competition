import { NewSeasonStep } from '../../../../../entities/types';
import AboutPageTitle from '../../atoms/AboutPageTitle';
import InfoCard from '../../atoms/InfoCard';
import css from './index.module.css';

type Props = {
	steps: NewSeasonStep[];
	newseasonTitle: string;
};

const Soon = ({ steps, newseasonTitle }: Props) => {
	return (
		<div className={css['wrapper']}>
			<AboutPageTitle className={css['title']}>
				{newseasonTitle}
			</AboutPageTitle>
			<div className={css['cards']}>
				{steps?.map(({ number, title, description }, idx) => (
					<InfoCard
						number={number}
						title={title}
						text={description}
						key={idx}
					/>
				))}
			</div>
		</div>
	);
};

export default Soon;
