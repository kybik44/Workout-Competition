import React, { ComponentProps } from 'react';
import ArrowIcon from '../Icons/ArrowIcon';
import css from './index.module.css';

type Props = ComponentProps<'button'> & {
	direction: string;
	children: React.ReactChild | React.ReactNode;
	buttonType?: string;
};

const Button = ({
	direction,
	className,
	children,
	buttonType,
	...props
}: Props) => {
	return (
		<button
			{...props}
			className={`${className} ${css['button']} ${
				buttonType === 'back' ? css['back'] : ''
			}`}
		>
			<ArrowIcon
				className={direction === 'left' ? css['left'] : css['right']}
			/>
			{children}
		</button>
	);
};

export default Button;
