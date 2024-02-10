import { ComponentProps } from 'react';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	totalScore: number;
	currentScore: number;
	sendCharityHandler: () => void;
};

const BasketHead = ({
	totalScore,
	currentScore,
	sendCharityHandler,
	className,
	...props
}: Props) => {
	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={css['score-info']}>
				<p>
					Остаток: <span>{currentScore}</span> баллов.
				</p>
				<p>Всего: {totalScore} баллов.</p>
			</div>
			<button
				type="button"
				onClick={() => sendCharityHandler()}
				className={css['send-btn']}
			>
				Отправить оставшиеся баллы на благотворительность
			</button>
		</div>
	);
};

export default BasketHead;
