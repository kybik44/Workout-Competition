import { FC } from 'react';
import css from './index.module.css';

type Props = {
	videoId: string;
};
const PlayerWithVimeoChat: FC<Props> = ({ videoId }) => (
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
			src={'https://vimeo.com/live-chat/507207025/'}
			frameBorder="0"
			className={css.asr_chat}
		></iframe>
	</section>
);

export default PlayerWithVimeoChat;
