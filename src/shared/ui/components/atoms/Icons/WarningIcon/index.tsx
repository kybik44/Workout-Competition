import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const WarningIcon = ({ ...props }: Props) => (
	<svg
		width="32"
		height="32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12Z"
			fill="#ED36C4"
			stroke="#ED36C4"
			strokeWidth="2"
			strokeMiterlimit="10"
		/>
		<path
			d="M16 10v7"
			stroke="#fff"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M16 23a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#fff" />
	</svg>
);

export default WarningIcon;
