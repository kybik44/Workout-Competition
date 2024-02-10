import { useRouter } from 'next/router';
import ContestModule from '../../../entities/modules/contest/components';
import { TOKEN_KEY } from '../../../shared/lib/constants/global';
import storage from '../../../shared/lib/utils/storage';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import css from './index.module.css';

const PhotoalbumPage = () => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<PrivateTemplateGeneric title="Фотоальбом">
			<Head
				isSmallHead={true}
				background={'football'}
				pathname={pathname}
			/>
			<section className={css['photoalbum']}>
				<div className={`content ${css['inner']}`}>
					<h2 className={css['title']}>Фотоальбом</h2>
					<div className={css['info']}>
						<p className={css['contacts']}>
							Если ты хочешь, чтобы твое фото появилось в этом
							альбоме, отправь его нам на e-mail:{' '}
							<a
								href="mailto:WorkoutNow@gmail.com"
								className={css['email']}
							>
								WorkoutNow@yandex.ru
							</a>{' '}
							и мы обязательно его опубликуем.
						</p>
					</div>
					<ContestModule token={storage.get(TOKEN_KEY)} contest={1} />
				</div>
			</section>
			<Footer />
		</PrivateTemplateGeneric>
	);
};

export default PhotoalbumPage;
