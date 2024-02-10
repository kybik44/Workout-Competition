import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import ArrowIcon from '../../../../../shared/ui/components/atoms/Icons/ArrowIcon';

import css from './index.module.css';

interface Props {
	pageCount: number | string;
	onClick: ({ selected: selectedPage }: { selected: number }) => void;
	currentPage: number;
	className?: string;
}

// all documentation is here https://www.npmjs.com/package/react-paginate
// styles are written for example

const Pagination: FC<Props> = ({
	pageCount,
	onClick,
	currentPage,
	className,
}) => {
	return (
		<div className={`${css['pagination']} ${className && className}`}>
			<ReactPaginate
				previousLabel={<ArrowIcon />}
				nextLabel={<ArrowIcon />}
				previousLinkClassName={css['link']}
				nextLinkClassName={css['link']}
				previousClassName={css['arrow']}
				nextClassName={`${css['arrow']} ${css['right']}`}
				pageCount={pageCount}
				marginPagesDisplayed={1}
				pageRangeDisplayed={2}
				onPageChange={onClick}
				forcePage={currentPage}
				containerClassName={css['pagination']}
				pageClassName={css['each-li']}
				pageLinkClassName={css['page-link']}
				activeLinkClassName={css['active']}
				breakClassName={css['break']}
				breakLinkClassName={css['break-link']}
			/>
		</div>
	);
};

export default Pagination;
