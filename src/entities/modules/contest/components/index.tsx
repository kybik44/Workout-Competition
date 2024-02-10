import { FC, useEffect, useRef, useState } from 'react';
import useMedia from '../../../../shared/lib/hooks/useMedia';
import useContestModule, { ContestModuleHookReturnType } from '../hooks';
import LikeComponent from './LikeComponent';
import Pagination from './Pagination';
import css from './index.module.css';

type ViewType = 'grid' | 'column';

type Props = {
	token: string;
	contest: 1 | 2;
	disableLikes?: boolean;
};

const ContestModule: FC<Props> = ({
	token,
	contest,
	disableLikes = false,
}): JSX.Element => {
	const {
		userfiles,
		loading,
		serverErrors,
		onLikeUserfile,
		onDislikeUserfile,
		nextAllowedPage,
		getFilesForTheNextPage,
		pagesLoading,
		count,
	}: ContestModuleHookReturnType = useContestModule({
		token: token,
		contest: contest,
		sendImmediately: false,
		loadAllFromStart: false,
	});

	const [view, setView] = useState<ViewType>('grid');
	const isMobile = useMedia('(max-width: 768px)');

	const ITEM_PER_PAGE =
		contest === 1 ? (isMobile && view === 'column' ? 7 : 16) : 8;
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageCount, setPageCount] = useState<number>(0);

	const offset = currentPage * ITEM_PER_PAGE;
	useEffect(() => {
		pageCountingHelper();
	}, [count, userfiles, view]);
	const pageCountingHelper = () => {
		count
			? setPageCount(Math.ceil(count / ITEM_PER_PAGE))
			: setPageCount(0);
	};

	const handlePageClick = ({ selected: selectedPage }) => {
		setCurrentPage(selectedPage);
		nextAllowedPage ? getFilesForTheNextPage() : null;
		cont.current.scrollIntoView();
	};

	const handleLikeButton = (id: number, liked: boolean) => {
		liked === false ? onLikeUserfile(id) : onDislikeUserfile(id);
	};

	const [zoom, setZoom] = useState(undefined);
	const handleZoom = (id: number) => {
		return zoom ? setZoom(undefined) : setZoom(id);
	};
	const cont = useRef<HTMLDivElement>(null);

	return (
		<>
			{loading && !serverErrors ? 'Загрузка...' : null}
			{!loading && userfiles && !serverErrors ? (
				<div
					className={`${css['photos']} ${
						pageCount > 1 ? css['margin-photos'] : ''
					}`}
					style={{
						backgroundColor: disableLikes
							? '#F7F7F7'
							: 'transparent',
					}}
					ref={cont}
				>
					{userfiles
						?.slice(offset, offset + ITEM_PER_PAGE)
						.map(({ id, file, licked, likes, notes }) => (
							<article
								key={id}
								id={`${id}`}
								className={css['photo-card']}
							>
								<p className={css['photo-title']}>{notes}</p>
								<img
									alt="Thumbnail"
									src={file}
									width="274px"
									height="240px"
									loading="lazy"
									className={`${css['thumbnail']} ${
										disableLikes ? css['photo-margin'] : ''
									}`}
									onClick={() => handleZoom(id)}
								/>
								{disableLikes ? null : (
									<div className={css['likes']}>
										<LikeComponent
											likeId={id}
											liked={licked}
											handleClick={handleLikeButton}
										/>
										<span className={css['count']}>
											{likes}
										</span>
									</div>
								)}
							</article>
						))}
				</div>
			) : null}
			{zoom ? (
				<div className={css['mask']}>
					<img
						src={userfiles?.find((el) => el.id === zoom).file}
						className={css['scaled']}
						onClick={() => handleZoom(undefined)}
					/>
				</div>
			) : null}
			{pageCount > 1 && !serverErrors && !loading ? (
				<Pagination
					pageCount={pageCount}
					onClick={handlePageClick}
					currentPage={currentPage}
					className={css['pagination']}
				/>
			) : null}
			{!loading && !serverErrors && !userfiles.length
				? 'Фотографии скоро добавятся в фотоальбом'
				: null}
			{serverErrors ? 'Ошибка загрузки файлов' : null}
		</>
	);
};

export default ContestModule;
