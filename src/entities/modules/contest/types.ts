export type ContestUserfileType = {
	id: number;
	likes: number;
	licked: boolean;
	file: string;
	thumbnail: string;
	photo_albums: number[];
	user: string;
	notes: string;
};

export type UserFilesType = ContestUserfileType[];

export type UserfilesResponseType = {
	count: number;
	results: UserFilesType;
	previous: null | string;
	next: null | string;
};
