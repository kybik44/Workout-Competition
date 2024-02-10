import React, { ComponentProps } from 'react';
import ArrowIcon from '../../atoms/Icons/ArrowIcon';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	isOpen: boolean;
	children: React.ReactChild | React.ReactNode;
	title: string;
};

const CollapseWrapper = ({
	isOpen,
	children,
	title,
	className,
	onClick,
	...props
}: Props) => {
	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={`${css['inner']}`} onClick={onClick}>
				<h3
					className={`${css['title']} ${isOpen ? css['active'] : ''}`}
				>
					{title}
				</h3>
				<ArrowIcon
					className={`${css['arrow']} ${isOpen ? css['open-arrow'] : ''
						}`}
				/>
			</div>
			<div className={`${css['collapse']} ${isOpen ? css['open'] : ''}`}>
				<div className={css['chart-wrap']}>{children}</div>
			</div>
		</div>
	);
};

export default CollapseWrapper;
