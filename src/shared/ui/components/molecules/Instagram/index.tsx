import Link from 'next/link';
import { UserFilesType } from '../../../../../entities/modules/contest/types';
import css from './index.module.css';

type Props = {
	photos: UserFilesType;
};

const Instagram = ({ photos }: Props) => {
	return (
		<section className={css['wrapper']}>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>Инстаграм</h2>
				<div className={css['photos']}>
					{photos?.slice(0, 4).map((item) => (
						<img
							key={item.id}
							src={item.file}
							alt="Logo"
							width={277}
							height={277}
							loading="lazy"
							className={css['thumbnail']}
						/>
					))}
				</div>
				<Link href={'/photoalbum#instagram'}>
					<a className={css['link']}>Смотреть все фотографии</a>
				</Link>
			</div>
		</section>
	);
};

export default Instagram;
