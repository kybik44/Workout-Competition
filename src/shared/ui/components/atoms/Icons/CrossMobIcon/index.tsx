import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const CrossMobIcon = ({ ...props }: Props) => (
	<svg
		width="48"
		height="48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="m8 8 32 32M40 8 8 40"
			stroke="#000"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
);

export default CrossMobIcon;
