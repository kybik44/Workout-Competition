import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const ClockIcon = ({ ...props }: Props) => (
	<svg
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M16.0007 2.6H16C8.59938 2.6 2.6 8.59938 2.6 16C2.6 23.4006 8.59938 29.4 16 29.4C23.4006 29.4 29.4 23.4006 29.4 16V15.9993C29.3917 8.60253 23.3975 2.60831 16.0007 2.6ZM17.6 15H23.4V17H15V8.6H17V14.4V15H17.6ZM15.9993 31.4C7.49445 31.3996 0.6 24.505 0.6 16C0.6 7.49481 7.49481 0.6 16 0.6C24.505 0.6 31.3997 7.49445 31.4 15.9993C31.3907 24.501 24.501 31.3907 15.9993 31.4Z"
			fill="white"
			stroke="white"
			strokeWidth="1.2"
		/>
	</svg>
);

export default ClockIcon;
