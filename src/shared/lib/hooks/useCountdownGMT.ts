import { useEffect, useState } from 'react';

interface useTimerHook {
	isExpired: boolean;
	countTo: Date;
}

const formatDate = (date: Date, gmt: number): number => {
	const offset = date.getTimezoneOffset() * 60000 + gmt * 60 * 60000;
	return (
		Date.UTC(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			date.getUTCHours(),
			date.getUTCMinutes(),
			date.getUTCSeconds()
		) + offset
	);
};

export default function useTimer(deadline: Date, gmt = 0): useTimerHook {
	const [isExpired, setIsExpired] = useState(false);

	useEffect(() => {
		const timer = startTimer(deadline, gmt);
		return () => clearInterval(timer);
	}, [deadline, gmt]);

	const startTimer = (deadline, gmt) => {
		let start = new Date(formatDate(new Date(), gmt));
		const end = new Date(formatDate(deadline, gmt));

		const timer = setInterval(() => {
			start = new Date(formatDate(new Date(), gmt));
			setIsExpired(() => {
				if (start >= end) {
					clearInterval(timer);
					return true;
				}
			});
		}, 1000);

		return timer;
	};

	return { isExpired, countTo: new Date(formatDate(deadline, gmt)) };
}
