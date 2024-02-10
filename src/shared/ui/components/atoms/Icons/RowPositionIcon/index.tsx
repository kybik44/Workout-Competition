import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const RowPositionIcon = ({ ...props }: Props) => (
	<svg
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M27 5H5V27H27V5ZM6.375 11.875V6.375H25.625V11.875H6.375ZM6.375 18.75V13.25H25.625V18.75H6.375ZM6.375 25.625V20.125H25.625V25.625H6.375Z"
			fill="#C7C7C7"
		/>
	</svg>
);

export default RowPositionIcon;
