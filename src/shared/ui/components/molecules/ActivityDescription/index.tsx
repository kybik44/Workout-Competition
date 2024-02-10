import Markdown from 'markdown-to-jsx';
import css from './index.module.css';

type Props = {
	darkBackground: boolean;
	description: string;
	images: {
		url;
	}[];
};

const ActivityDescription = ({
	darkBackground,
	description,
	images,
}: Props) => {
	return (
		<div
			className={`${css['description']} ${darkBackground ? css['dark-bg'] : ''
				}`}
		>
			<Markdown className={css['description-text']}>
				{description}
			</Markdown>
			<div className={css['images']}>
				{images.map((photo, idx) => (
					<img
						key={idx}
						alt="Thumbnail"
						src={photo.url}
						loading="lazy"
						height={265}
						className={`${css['thumbnail']}`}
					/>
				))}
			</div>
		</div>
	);
};

export default ActivityDescription;
