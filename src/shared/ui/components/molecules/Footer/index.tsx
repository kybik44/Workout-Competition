import css from './index.module.css';

const Footer = () => {
	return (
		<footer className={css['footer']}>
			<div className={`content ${css['inner']}`}>
				<img
					src="/images/commong/logo_2.png"
					alt="Logo"
					width={171}
					height={70}
					loading="lazy"
					className={css['logo']}
					srcSet="/images/common/logo_2.png 1x, /images/common/logo_2@2x.png 2x"
				/>
				<p className={css['text']}>включайся. заряжайся. добивайся</p>
				<p className={css['contacts']}>
					Обратная связь по e-mail:{' '}
					<a
						href="mailto:WorkoutNow@gmail.com"
						className={css['email']}
					>
						WorkoutNow@gmail.com
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
