import { useEffect, useState } from 'react';

type Countdown = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

type UseCountdownHook = {
	isExpired: boolean;
	countdown: Countdown;
};

const getCountdown = (dateStr: string): [Countdown, number] => {
	const timeRemaining = Date.parse(dateStr) - Date.now();
	let countdown: Countdown = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	};

	if (timeRemaining > 0) {
		countdown = {
			days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
			hours: Math.floor((timeRemaining / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((timeRemaining / 1000 / 60) % 60),
			seconds: Math.floor((timeRemaining / 1000) % 60),
		};
	}

	return [countdown, timeRemaining];
};

export default function useCountdown(dateStr: string): UseCountdownHook {
	const [isExpired, setIsExpired] = useState(false);
	const [[countdown, timeRemaining], setCountdown] = useState(
		getCountdown(dateStr)
	);

	const startTimer = () => {
		const timer = setInterval(() => {
			setCountdown(getCountdown(dateStr));

			if (timeRemaining <= 0) {
				clearInterval(timer);
				setIsExpired(true);
			}
		}, 1000);

		return timer;
	};

	useEffect(() => {
		const timer = startTimer();
		return () => clearInterval(timer);
	}, [countdown, timeRemaining]);

	return { isExpired, countdown };
}
