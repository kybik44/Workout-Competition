import { AxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DeleteLike, GetUserfiles, PostFile, PostLike } from '../api';
import { UserFilesType } from '../types';

type ErrorType = string | undefined;

export type ContestModuleHookReturnType = {
	userfiles: UserFilesType;
	loading: boolean;
	serverErrors: ErrorType;
	onLikeUserfile: (userfile: number) => void;
	onDislikeUserfile: (userfile: number) => void;
	onUploadUserfileToContest: (file: File, preview: string) => void;
	uploadError: ErrorType;
	setUploadError: Dispatch<SetStateAction<string>>;
	uploadLoading: boolean;
	uploadFile: File | undefined;
	uploadPreview: string | undefined;
	onSendUserfileToContest: () => void;
	nextAllowedPage: string | null;
	getFilesForTheNextPage: () => void;
	pagesLoading: boolean;
	count: number;
};

type Props = {
	token: string;
	contest: number;
	sendImmediately?: boolean;
	loadAllFromStart?: boolean;
};

const useContestModule = ({
	token,
	contest,
	sendImmediately = true,
	loadAllFromStart = false,
}: Props): ContestModuleHookReturnType => {
	const [userfiles, setUserfiles] = useState<UserFilesType>([]);
	const [serverErrors, setServerErrors] = useState<ErrorType>(undefined);
	const [loading, setLoading] = useState(false);
	const [likeProcess, setLikeProcess] = useState(false);
	const [pagesLoading, setPagesLoading] = useState(false);
	const [nextAllowedPage, setNextAllowedPage] = useState<string | null>(null);
	const [count, setCount] = useState<number>(0);

	const [uploadError, setUploadError] = useState<ErrorType>(undefined);
	const [uploadLoading, setUploadLoading] = useState<boolean>(false);
	const [uploadFile, setUploadFile] = useState<File | undefined>(undefined);
	const [uploadPreview, setUploadPreview] = useState<string | undefined>(
		undefined
	);

	const RequestConfigs: AxiosRequestConfig = {
		headers: { Authorization: `Token ${token}` },
	};
	const getPage = (str): string => str.split('=').pop().trim();

	const getRestPages = (page: string, inFiles: UserFilesType = userfiles) => {
		let restFiles = inFiles;
		const GetData = (page: string) => {
			GetUserfiles(contest, RequestConfigs, page)
				.then((res) => {
					restFiles = [...restFiles, ...res.data.results];
					if (res.data.next) {
						setUserfiles([...userfiles, ...restFiles]);
						setNextAllowedPage(getPage(res.data.next));
					} else {
						GetData(getPage(res.data.next));
						setNextAllowedPage(res.data.next);
					}
				})
				.catch(() => setUserfiles([...userfiles, ...restFiles]));
		};
		GetData(page);
	};
	const getFilesForTheNextPage = async () => {
		setPagesLoading(true);
		try {
			const { data } = await GetUserfiles(
				contest,
				RequestConfigs,
				nextAllowedPage
			);
			setUserfiles([...userfiles, ...data.results]);
			data.next
				? setNextAllowedPage(getPage(data.next))
				: setNextAllowedPage(data.next);
		} catch (error) {
			setServerErrors('ERROR');
		} finally {
			setPagesLoading(false);
		}
	};
	const getUserfiles = async () => {
		setLoading(true);
		try {
			const { data } = await GetUserfiles(contest, RequestConfigs);
			await setCount(data.count);
			await setUserfiles(data.results);
			if (loadAllFromStart && data.next !== null) {
				getRestPages(getPage(data.next), data.results);
			} else {
				data.next
					? setNextAllowedPage(getPage(data.next))
					: setNextAllowedPage(data.next);
			}
		} catch (error) {
			setServerErrors('ERROR');
		} finally {
			await setLoading(false);
		}
	};
	useEffect(() => {
		getUserfiles();
	}, []);

	const likeUserfile = async (uf: number) => {
		if (!likeProcess) {
			try {
				setLikeProcess(true);
				await PostLike(uf, RequestConfigs);
				let newUserfiles = await userfiles.map((f) =>
					f.id === uf
						? { ...f, likes: f.likes + 1, licked: !f.licked }
						: f
				);
				setUserfiles(newUserfiles);
			} catch (err) {
				if (err && err.response) {
					console.error(`Action error:`);
				} else {
					throw err;
				}
			} finally {
				setLikeProcess(false);
			}
		} else {
			return;
		}
	};
	const dislikeUserfile = async (uf: number) => {
		if (!likeProcess) {
			try {
				setLikeProcess(true);
				await DeleteLike(uf, RequestConfigs);
				let newUserfiles = await userfiles.map((f) =>
					f.id === uf
						? {
								...f,
								likes: f.likes - 1 < 0 ? 0 : f.likes - 1,
								licked: !f.licked,
						  }
						: f
				);
				setUserfiles(newUserfiles);
			} catch (err) {
				if (err && err.response) {
					console.error(`Action error:`);
				} else {
					throw err;
				}
			} finally {
				setLikeProcess(false);
			}
		} else {
			return;
		}
	};

	const sendUserfileToContest = async () => {
		setUploadLoading(true);
		try {
			const fileUploadData = new FormData();
			await fileUploadData.append('file', uploadFile);
			await fileUploadData.append('photo_contests', `${contest}`);
			await PostFile(fileUploadData, RequestConfigs);
		} catch (error) {
			setUploadError(error);
		} finally {
			await setUploadLoading(false);
		}
	};
	const handleUpload = async (f: File, p: string) => {
		setUploadLoading(true);
		await setUploadFile(f);
		await setUploadPreview(p);
		await setUploadLoading(false);
		sendImmediately && sendUserfileToContest();
	};

	return {
		userfiles,
		loading,
		serverErrors,
		onLikeUserfile: likeUserfile,
		onDislikeUserfile: dislikeUserfile,
		onUploadUserfileToContest: handleUpload,
		uploadError,
		uploadLoading,
		uploadFile,
		uploadPreview,
		setUploadError,
		onSendUserfileToContest: sendUserfileToContest,
		nextAllowedPage,
		getFilesForTheNextPage,
		pagesLoading,
		count,
	};
};

export default useContestModule;
