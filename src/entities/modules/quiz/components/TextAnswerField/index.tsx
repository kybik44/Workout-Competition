import { FC } from 'react';
import { QuizAnswerType } from '../../types';

type Props = {
	question_id: number;
	answer: QuizAnswerType;
	setCurrentAnswer: (o: QuizAnswerType) => void;
	currentChoice: QuizAnswerType;
	quizResults: QuizAnswerType[];
	step: number;
};

const ChoiceAnswerField: FC<Props> = ({
	currentChoice,
	answer: { answer_id, text },
	setCurrentAnswer,
	quizResults,
	step,
	question_id,
}) => {
	return (
		<div
			style={{
				cursor: 'pointer',
				color:
					currentChoice?.answer_id === answer_id
						? 'orange'
						: !currentChoice?.answer_id &&
						  quizResults[step]?.answer_id === answer_id
						? 'orange'
						: 'black',
			}}
			onClick={() =>
				setCurrentAnswer({
					question_id,
					answer_id,
				})
			}
		>
			{text}
		</div>
	);
};

export default ChoiceAnswerField;
