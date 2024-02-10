import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NewsContent } from '../../../entities/types';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import ButtonArrow from '../../../shared/ui/components/atoms/ButtonArrow';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import css from './index.module.css';

type Props = {
	news: NewsContent;
	next: number;
	prev: number;
};
const NewsPage = ({ news, next, prev }: Props) => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<PrivateTemplateGeneric title="Новости">
			<Head isSmallHead={true} pathname={pathname} />
			<section className={css['news']}>
				<div className={`content ${css['inner']}`}>
					<ButtonArrow
						direction="left"
						buttonType={'back'}
						onClick={() => router.push('/news')}
					>
						Назад
					</ButtonArrow>

					<div className={css['news-container']}>
						<div className={css['info-row']}>
							<div className={css['info-head']}>
								<h2 className={css['title']}>{news?.title}</h2>
								<p className={css['date']}>
									{new Date(news?.date)
										.toLocaleDateString('ru-RU', {
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										})
										.replace(/[.,г]/gi, '')}
								</p>
							</div>
						</div>
						{news?.image?.url && (
							<img
								src={news?.image?.url}
								alt="Logo"
								width={997}
								height={646}
								loading="lazy"
								className={css['thumbnail']}
							/>
						)}

						<h3 className={css['subtitle']}>{news?.subtitle}</h3>
						<Markdown className={css['text']}>
							{news?.description?.replace(
								/\n\n\n/gi,
								'\n &nbsp;'
							)}
						</Markdown>
					</div>
					<div className={css['button-container']}>
						{prev ? (
							<Link href={`/news/${prev}`}>
								<a>
									<ButtonArrow direction="left">
										Предыдущая новость
									</ButtonArrow>
								</a>
							</Link>
						) : null}
						{next ? (
							<>
								<p></p>
								<Link href={`/news/${next}`}>
									<a>
										<ButtonArrow direction="right">
											Следующая новость
										</ButtonArrow>
									</a>
								</Link>
							</>
						) : null}
					</div>
				</div>
			</section>
			<Footer />
		</PrivateTemplateGeneric>
	);
};

export default NewsPage;
