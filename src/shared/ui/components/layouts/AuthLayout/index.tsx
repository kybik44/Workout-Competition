import { ReactChild, ReactNode } from 'react';
import css from './index.module.css';

type Props = {
	children: ReactChild | ReactNode;
	type: 'register' | 'auth';
};

const AuthLayout = ({ children, type }: Props) => {
	return (
		<section
			className={`${type === 'register'
					? css['register-wrapper']
					: css['auth-wrapper']
				}`}
		>
			<div className={`content ${css['inner']}`}>
				<img
					src="/images/common/logo_1.png"
					alt="Logo"
					width={266}
					height={105}
					loading="lazy"
					srcSet="/images/common/logo_1.png 1x, /images/common/logo_1@2x.png 2x"
					className={css['logo']}
				/>
				{children}
			</div>
			<div className={css['text']}>
				<p className={css['title']}>WorkoutNow</p>
				<p className={css['subtitle']}>
					Включайся. Заряжайся. Добивайся
				</p>
				<img
					src="/images/common/logo_2.png"
					alt="Bottom Logo"
					width={262}
					height={107}
					srcSet="/images/common/logo_2.png 1x, /images/common/logo_2@2x.png 2x"
					loading="lazy"
					className={css['bottom-logo']}
				/>
			</div>
		</section>
	);
};

export default AuthLayout;
