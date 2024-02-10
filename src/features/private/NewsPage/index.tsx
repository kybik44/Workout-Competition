import { useRouter } from 'next/router';
import { useState } from 'react';
import Pagination from '../../../entities/pagination/components';
import { NewsContent, NewsPageContent } from '../../../entities/types';
import { getNewsPageData } from '../../../shared/api/cms/gql';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import NewsCard from '../../../shared/ui/components/molecules/NewsCard';
import css from './index.module.css';
type Props = {
	content: NewsPageContent;
};

const NewsPage = ({ content }: Props) => {
	const router = useRouter();
	const { pathname } = router;

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [news, setNews] = useState<NewsContent[]>(
		content?.news ? content?.news : null
	);

	const handlePageClick = ({ selected: selectedPage }) => {
		getNewsForPage(selectedPage);
		setCurrentPage(selectedPage + 1);
	};

	const getNewsForPage = async (page: number) => {
		try {
			const { news } = await getNewsPageData(9, page + 1);
			setNews(news);
		} catch (e) {
			setCurrentPage(1);
			setNews(content?.news);
		}
	};

	return (
		<PrivateTemplateGeneric title="Новости">
			<Head isSmallHead={true} pathname={pathname} />
			<section className={css['news']}>
				<div className={`content ${css['inner']}`}>
					<h2 className={css['title']}>Новости</h2>
					<div className={css['news-container']}>
						{news.map((item) => (
							<NewsCard news={item} key={item.id} />
						))}
					</div>
					{content && content?.pages > 1 && (
						<Pagination
							currentPage={currentPage - 1}
							pageCount={content?.pages}
							onClick={(selected) => handlePageClick(selected)}
							className={css['pagination']}
						/>
					)}
				</div>
			</section>
			<Footer />
		</PrivateTemplateGeneric>
	);
};

export default NewsPage;
