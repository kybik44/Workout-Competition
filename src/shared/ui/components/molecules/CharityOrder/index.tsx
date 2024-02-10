import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import { CharityInfo } from '../../../../../entities/types';
import { declOfNum } from '../../../../lib/utils/declOfNum';
import css from './index.module.css';

type Props = ComponentProps<'li'> & {
	content: CharityInfo;
	points: number;
};

const CharityOrder = ({ content, points, className, ...props }: Props) => {
	return (
		<li
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<article className={css['info-wrapper']}>
				<img
					src={content?.img}
					alt="Charity"
					width={146}
					height={174}
					loading="lazy"
				/>
				<div className={css['info']}>
					{content?.title && (
						<h4 className={css['title']}>{content?.title}</h4>
					)}
					{content?.text && (
						<ReactMarkdown className={css['description']}>
							{content?.text}
						</ReactMarkdown>
					)}
				</div>
			</article>
			<article className={css['count-wrapper']}>
				<span className={css['count-title']}>Вы перечислили</span>
				<span className={css['count']}>
					{points} {declOfNum(points, ['балл', 'балла', 'баллов'])}
				</span>
			</article>
		</li>
	);
};

export default CharityOrder;
