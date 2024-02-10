import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import Axios from '../../../app/axios';

export type PaginationHookReturn = {
	currentPage: number;
	pageCount: number;
	offset: number;
	handlePageClick: ({ selected: selectedPage }) => void;
	itemsPerPage: number;
	loading: boolean;
	setLoading: (state: boolean) => void;
	setCurrentPage: (state: number) => void;
	setPageCount: (state: number) => void;
};

type Props = {
	itemsPerPage: number;
	count: number;
	next?: string;
	previous?: string;
	setItems?: (state: any) => void;
	getItemsForPage?: (page: string | number, limit: string | number) => void;
	token: string;
};

const usePagination = ({
	itemsPerPage,
	count,
	setItems,
	getItemsForPage,
	next,
	previous,
	token,
}: Props): PaginationHookReturn => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageCount, setPageCount] = useState<number>(0);
	const offset = currentPage * itemsPerPage;
	const [loading, setLoading] = useState<boolean>(false);

	const requestConfig: AxiosRequestConfig = {
		headers: {
			Authorization: `Token ${token}`,
		},
	};

	useEffect(() => {
		count && setPageCount(Math.ceil(count / itemsPerPage));
	}, [count]);

	const handlePageClick = async ({ selected: selectedPage }) => {
		const pageOffset = selectedPage * itemsPerPage;

		if (selectedPage - currentPage === 1) {
			try {
				setLoading(true);
				const { data } = await Axios.get(next, requestConfig);
				setItems(data);
			} catch (e) {
				setItems(null);
			} finally {
				setLoading(false);
				setCurrentPage(selectedPage);
			}
		} else if (selectedPage - currentPage === -1) {
			try {
				setLoading(true);
				const { data } = await Axios.get(previous, requestConfig);
				setItems(data);
			} catch (e) {
				setItems(null);
			} finally {
				setLoading(false);
				setCurrentPage(selectedPage);
			}
		} else {
			try {
				setLoading(true);
				const data = await getItemsForPage(pageOffset, itemsPerPage);
				setItems(data);
			} catch (e) {
				setItems(null);
			} finally {
				setLoading(false);
				setCurrentPage(selectedPage);
			}
		}
	};

	return {
		currentPage,
		pageCount,
		offset,
		handlePageClick,
		itemsPerPage,
		loading,
		setLoading,
		setCurrentPage,
		setPageCount,
	};
};

export default usePagination;
