import { AboutInfoContent } from '../../../../../entities/types';
import AboutPageTitle from '../../../../../shared/ui/components/atoms/AboutPageTitle';
import Instruction from '../../../../../shared/ui/components/molecules/Instruction';
import Soon from '../../../../../shared/ui/components/molecules/Soon';
import css from './index.module.css';

type Props = {
	info: AboutInfoContent;
};

const AboutSection = ({ info }: Props) => {
	return (
		<>
			<section className={`${css['wrapper']} content`}>
				<AboutPageTitle className={css['title']}>
					{info.title}
				</AboutPageTitle>
				<p className={css['text']}>{info.description}</p>
				<Soon
					steps={info.new_season_step}
					newseasonTitle={info.new_season}
				/>

				<p className={css['newseason-description']}>
					{info.new_season_description}
				</p>
				<Instruction instruction_steps={info.instruction_step} />
				<div className={css['term']}>
					<AboutPageTitle className={css['term-title']}>
						{info.period_title}
					</AboutPageTitle>
					<p className={css['term-text']}>
						{info.period_description}
					</p>
				</div>
			</section>
		</>
	);
};

export default AboutSection;
