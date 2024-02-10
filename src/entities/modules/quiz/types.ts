export type QuizItemType = {
	id: number;
	name: string;
};
export type ActiveQuizTypes = {
	count: number;
	next: null | number;
	previous: null | number;
	results: QuizItemType[];
};

export type QuizAnswerType = {
	question_id: number;
	answer_id?: number;
	text?: string;
};
export type QuestionType = {
	question_id: number;
	text: string;
	kind: 'text' | 'choice';
	answers: QuizAnswerType[];
};
export type QuizType = {
	id: number;
	name: string;
	questions: QuestionType[];
	end_time: string;
};

export type ResultAnswersType = {
	question_id: number;
	kind: 'text' | 'choice';
	text: string | undefined;
	answer_id: number | undefined;
	cost: number | undefined;
};
export type QuizResultsType = {
	data: ResultAnswersType[];
};
