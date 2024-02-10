import { bool, boolean, string } from 'yup';

export type Team = {
	id: number;
	name: string;
};

export type Discipline = {
	id: number;
	name: string;
	multiplier: number;
	unit: 'km' | 'min';
};

export type WorkoutData = {
	id: number;
	title: string;
	date: string;
	place: string;
	details: string;
	participation: boolean;
	discipline_id: string;
	image: string;
	is_active: boolean;
	are_places: boolean;
};

export type Achievement = {
	id: number;
	name: string;
	condition: string;
	description: string;
	period: string;
	image: string;
	image_disabled: string;
	is_assigned: boolean;
};

export type ChallengeData = {
	id: number;
	participation: boolean;
	progress: number;
	title: string;
	details: string;
	short_details: string;
	start_time: string;
	end_time: string;
	reward: number;
	image: string;
	condition_type: string;
	condition_unit: 'km' | 'min';
	condition: number;
};

export type ActivityData = {
	id: number;
	name: string;
	value: number;
	score: number;
	created_at: string;
};

export type ActivitiesResponse = {
	count: number;
	next: string;
	previous: string;
	results: ActivityData[];
};

export type NewsPageContent = {
	pages: number;
	news: NewsContent[];
};

export type NewsContent = {
	id: number;
	title: string;
	subtitle: string;
	description: string;
	date: string;
	image: {
		url: string;
	};
};

export type ChartPeriod = 1 | 7 | 30 | 365;

export type ChartId =
	| 'age_chart'
	| 'gender_chart'
	| 'discipline_activity_chart'
	| 'city_activity_chart'
	| 'teams_activity_chart';

export type LeadersPeriod = {
	id: number;
	title: string;
	start_at: string;
	end_at: string;
};

export type ResultRulesContent = {
	automatically: string;
	manual: string;
	warning: {
		title: string;
		description: string;
		message: string;
		example: {
			url: string;
		};
	};
	activities: ActivityAboutData[];
};

export type Step = {
	title: string;
	description: string;
	image: {
		url: string;
	};
};

export type NewSeasonStep = {
	title: string;
	description: string;
	number: number;
};

export type AboutInfoContent = {
	title: string;
	description: string;
	new_season: string;
	new_season_step: NewSeasonStep[];
	new_season_description: string;
	instruction_title: string;
	instruction_step: Step[];
	period_title: string;
	period_description: string;
};

export type ActivityAboutData = {
	id: number;
	new: boolean;
	title: string;
	updates: string;
	activity_description: ActivityDescriptiontData[];
};

export type ActivityDescriptiontData = {
	description: string;
	images: {
		url: string;
	}[];
	dark_background: boolean;
};

export type AboutScoreContent = {
	title: string;
	description: string;
	image: {
		url: string;
	};
	mobile_image: {
		url: string;
	};
};

export type StatisticsActivity = {
	profile_id: string;
	avatar: string;
	full_name: string;
	city: string;
	team: string;
	discipline: number;
	value: number;
	score: number;
	created_at: string;
	likes: number;
	is_liked: boolean;
};

export type CharityInfo = {
	img: string;
	text: string;
	title: string;
};

export type CharityCount = {
	total_amount: number;
};

export type ShopPageContent = {
	shopPage: {
		description: string;
		info: string;
		message_title: string;
		order_message: string;
	};
};

export type BasketPageContent = {
	basketPage: {
		items_message: string;
		pickup_point_message: string;
	};
};

export type ResultImageData = {
	has_seen: boolean;
	id: number;
	image: string;
	profile_id: string;
};
