import React, { ComponentProps, FC } from 'react';

type Props = ComponentProps<'svg'>;

const FacebookIcon = ({ ...props }: Props) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g clipPath="url(#clip0_203_3276)">
			<rect width="24" height="24" fill="#331515" />
			<circle cx="11.5" cy="12.5" r="18.5" fill="#4E6297" />
			<path
				d="M19.8245 6.78224C19.8245 5.39714 18.6024 4.17499 17.2173 4.17499H6.7068C5.3217 4.17499 4.09955 5.39714 4.09955 6.78224V17.2927C4.09955 18.6778 5.3217 19.9 6.7068 19.9H12.0028V13.9522H10.0473V11.3449H12.0028V10.2857C12.0028 8.49325 13.3064 6.94519 14.9359 6.94519H17.0543V9.55244H14.9359C14.6915 9.55244 14.4471 9.79688 14.4471 10.2857V11.3449H17.0543V13.9522H14.4471V19.9H17.2173C18.6024 19.9 19.8245 18.6778 19.8245 17.2927V6.78224Z"
				fill="white"
			/>
		</g>
		<defs>
			<clipPath id="clip0_203_3276">
				<rect width="24" height="24" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

export default FacebookIcon;
