export type ChoiceType = {
	text: string;
	id: number;
	image?: null | string;
};

export type PollType = {
	id: number;
	title: string;
	description: string;
	choices: ChoiceType[];
	start_time: string;
	end_time: string;
	is_multiple: boolean;
	polling_delay: number;
	close_after_voting: boolean;
	voted_for: any[];
};

export type PollItemType = {
	id: number;
	title: string;
	is_active: string;
};

export type ActivePollsType = {
	count: number;
	next: null | number;
	previous: null | number;
	results: PollItemType[];
};

export type PollStatisticsType = {
	[key: string]: { number: number; percent: number };
};
