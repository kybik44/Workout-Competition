import { ComponentProps, FC } from 'react';
import ReactPaginate from 'react-paginate';
import useMedia from '../../../shared/lib/hooks/useMedia';
import ArrowIcon from '../../../shared/ui/components/atoms/Icons/ArrowIcon';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	pageCount: number | string;
	onClick: ({ selected: selectedPage }: { selected: number }) => void;
	currentPage: number;
};

const Pagination: FC<Props> = ({
	pageCount,
	onClick,
	currentPage,
	...props
}) => {
	const isMobile = useMedia('(max-width: 768px)');

	return (
		<div
			className={`${css['wrapper']} ${
				props?.className ? props?.className : ''
			}`}
		>
			<ReactPaginate
				previousLabel={
					<button className={`${css['left']} ${css['button']}`}>
						<ArrowIcon />
					</button>
				}
				nextLabel={
					<button className={`${css['right']} ${css['button']}`}>
						<ArrowIcon
							style={{
								transform: `rotate(180deg)`,
							}}
						/>
					</button>
				}
				pageCount={pageCount}
				marginPagesDisplayed={1}
				pageRangeDisplayed={5}
				onPageChange={onClick}
				forcePage={currentPage}
				containerClassName={css['container']}
				pageClassName={`${css['page']}`}
				pageLinkClassName={`${css['link']}`}
				activeLinkClassName={css['active']}
				breakLabel={null}
			/>
		</div>
	);
};

export default Pagination;
