import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const BurgerIcon = ({ ...props }: Props) => (
	<svg
		width="56"
		height="40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path fill="#fff" d="M0 0h56v10H0z" />
		<path fill="#F9C3ED" d="M0 15h56v10H0z" />
		<path fill="#F487DC" d="M0 30h56v10H0z" />
	</svg>
);

export default BurgerIcon;
