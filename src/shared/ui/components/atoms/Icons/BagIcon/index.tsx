import React, { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const BagIcon = ({ ...props }: Props) => {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M16.875 5.625H3.125C2.77982 5.625 2.5 5.90482 2.5 6.25V16.25C2.5 16.5952 2.77982 16.875 3.125 16.875H16.875C17.2202 16.875 17.5 16.5952 17.5 16.25V6.25C17.5 5.90482 17.2202 5.625 16.875 5.625Z"
				stroke="#7A7A7A"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6.875 5.625C6.875 4.7962 7.20424 4.00134 7.79029 3.41529C8.37634 2.82924 9.1712 2.5 10 2.5C10.8288 2.5 11.6237 2.82924 12.2097 3.41529C12.7958 4.00134 13.125 4.7962 13.125 5.625"
				stroke="#7A7A7A"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default BagIcon;
