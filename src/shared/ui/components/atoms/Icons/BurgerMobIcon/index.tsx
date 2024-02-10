import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const BurgerMobIcon = ({ ...props }: Props) => (
	<svg width="32" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill="#fff" d="M0 0h32v5H0z" />
		<path fill="#F9C3ED" d="M0 8h32v4H0z" />
		<path fill="#F487DC" d="M0 15h32v5H0z" />
	</svg>
);

export default BurgerMobIcon;
