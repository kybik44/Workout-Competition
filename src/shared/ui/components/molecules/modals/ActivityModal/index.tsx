import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { sendActivities } from '../../../../../api/profile';
import { ActivityInfo } from '../../../../../lib/constants/activitites';
import { TOKEN_KEY } from '../../../../../lib/constants/global';
import storage from '../../../../../lib/utils/storage';
import ArrowIcon from '../../../atoms/Icons/ArrowIcon';
import SmallCrossIcon from '../../../atoms/Icons/SmallCrossIcon';
import ServerErrorMessage from '../../../atoms/ServerError';
import ActivityRules from './components/ActivityRules';
import ActivityValue, { ActivityValueData } from './components/ActivityValue';
import MediaUpload, { ActivityPhoto } from './components/MediaUpload';
import SelectingActivity from './components/SelectingActivity';
import css from './index.module.css';

type Props = {
	isOpen: boolean;
	setOpen: (state: boolean) => void;
};

const steps = ['type', 'rules', 'value', 'media', 'success'];

const ActivityModal = ({ isOpen, setOpen }: Props) => {
	const [step, setStep] = useState<number>(0);
	const [activityType, setActivityType] = useState<ActivityInfo | null>(null);
	const [values, setValues] = useState<ActivityValueData[]>(null);
	const [valueError, setValueError] = useState<string | null>(null);
	const [photos, setPhotos] = useState<ActivityPhoto[] | null>(null);
	const [video, setVideo] = useState<string | null>(null);
	const [tooltip, setTooltip] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const onClose = () => {
		setOpen(false);
		setValues(null);
		setVideo(null);
		setPhotos(null);
		setValueError(null);
		setStep(0);
		setActivityType(null);
	};

	const onNext = () => {
		setValueError(null);
		setServerError(null);
		if (steps[step] === 'type' && !activityType) {
			setServerError('Выберите тип активности');
		} else if (
			steps[step] === 'value' &&
			values &&
			values?.filter((f) => f?.required)?.length >
			activityType?.values?.filter((v) => v?.required)?.length
		) {
			setStep(step + 1);
		} else if (
			steps[step] === 'value' &&
			(!values ||
				values?.filter((f) => f?.required)?.length <
				activityType?.values?.filter((v) => v?.required)?.length)
		) {
			setValueError('Введите значение');
		} else {
			setStep(step + 1);
		}
	};

	const onBack = () => {
		setValueError(null);
		if (steps[step] === 'value') {
			setValues(null);
			setStep(step - 1);
		} else if (steps[step] === 'media') {
			setPhotos(null);
			setVideo(null);
			setStep(step - 1);
		} else {
			setStep(step - 1);
		}
	};

	const handleStepClick = (type: 'next' | 'prev') => {
		type === 'next' && step <= 2 && onNext();
		type === 'prev' && step > 0 && onBack();
	};

	const sendData = async () => {
		const formData = new FormData();
		formData.append('discipline', activityType?.id?.toString());
		values?.forEach((v) =>
			v?.main
				? formData.append('value', v?.value)
				: formData?.append(v?.name, v?.value)
		);
		photos &&
			photos.length != 0 &&
			photos.forEach((el) => {
				formData.append('photo', el?.photo);
			});
		video && formData.append('video_url', video);
		try {
			setServerError(null);
			setSubmitting(true);
			await sendActivities(formData, storage.get(TOKEN_KEY));
			await onNext();
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				setServerError(data[Object.keys(data)[0]]);
			} else {
				setServerError('Что-то пошло не так. Попробуйте еще раз');
			}
		} finally {
			setSubmitting(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		values && (photos || video) && sendData();
	};

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			center
			showCloseIcon={false}
			classNames={{
				modal: css['modal'],
			}}
		>
			<button type="button" onClick={onClose} className={css['close']}>
				<SmallCrossIcon />
			</button>
			<div className={css['indicators']}>
				<div
					className={`${css['indicator']} ${step === 0
							? css['active']
							: step > 0
								? css['completed']
								: ''
						}`}
				></div>
				<div
					className={`${css['indicator']} ${step === 1
							? css['active']
							: step > 1
								? css['completed']
								: ''
						}`}
				></div>
				<div
					className={`${css['indicator']} ${step === 2
							? css['active']
							: step > 2
								? css['completed']
								: ''
						}`}
				></div>
				<div
					className={`${css['indicator']} ${step === 3
							? css['active']
							: step > 3
								? css['completed']
								: ''
						}`}
				></div>
			</div>
			<div className={css['inner']}>
				<div className={css['head']}>
					{steps[step] !== 'success' && (
						<p className={css['steps']}>
							Шаг {step + 1 !== 4 ? step + 1 : 4}/4
						</p>
					)}
					<h2 className={css['title']}>
						{steps[step] !== 'success'
							? 'Добавление результата'
							: 'Ваш результат принят!'}
					</h2>
					<p className={css['date']}>
						{new Date().toLocaleDateString('ru-RU')}
					</p>
				</div>
				<form onSubmit={(e) => handleSubmit(e)}>
					{steps[step] === 'type' && (
						<SelectingActivity
							currentType={activityType}
							setType={setActivityType}
							className={css['step']}
						/>
					)}
					{steps[step] === 'value' && (
						<ActivityValue
							setValues={setValues}
							currentType={activityType}
							values={values}
							className={css['step']}
							error={valueError}
						/>
					)}
					{steps[step] === 'rules' && (
						<ActivityRules
							className={css['step']}
							rules={activityType?.rules}
						/>
					)}
					{steps[step] === 'media' && (
						<MediaUpload
							setVideo={setVideo}
							setPhotos={setPhotos}
							video={video}
							photos={photos}
							className={css['step']}
							info={activityType}
						/>
					)}
					{steps[step] === 'success' && (
						<p className={css['success-message']}>
							В течение какого-то времени результат будет отражен
							в вашем личном кабинете в таблице “Мои результаты”.
						</p>
					)}
					<div className={css['controls']}>
						{step > 0 && steps[step] !== 'success' && (
							<button
								type="button"
								onClick={() => handleStepClick('prev')}
								className={css['prev-button']}
							>
								<ArrowIcon /> Назад
							</button>
						)}
						{step < steps?.length - 2 && (
							<button
								type="button"
								onClick={() => handleStepClick('next')}
								className={css['next-button']}
								disabled={step === 1 && !activityType}
							>
								Далее <ArrowIcon className={css['next-icon']} />
							</button>
						)}
						{steps[step] === 'media' && (
							<div className={css['submit-wrapper']}>
								{tooltip && (
									<div className={`${css['tooltip']}`}>
										<p className={css['tooltip-message']}>
											Вы не можете загрузить результаты
											тренировки, пока не добавите фото и
											(или) видео.
										</p>
									</div>
								)}
								<button
									type="submit"
									className={`${css['submit-button']}`}
									disabled={submitting}
									onMouseOver={() =>
										!photos && !video && setTooltip(true)
									}
									onMouseLeave={() => setTooltip(false)}
								>
									{submitting
										? 'Отправка...'
										: 'Добавить результат'}
								</button>
							</div>
						)}
						{steps[step] === 'success' && (
							<button
								type="button"
								onClick={onClose}
								className={css['success-button']}
							>
								Понятно
							</button>
						)}
					</div>
				</form>
				{serverError && (
					<ServerErrorMessage
						msg={serverError}
						className={css['error']}
					/>
				)}
			</div>
		</Modal>
	);
};

export default ActivityModal;
