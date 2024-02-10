import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	AboutInfoContent,
	AboutScoreContent,
	ActivityAboutData,
	ChallengeData,
	ResultRulesContent,
} from '../../../entities/types';
import PublicTemplateGeneric from '../../../shared/templates/PublicTemplateGeneric';
import AboutNav from '../../../shared/ui/components/molecules/AboutNav';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import AboutSection from './components/AboutSection';
import ActivitiesSection from './components/ActivitiesSection';
import ChallengesSection from './components/ChallengesSection';
import ScoreSection from './components/ScoreSection';
import css from './index.module.css';

type Props = {
	rules: ResultRulesContent;
	activities: ActivityAboutData[];
	info: AboutInfoContent;
	scoresInfo: AboutScoreContent;
	challenges: ChallengeData[];
};

const AboutPage = ({
	rules,
	activities,
	info,
	scoresInfo,
	challenges,
}: Props) => {
	const router = useRouter();
	const { pathname } = router;

	const [section, setSection] = useState('marathon');

	return (
		<PublicTemplateGeneric title="О проекте">
			<Head
				isSmallHead={false}
				pathname={pathname}
				background="football"
			/>
			<section className={css['wrapper']}>
				<div className={`content ${css['inner']}`}>
					<h2 className={css['title']}>О проекте</h2>
					<AboutNav setSection={setSection} section={section} />
				</div>
			</section>
			{section === 'marathon' ? (
				<AboutSection info={info} />
			) : section === 'scores' ? (
				<ScoreSection scoresInfo={scoresInfo} />
			) : section === 'challenges' ? (
				<ChallengesSection content={challenges} />
			) : (
				<ActivitiesSection rules={rules} activities={activities} />
			)}

			<Footer />
		</PublicTemplateGeneric>
	);
};

export default AboutPage;
