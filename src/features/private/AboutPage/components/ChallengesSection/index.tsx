import { ComponentProps } from 'react';
import { ChallengeData } from '../../../../../entities/types';
import AboutChallenge from '../../../../../shared/ui/components/molecules/AboutChallenge';
import css from './index.module.css';

type Props = ComponentProps<'section'> & {
	content: ChallengeData[];
};

const ChallengesSection = ({ content }: Props) => {
	return (
		<section className={css['wrapper']}>
			<div className={`content ${css['inner']}`}>
				{content?.map((el, idx) => (
					<AboutChallenge
						className={css['challenge']}
						challenge={el}
						key={`${el?.id}${idx}`}
					/>
				))}
			</div>
		</section>
	);
};

export default ChallengesSection;
