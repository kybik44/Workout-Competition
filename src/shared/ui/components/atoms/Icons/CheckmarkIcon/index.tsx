import React, { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const CheckmarkIcon = ({ ...props }: Props) => {
	return (
		<svg
			width="13"
			height="10"
			viewBox="0 0 13 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M12 1L4.6625 9L1 5"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default CheckmarkIcon;
