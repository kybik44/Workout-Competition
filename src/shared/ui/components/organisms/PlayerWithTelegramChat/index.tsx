import { FC } from 'react';
import css from './index.module.css';

type Props = {
	videoId: string | number;
};
const PlayerWithTelegramChat: FC<Props> = ({ videoId }) => (
	<section className={css.asr_section}>
		<div className={css.asr_iframewrap}>
			<iframe
				src={`https://player.vimeo.com/video/${videoId}`}
				frameBorder="0"
				allow="autoplay; fullscreen; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
		<iframe
			src={'/html/telegram.html'}
			frameBorder="0"
			className={css.asr_chat}
		></iframe>
	</section>
);

export default PlayerWithTelegramChat;
