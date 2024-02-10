import React, { ComponentProps } from 'react';
import useMedia from '../../../../lib/hooks/useMedia';
import BurgerIcon from '../Icons/BurgerIcon';
import BurgerMobIcon from '../Icons/BurgerMobIcon';
import css from './index.module.css';

type Props = ComponentProps<'button'> & {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const BurgerButton = ({ className, onClick, ...props }: Props) => {
	const isMobile = useMedia('(max-width: 890px)');
	return (
		<button
			{...props}
			className={`${className} ${css['burger']}`}
			onClick={onClick}
		>
			{isMobile ? <BurgerMobIcon /> : <BurgerIcon />}
		</button>
	);
};

export default BurgerButton;
