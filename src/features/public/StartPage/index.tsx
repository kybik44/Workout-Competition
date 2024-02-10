import { useRouter } from 'next/router';
import PublicTemplateGeneric from '../../../shared/templates/PublicTemplateGeneric';
import LogoText from '../../../shared/ui/components/atoms/LogoText';
import css from './index.module.css';

const StartPage = () => {
	const router = useRouter();
	return (
		<PublicTemplateGeneric title="WorkoutNow">
			<section className={css['wrapper']}>
				<div className={`content ${css['inner']}`}>
					<img
						src="/images/commong/logo_1.png"
						alt="Logo"
						width={266}
						height={105}
						loading="lazy"
						className={css['logo-first']}
						srcSet="/images/common/logo_1.png 1x, /images/common/logo_1@2x.png 2x"
					/>
					<div className={css['buttons-container']}>
						<button
							className={css['button']}
							type="button"
							onClick={() => router.push(`/register`)}
						>
							Зарегистрироваться
						</button>
						<button
							className={`${css['button']} ${css['second-button']}`}
							type="button"
							onClick={() => router.push(`/login`)}
						>
							Войти
						</button>
					</div>
					<LogoText />
					<img
						src="/images/commong/logo_2.png"
						alt="Logo"
						width={290}
						height={119}
						loading="lazy"
						className={css['logo-second']}
						srcSet="/images/common/logo_2.png 1x, /images/common/logo_2@2x.png 2x"
					/>
				</div>
			</section>
		</PublicTemplateGeneric>
	);
};

export default StartPage;
