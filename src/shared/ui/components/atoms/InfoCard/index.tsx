import React from 'react';
import css from './index.module.css';

type Props = {
	number: number;
	title: string;
	text: string;
};

const InfoCard = ({ number, title, text }: Props) => {
	return (
		<div className={css['wrapper']}>
			<p className={css['number']}>
				<span className={css['second-number']}>{number}</span>
				{number}
			</p>
			<div className={css['info']}>
				<h5 className={css['title']}>{title}</h5>
				<p className={css['text']}>{text}</p>
			</div>
		</div>
	);
};

export default InfoCard;
