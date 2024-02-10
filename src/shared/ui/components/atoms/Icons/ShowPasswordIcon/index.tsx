import React, { FC } from 'react';
import css from './index.module.css';

type Props = {
	typeForPassword: 'text' | 'password';
	setTypeForPassword: (e: 'text' | 'password') => void;
};

const ShowPasswordIcon: FC<Props> = ({
	setTypeForPassword,
	typeForPassword,
}) => {
	return (
		<div className={css['eye']}>
			{typeForPassword === 'text' ? (
				<svg
					width="17"
					height="16"
					viewBox="0 0 17 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					onClick={() => setTypeForPassword('password')}
				>
					<path
						d="M1.88994 8.83745C1.59219 8.31885 1.59219 7.6814 1.88994 7.1628C3.4566 4.43406 5.96248 2.66675 8.78649 2.66675C11.6105 2.66675 14.1163 4.43404 15.683 7.16274C15.9808 7.68134 15.9808 8.31879 15.683 8.83739C14.1164 11.5661 11.6105 13.3334 8.78646 13.3334C5.96247 13.3334 3.45661 11.5662 1.88994 8.83745Z"
						stroke="black"
						strokeWidth="2"
					/>
					<ellipse
						cx="8.7865"
						cy="8"
						rx="2"
						ry="2"
						stroke="black"
						strokeWidth="2"
					/>
				</svg>
			) : (
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					onClick={() => setTypeForPassword('text')}
				>
					<g clipPath="url(#clip0_63_530)">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M10.4626 2.79002C9.68008 2.45937 8.84879 2.25635 7.9872 2.25635C4.59029 2.25635 1.66427 5.41223 0.34044 7.10293C-0.143373 7.72083 -0.139952 8.56511 0.3495 9.17855C0.785662 9.7252 1.39357 10.4254 2.13342 11.1192L3.54843 9.70421C2.9664 9.16324 2.46599 8.6064 2.07646 8.13306C2.68183 7.38316 3.55798 6.42407 4.59344 5.64033C5.74409 4.76942 6.90339 4.25635 7.9872 4.25635C8.28171 4.25635 8.58179 4.29423 8.88576 4.36689L10.4626 2.79002ZM5.55983 7.69282C5.74365 6.68827 6.53569 5.89623 7.54024 5.7124L5.55983 7.69282ZM10.4324 8.47712L8.32455 10.5849C9.41773 10.4356 10.283 9.57031 10.4324 8.47712ZM7.08681 11.8227C7.39091 11.8937 7.6916 11.9308 7.9872 11.9308C9.07894 11.9308 10.24 11.4246 11.3866 10.5732C12.4185 9.80696 13.2923 8.86906 13.8979 8.13306C13.5037 7.6447 12.9946 7.06761 12.4015 6.50801L13.8162 5.0933C14.5724 5.81186 15.1923 6.53892 15.634 7.10293C16.1178 7.72083 16.1144 8.56511 15.6249 9.17855C14.2968 10.8431 11.3764 13.9308 7.9872 13.9308C7.12339 13.9308 6.29003 13.7303 5.50572 13.4038L7.08681 11.8227Z"
							fill="#C7C7C7"
						/>
						<path
							d="M1.26611 14.8146L14.7077 1.37305"
							stroke="#C7C7C7"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
					</g>
					<defs>
						<clipPath id="clip0_63_530">
							<rect width="16" height="16" fill="white" />
						</clipPath>
					</defs>
				</svg>
			)}
		</div>
	);
};

export default ShowPasswordIcon;
