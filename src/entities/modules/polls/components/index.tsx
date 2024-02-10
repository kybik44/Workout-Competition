import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './index.module.css';

import { PollStatisticsType, PollType } from '../types';
import PollsInput from './PollsInput';

type Props = {
	isShow: boolean;
	poll: PollType;
	sendPollData: (sd: any) => void;
	results: PollStatisticsType;
	onClosePoll: () => void;
};

const PollsComponent: FC<Props> = ({
	isShow,
	poll,
	sendPollData,
	results,
	onClosePoll,
}): JSX.Element => {
	const { register, handleSubmit } = useForm();

	return (
		<div className={styles['polls_video_wrap']}>
			<div
				className={
					isShow
						? `${styles['polls_polls_wrap']} ${styles['polls_show_polls']}`
						: `${styles['polls_polls_wrap']} ${styles['polls_close_polls']}`
				}
			>
				<span className={styles['poll_title']}>
					{poll?.description}
				</span>
				{poll ? (
					<form
						className={styles['poll_options_grid']}
						onSubmit={handleSubmit(sendPollData)}
					>
						{poll?.choices?.map((c) => (
							<label
								className={styles['poll_option']}
								key={c.id}
							>
								<span>{c.text}</span>
								<PollsInput
									type="radio"
									name="poll_radio"
									value={c.id}
									required
									register={register('poll_radio')}
								/>
							</label>
						))}
						<button type="submit">Голосовать</button>
					</form>
				) : null}
				{results
					? Object.keys(results).map((key) => (
							<p key={key}>
								<span>{key}</span> --{' '}
								<span>{results[key].percent}%</span>
							</p>
					  ))
					: null}
				{results ? (
					<button
						type="button"
						name="Close poll"
						onClick={onClosePoll}
					>
						Close the poll
					</button>
				) : null}
			</div>
		</div>
	);
};

export default PollsComponent;
