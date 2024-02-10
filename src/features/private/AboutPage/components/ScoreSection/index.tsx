import { AboutScoreContent } from '../../../../../entities/types';
import useMedia from '../../../../../shared/lib/hooks/useMedia';
import AboutPageTitle from '../../../../../shared/ui/components/atoms/AboutPageTitle';
import css from './index.module.css';

type Props = {
	scoresInfo: AboutScoreContent;
};

const ScoreSection = ({ scoresInfo }: Props) => {
	const isMobile = useMedia('(max-width: 1024px)');

	return (
		<>
			<section className={`${css['wrapper']} content`}>
				<AboutPageTitle className={css['title']}>
					{scoresInfo.title}
				</AboutPageTitle>
				<p className={css['text']}>{scoresInfo.description}</p>
				{!isMobile ? (
					<img
						alt="Thumbnail"
						src={scoresInfo.image.url}
						width="1193"
						height="202"
						loading="lazy"
						className={`${css['thumbnail']}`}
					/>
				) : (
					<img
						alt="Thumbnail"
						src={scoresInfo.mobile_image.url}
						width="368"
						height="651"
						loading="lazy"
						className={`${css['thumbnail']}`}
					/>
				)}
			</section>
		</>
	);
};

export default ScoreSection;
