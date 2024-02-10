import Markdown from 'markdown-to-jsx';
import WarningIcon from '../../atoms/Icons/WarningIcon';
import css from './index.module.css';

type Warning = {
	title: string;
	description: string;
	message: string;
	example: {
		url: string;
	};
};

type Props = { warning: Warning };

const Warning = ({ warning }: Props) => {
	return (
		<div className={`${css['warning']} `}>
			<div className={`${css['inner']} content`}>
				<div className={css['side']}>
					<h3 className={css['title']}>{warning.title}</h3>
					<Markdown className={css['description']}>
						{warning.description}
					</Markdown>
				</div>
				<div className={`${css['side']}`}>
					<div className={css['message']}>
						<WarningIcon className={css['icon']} />
						<p className={css['message-text']}>{warning.message}</p>
					</div>
					<div className={css['example']}>
						<h5 className={css['example-title']}>Пример:</h5>
						<img
							alt="Thumbnail"
							src={warning.example.url}
							width="288"
							height="167"
							loading="lazy"
							className={`${css['thumbnail']}`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Warning;
