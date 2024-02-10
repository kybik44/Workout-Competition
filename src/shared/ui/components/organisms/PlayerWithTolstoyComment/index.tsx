import { FC } from 'react';
import TolstoyComments from '../../../../../entities/modules/TolstoyComments';
import css from './index.module.css';

type Props = {
	videoId: string | number;
	chatId: string | number;
};
const PlayerWithTolstoyComments: FC<Props> = ({ videoId, chatId }) => {
	return (
		<section className={css.asr_section}>
			<div className={css.asr_iframewrap}>
				<iframe
					src={`https://player.vimeo.com/video/${videoId}`}
					frameBorder="0"
					allow="autoplay; fullscreen; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
			<TolstoyComments ssoIsRequired={false} chat={chatId} />
		</section>
	);
};

export default PlayerWithTolstoyComments;
