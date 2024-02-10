import React, { ComponentProps } from 'react';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	rules: string;
};

const ActivityRules = ({ rules, className, ...props }: Props) => {
	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<h4 className={css['title']}>Правила:</h4>
			<p className={css['text']}>{rules}</p>
		</div>
	);
};

export default ActivityRules;
