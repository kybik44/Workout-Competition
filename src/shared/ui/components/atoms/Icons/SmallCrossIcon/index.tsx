import React, { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const SmallCrossIcon = ({ ...props }: Props) => {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M1 13L13 1" stroke="#C7C7C7" strokeWidth="1.5" />
			<path d="M1 1L13 13" stroke="#C7C7C7" strokeWidth="1.5" />
		</svg>
	);
};

export default SmallCrossIcon;
