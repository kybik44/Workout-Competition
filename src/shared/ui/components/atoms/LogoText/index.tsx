import React, { ComponentProps } from 'react';
import css from './index.module.css';

type Props = {
	isSmallHead?: boolean;
};

const LogoText = ({ isSmallHead }: Props) => {
	return (
		<>
			<p
				className={`${css['logo-text']} ${
					isSmallHead ? css['small-logo'] : ''
				}`}
			>
				WorkoutNow
			</p>
			<p className={css['text']}>Включайся. Заряжайся. добивайся</p>
		</>
	);
};

export default LogoText;
