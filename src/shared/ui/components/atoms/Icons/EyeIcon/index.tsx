import React, { ComponentProps } from 'react';

type Props = ComponentProps<'svg'>;

const EyeIcon = ({ ...props }: Props) => {
	return (
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M21.7565 10.962C22.2305 11.582 22.2305 12.419 21.7565 13.038C20.2635 14.987 16.6815 19 12.4995 19C8.31752 19 4.73552 14.987 3.24252 13.038C3.01191 12.7411 2.88672 12.3759 2.88672 12C2.88672 11.6241 3.01191 11.2589 3.24252 10.962C4.73552 9.013 8.31752 5 12.4995 5C16.6815 5 20.2635 9.013 21.7565 10.962V10.962Z"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12.5 15C14.1569 15 15.5 13.6569 15.5 12C15.5 10.3431 14.1569 9 12.5 9C10.8431 9 9.5 10.3431 9.5 12C9.5 13.6569 10.8431 15 12.5 15Z"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default EyeIcon;
