export enum TrackEvent {
	Like = 'like',
}

type PlausibleArgs = [TrackEvent, () => void] | [TrackEvent];

declare global {
	const plausible: {
		(...args: PlausibleArgs): void;
		q?: PlausibleArgs[];
	};

	interface Window {
		plausible?: typeof plausible;
	}
}
