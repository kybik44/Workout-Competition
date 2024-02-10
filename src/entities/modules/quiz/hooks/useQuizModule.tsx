import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import { GetActiveQuizs, GetQuizById, PostQuiz } from '../api';
import { QuizAnswerType, QuizType } from '../types';

import useInterval from '../../../../shared/lib/hooks/useInterval';

export type quizModuleHookReturn = {
	isShow: boolean;
	quiz: QuizType;
	serverErrors: string;
	onSendPollData?: (sd: any) => void;
	step: number;
	addAnAnswer: () => void;
	setCurrentAnswer: (obj: QuizAnswerType) => void;
	onBack: () => void;
	onNext: () => void;
	currentChoice: QuizAnswerType;
	quizResults: QuizAnswerType[];
	quizResponse: any;
	clearQuiz: () => void;
	toggleQuiz: () => void;
	countdown: string;
};

type Props = {
	token: string;
	initialInterval?: number;
	deadLineInterval?: number | null;
};

const useQuizModule = ({
	token,
	initialInterval = 10000,
	deadLineInterval = null,
}: Props): quizModuleHookReturn => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [pause, setPause] = useState<boolean>(false);

	const [quiz, setQuiz] = useState<QuizType>(undefined);
	const [serverErrors, setServerErrors] = useState<string>(undefined);

	const [currentChoice, setCurrentChoice] = useState<QuizAnswerType>(
		undefined
	);
	const [quizResults, setQuizResults] = useState<QuizAnswerType[]>([]);
	const [step, setStep] = useState<number>(0);
	const [countdown, setCountdown] = useState<string>(undefined);

	const [quizResponse, setQuizResponse] = useState(undefined);

	// STATE CONTROLS:
	const onBack = () => {
		setCurrentChoice(undefined);
		step !== 0 && setStep(step - 1);
	};
	const onNext = () => {
		setCurrentChoice(undefined);
		step !== quiz.questions.length &&
			quizResults.length >= step + 1 &&
			setStep(step + 1);
	};
	const clearQuiz = () => {
		setCountdown(undefined);
		setQuizResponse(undefined);
		setIsShow(false);
		setPause(false);
		setQuiz(undefined);
		setQuizResults([]);
	};
	const toggleQuiz = () => setIsShow(!isShow);

	const RequestConfigs: AxiosRequestConfig = {
		headers: { Authorization: `Token ${token}` },
	};

	const initiateQuiz = async (id) => {
		const { data: quiz } = await GetQuizById(id, RequestConfigs);
		setQuiz(quiz);
		setStep(0);
		quiz && setPause(true);
		quiz?.id !== undefined && setIsShow(true);
	};

	const recursiveRequest = async () => {
		const { data } = await GetActiveQuizs(RequestConfigs);
		data?.results?.length > 0 && initiateQuiz(data?.results[0]?.id);
	};
	const handleRecursiveRequest = () => {
		!pause && token && recursiveRequest();
	};
	useEffect(() => {
		handleRecursiveRequest();
		return () => {
			handleRecursiveRequest();
		};
	}, [token]);
	useInterval(() => {
		handleRecursiveRequest();
	}, initialInterval);

	const handleQuizDeadline = () => {
		const calcHideTime = () => {
			let distance = quiz?.end_time
				? new Date(quiz.end_time).getTime() - new Date().getTime()
				: 0;

			distance <= 0 && clearQuiz();
		};

		quiz?.end_time && calcHideTime();
	};
	useInterval(() => {
		handleQuizDeadline();
	}, deadLineInterval);

	const setCurrentAnswer = ({
		question_id,
		answer_id,
		text,
	}: QuizAnswerType) => {
		setCurrentChoice({ question_id, answer_id, text });
	};

	const addAnAnswer = () => {
		const newResults = quizResults;
		const targetIdx = newResults.findIndex(
			(i) => i.question_id === currentChoice.question_id
		);
		if (targetIdx !== -1) {
			newResults[targetIdx].answer_id = currentChoice.answer_id;
		} else {
			newResults.push(currentChoice);
		}
		setQuizResults(newResults);
		setCurrentChoice(undefined);
		step !== quiz.questions.length - 1 ? setStep(step + 1) : sendQuizData();
	};

	const sendQuizData = () => {
		const sendQuiz = async () => {
			try {
				const { data } = await PostQuiz({
					data: {
						quiz_id: quiz.id,
						answers: quizResults,
					},
					config: RequestConfigs,
				});
				setQuizResponse(data.data);
			} catch (error) {
				setServerErrors('ERROR');
			}
		};

		sendQuiz();
	};

	return {
		isShow,
		quiz,
		serverErrors,
		step,
		onBack,
		onNext,
		addAnAnswer,
		setCurrentAnswer,
		currentChoice,
		quizResults,
		quizResponse,
		clearQuiz,
		countdown,
		toggleQuiz,
	};
};

export { useQuizModule };

