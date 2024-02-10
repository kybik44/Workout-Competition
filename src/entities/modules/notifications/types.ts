export type NotificationData = {
	id: number;
	title: string;
	text: string;
	start_at: string;
	end_at: string;
	type: 'Welcome' | 'Common' | 'Final';
	image: string;
};
