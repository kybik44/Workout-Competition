import { TOKEN_KEY } from '../../../../shared/lib/constants/global';
import storage from '../../../../shared/lib/utils/storage';
import { useQuizModule } from '../hooks/useQuizModule';
import ChoiceAnswerField from './TextAnswerField';

const QuizModuleComponent = () => {
	const {
		quiz,
		isShow,
		clearQuiz,
		step,
		quizResponse,
		setCurrentAnswer,
		currentChoice,
		quizResults,
		addAnAnswer,
		onBack,
		onNext,
		toggleQuiz,
	} = useQuizModule({
		token: storage.get(TOKEN_KEY),
		initialInterval: 10000,
		deadLineInterval: 1000,
	});

	return (
		<section>
			{quiz ? (
				<button type="button" name="toggle" onClick={toggleQuiz}>
					{isShow ? 'hide' : 'show'}
				</button>
			) : null}
			{isShow && quiz ? (
				<div>
					<h3>
						Name:{quiz.name}
						<br />
						Id:{quiz.id}
						<br />
						EndTime: {quiz.end_time}
					</h3>
					<div>
						{quiz?.questions[step].kind === 'text' &&
						!quizResponse ? (
							<label htmlFor={quiz.questions[step].text}>
								{quiz.questions[step].text}
								<input
									type="text"
									name={quiz.questions[step].text}
									onChange={(e) =>
										setCurrentAnswer({
											question_id:
												quiz.questions[step]
													.question_id,
											text: e.target.value,
										})
									}
								/>
							</label>
						) : null}
						{quiz?.questions[step].kind === 'choice' &&
						!quizResponse ? (
							<>
								{quiz?.questions[step].answers?.map(
									(answer) => (
										<ChoiceAnswerField
											key={answer.answer_id}
											answer={answer}
											question_id={
												quiz.questions[step].question_id
											}
											quizResults={quizResults}
											step={step}
											setCurrentAnswer={setCurrentAnswer}
											currentChoice={currentChoice}
										/>
									)
								)}
							</>
						) : null}
						{quiz && isShow && !quizResponse ? (
							<div>
								<button
									onClick={addAnAnswer}
									disabled={currentChoice === undefined}
								>
									{step === quiz?.questions?.length - 1
										? 'Отправить результаты'
										: 'Отправить ответ'}
								</button>
								<button onClick={onBack} disabled={step === 0}>
									BACK
								</button>
								<button
									onClick={onNext}
									disabled={
										step === quiz?.questions?.length - 1
									}
								>
									NEXT
								</button>
							</div>
						) : null}
						{quizResponse ? (
							<button onClick={clearQuiz}>CLEAR QUIZ</button>
						) : null}
					</div>
				</div>
			) : null}
		</section>
	);
};

export default QuizModuleComponent;
