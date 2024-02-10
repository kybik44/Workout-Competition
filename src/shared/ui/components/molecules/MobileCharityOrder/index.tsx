import { ComponentProps, useState } from 'react';
import Collapse from 'react-css-collapse';
import ReactMarkdown from 'react-markdown';
import { CharityInfo } from '../../../../../entities/types';
import { declOfNum } from '../../../../lib/utils/declOfNum';
import ArrowIcon from '../../atoms/Icons/ArrowIcon';
import css from './index.module.css';

type Props = ComponentProps<'li'> & {
	content: CharityInfo;
	points: number;
};

const MobileCharityOrder = ({
	content,
	points,
	className,
	...props
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<li className={`${css['wrapper']} ${className ? className : ''}`}>
			<div className={css['head']}>
				<img
					src={content?.img}
					alt={content?.title}
					loading="lazy"
					width={78}
					height={93}
				/>
				<div className={css['short-info']}>
					{content?.title && (
						<h3 className={css['title']}>{content?.title}</h3>
					)}

					<p className={css['count-title']}>Вы перечислили</p>
					<p>
						{points}{' '}
						{declOfNum(points, ['балл', 'балла', 'баллов'])}
					</p>

					<button
						className={`${css['hide-btn']} ${open ? css['open-btn'] : ''
							}`}
						type="button"
						onClick={() => setOpen(!open)}
					>
						<ArrowIcon />
					</button>
				</div>
			</div>
			<Collapse isOpen={open}>
				<ReactMarkdown className={css['description']}>
					{content?.text}
				</ReactMarkdown>
			</Collapse>
		</li>
	);
};

export default MobileCharityOrder;
