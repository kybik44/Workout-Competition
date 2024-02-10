import React, { ComponentProps } from 'react';
import css from './index.module.css';

type Props = ComponentProps<'h3'> & {
	className: string;
	children: React.ReactChild | React.ReactNode;
};

const AboutPageTitle = ({ children, className, ...props }: Props) => {
	return (
		<h3
			className={`${css['title']} ${className ? className : ''}`}
			{...props}
		>
			{children}
		</h3>
	);
};

export default AboutPageTitle;
