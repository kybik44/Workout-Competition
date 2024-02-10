import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const CrossIcon = ({ ...props }: Props) => (
	<svg
		width="58"
		height="58"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M1.359 1.359 56.64 56.641M56.641 1.359 1.718 56.282"
			stroke="#000"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
);

export default CrossIcon;
