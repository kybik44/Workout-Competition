import { ComponentProps } from 'react';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	title: string;
	progress: number;
};

const ChallengeProgress = ({ title, progress, className, ...props }: Props) => {
	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<h3 className={css['title']}>{title}</h3>
			<div className={css['progress-wrapper']}>
				<div
					className={css['progress']}
					style={{
						width: `${progress < 100 ? progress?.toFixed(2) : 100
							}%`,
					}}
				>
					<span className={css['count']}>
						{progress < 100 ? progress?.toFixed(2) : 100}%
					</span>
				</div>
			</div>
			<p className={css['progress-text']}>Шкала выполненного задания</p>
		</div>
	);
};

export default ChallengeProgress;
