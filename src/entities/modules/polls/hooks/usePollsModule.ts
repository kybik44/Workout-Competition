import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import {
	GetActivePolls,
	GetPollById,
	GetResultsForPoll,
	PostVote,
} from '../api';
import { PollStatisticsType, PollType } from '../types';

export type hookReturn = {
	isShow: boolean;
	poll: PollType | undefined;
	pause: boolean;
	serverErrors: string;
	onSendPollData: (sd: any) => void;
	pollResults: PollStatisticsType;
	closePoll: () => void;
};

type Props = {
	token: string;
	useIntervalHook: (cb: () => void, delay: number) => void;
	closeWithAnError?: boolean;
	initialInterval?: number;
};

const usePollsModule = ({
	token,
	useIntervalHook,
	initialInterval = 10000,
}: Props): hookReturn => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [poll, setPoll] = useState<PollType | undefined>(undefined);
	const [pause, setPause] = useState<boolean>(false);
	const [serverErrors, setServerErrors] = useState<string>('');
	const [pollingInterval, setPollingInterval] = useState<number>(
		initialInterval
	);
	const [pollResults, setPollResults] = useState<
		PollStatisticsType | undefined
	>(undefined);

	const RequestConfigs: AxiosRequestConfig = {
		headers: { Authorization: `Token ${token}` },
	};

	const clearPollsState = () => {
		setIsShow(false);
		setPoll(undefined);
		setServerErrors(undefined);
		setPollResults(undefined);
		setPause(false);
	};

	const initiatePoll = async (id) => {
		const { data: poll } = await GetPollById({
			id,
			config: RequestConfigs,
		});

		if (poll.voted_for.length === 0) {
			await setPoll(poll);
			await setPollingInterval(poll.polling_delay * 1000);
			poll && setPause(true);
			poll?.id !== undefined && setIsShow(true);
		}
	};

	// TO-DO: Sort by time and set in a row
	const recursiveRequest = async () => {
		const { data } = await GetActivePolls(RequestConfigs);
		data.results &&
			data.results.length > 0 &&
			initiatePoll(data.results[0].id);
	};
	const handleRecuresiveRequest = () => {
		!pause && token && recursiveRequest();
	};
	useEffect(() => {
		handleRecuresiveRequest();
		return () => handleRecuresiveRequest();
	}, [token, pause]);
	useIntervalHook(() => {
		handleRecuresiveRequest();
	}, pollingInterval);

	const handlePollDeadline = () => {
		const calcHideTime = () => {
			let distance = poll?.end_time
				? new Date(poll.end_time).getTime() - new Date().getTime()
				: 0;

			distance <= 0 && clearPollsState();
		};

		poll?.end_time && calcHideTime();
	};
	useIntervalHook(() => {
		handlePollDeadline();
	}, 1000);

	const showResults = async (id: number) => {
		const { data } = await GetResultsForPoll(id, RequestConfigs);
		setPollResults(data);
	};

	const sendPollRequest = async (pollId, choiceId) => {
		try {
			const { data } = await PostVote({
				data: { poll: pollId, choice: choiceId },
				config: RequestConfigs,
			});
			data && !poll.close_after_voting
				? showResults(pollId)
				: clearPollsState();
		} catch (error) {
			setPause(false);
			setServerErrors('ERROR');
		}
	};

	const sendPollData = (sd) => {
		sendPollRequest(poll.id, sd.poll_radio);
	};

	return {
		isShow,
		poll,
		pause,
		serverErrors,
		onSendPollData: sendPollData,
		pollResults,
		closePoll: clearPollsState,
	};
};

export { usePollsModule };

