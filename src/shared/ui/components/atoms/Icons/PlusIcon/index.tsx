import React, { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const PlusIcon = ({ ...props }: Props) => {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M6 6V12M6 6V0M6 6H12M6 6H0"
				stroke="white"
				strokeWidth="2"
			/>
		</svg>
	);
};

export default PlusIcon;
