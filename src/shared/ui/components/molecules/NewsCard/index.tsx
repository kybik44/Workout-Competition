import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';
import { NewsContent } from '../../../../../entities/types';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	news: NewsContent;
};

const NewsCard = ({ news, className, ...props }: Props) => {
	const router = useRouter();

	return (
		<div
			className={`${css['card']} ${className ? className : ''}`}
			{...props}
		>
			<img
				src={news?.image?.url}
				alt="Logo"
				width={381}
				height={247}
				loading="lazy"
				className={css['thumbnail']}
			/>
			<div className={css['info']}>
				<h3 className={css['title']}>{news?.title}</h3>
				<p className={css['date']}>
					{new Date(news?.date)
						.toLocaleDateString('ru-RU', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})
						.replace(/[.,г]/gi, '')}
				</p>
				<p className={css['description']}>{news?.description}</p>
				<Link href={`/news/${news?.id}`}>
					<a className={css['about-link']}>Подробнее</a>
				</Link>
			</div>
		</div>
	);
};

export default NewsCard;
