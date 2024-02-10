import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const SquarePositionIcon = ({ ...props }: Props) => (
	<svg
		width="32"
		height="32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M5.333 5.333h5.334v5.334H5.333V5.333ZM5.333 13.333h5.334v5.334H5.333v-5.334ZM10.667 21.333H5.333v5.334h5.334v-5.334ZM13.333 5.333h5.334v5.334h-5.334V5.333ZM18.667 13.333h-5.334v5.334h5.334v-5.334ZM13.333 21.333h5.334v5.334h-5.334v-5.334ZM26.667 5.333h-5.334v5.334h5.334V5.333ZM21.333 13.333h5.334v5.334h-5.334v-5.334ZM26.667 21.333h-5.334v5.334h5.334v-5.334Z"
			fill="#ED36C4"
		/>
	</svg>
);

export default SquarePositionIcon;
