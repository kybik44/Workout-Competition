import Link from 'next/link';
import { NewsContent } from '../../../../../entities/types';
import NewsCard from '../NewsCard';
import css from './index.module.css';

type Props = {
	news: NewsContent[];
};

const News = ({ news }: Props) => {
	return (
		<section className={css['wrapper']}>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>Новости</h2>
				<div className={css['news']}>
					{news?.map((item) => (
						<NewsCard news={item} key={item.id} />
					))}
				</div>
				<Link href={'/news'}>
					<a className={css['link']}>Смотреть все новости</a>
				</Link>
			</div>
		</section>
	);
};

export default News;
