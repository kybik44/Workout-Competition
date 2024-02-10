import { saveAs } from 'file-saver';
import { useState } from 'react';
import { ProfileResult } from '../../../../../entities/modules/auth/types';
import { generateImage } from '../../../../api/profile';
import {
	ACTIVITIES_ENABLED,
	TOKEN_KEY,
} from '../../../../lib/constants/global';
import storage from '../../../../lib/utils/storage';
import DownloadIcon from '../../atoms/Icons/DownloadIcon';
import EyeIcon from '../../atoms/Icons/EyeIcon';
import ActivityModal from '../../molecules/modals/ActivityModal';
import ResultsModal from '../../molecules/modals/ResultsModal';
import css from './index.module.css';

type Props = {
	results: ProfileResult[];
	isStravaConnected: boolean;
	personal?: boolean;
};

const ProfileResults = ({ results, isStravaConnected, personal }: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [resultsOpen, setResultsOpen] = useState<boolean>(false);
	const [resultsImage, setResultsImage] = useState<string>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

	const getTotalScore = (scores: number[]) => {
		let res = 0;
		scores?.forEach((n) => (res += n));
		return res?.toFixed(2);
	};

	const watchImage = async () => {
		try {
			setLoading(true);
			const { data } = await generateImage(storage.get(TOKEN_KEY));
			setResultsImage(data?.image);
			setResultsOpen(true);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const downloadImage = async () => {
		if (resultsImage) {
			saveAs(resultsImage, 'results.png');
		} else {
			try {
				setDownloadLoading(true);
				const { data } = await generateImage(storage.get(TOKEN_KEY));
				setResultsImage(data?.image);
				saveAs(data?.image, 'results.png');
			} catch (error) {
			} finally {
				setDownloadLoading(false);
			}
		}
	};

	return (
		<section className={`${css['wrapper']}`}>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>
					{personal ? 'Мои результаты' : 'Результаты'}
				</h2>
				<div className={css['info']}>
					<ul className={css['disciplines-list']}>
						{results?.map((res, idx) => (
							<li
								key={`${res?.discipline_name}${idx}`}
								className={css['discipline']}
							>
								<p className={css['discipline-name']}>
									{res?.discipline_name} (
									{res?.unit === 'min' ? 'мин' : 'км'})
								</p>
								<p className={css['discipline-score']}>
									{res?.total_value
										? +res?.total_value?.toFixed(2)
										: 0}
								</p>
							</li>
						))}
						<li className={css['total']}>
							<p className={css['total-title']}>
								Всего баллов
								<br />
								<span>(с учетом коэффициентов)</span>
							</p>
							<p className={css['total-score']}>
								{getTotalScore(
									results?.map((r) => r?.total_score)
								)}
							</p>
						</li>
					</ul>
					{personal && (
						<div>
							{ACTIVITIES_ENABLED === 'enabled' && (
								<button
									className={css['add-activity']}
									type="button"
									onClick={() => setOpen(true)}
								>
									Добавить результат
									<span>(ручной ввод данных)</span>
								</button>
							)}
							{ACTIVITIES_ENABLED === 'disabled' && (
								<>
									<button
										type="button"
										onClick={() => watchImage()}
										className={css['watch-results']}
										disabled={loading}
									>
										{!loading && (
											<>
												<EyeIcon /> Посмотреть
												результаты
											</>
										)}
										{loading && 'Загрузка...'}
									</button>
									<button
										className={css['download-results']}
										type="button"
										onClick={() => downloadImage()}
										disabled={downloadLoading}
									>
										{!downloadLoading && (
											<>
												<DownloadIcon /> Скачать
												результаты
											</>
										)}
										{loading && 'Загрузка...'}
									</button>
								</>
							)}
							{ACTIVITIES_ENABLED === 'enabled' ||
								(ACTIVITIES_ENABLED === 'disabled' && (
									<p className={css['contacts']}>
										Обратная связь по e-mail:{' '}
										<a
											href="mailto:WorkoutNow@gmail.com"
											target="_blank"
										>
											WorkoutNow@gmail.com
										</a>
									</p>
								))}
						</div>
					)}
				</div>
			</div>
			<ActivityModal isOpen={open} setOpen={setOpen} />
			<ResultsModal
				isOpen={resultsOpen}
				setOpen={setResultsOpen}
				image={resultsImage}
			/>
		</section>
	);
};

export default ProfileResults;
