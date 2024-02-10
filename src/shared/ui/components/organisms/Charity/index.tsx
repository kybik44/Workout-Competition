import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { ComponentProps, useContext, useState } from 'react';
import Collapse from 'react-css-collapse';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { AuthContext } from '../../../../../entities/modules/auth';
import { CharityCount, CharityInfo } from '../../../../../entities/types';
import { donateCharity } from '../../../../api/charity';
import { SHOP_ACTIVE, TOKEN_KEY } from '../../../../lib/constants/global';
import storage from '../../../../lib/utils/storage';
import FieldErrorMessage from '../../atoms/FieldErrorMessage';
import ArrowIcon from '../../atoms/Icons/ArrowIcon';
import css from './index.module.css';
import { CharityInputs, CharityValidationSchema } from './validation';

type Props = ComponentProps<'section'> & {
	content: CharityInfo;
	count: CharityCount;
	userScore: number;
	disableForm?: boolean;
	totalPrice: number;
};

const Charity = ({
	content,
	className,
	count,
	userScore,
	disableForm,
	totalPrice,
	...props
}: Props) => {
	const [hide, setHide] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { auth, setAuth } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(CharityValidationSchema),
	});

	const onSubmit = async (data: CharityInputs) => {
		if (
			+userScore >= +data?.points_number &&
			totalPrice <= +userScore - +data?.points_number
		) {
			try {
				setSubmitting(true);
				setError(null);
				await donateCharity(data, storage.get(TOKEN_KEY));
				await setAuth({
					...auth,
					shop_score: userScore - data?.points_number,
				});
				count.total_amount += data.points_number;
				reset();
			} catch (error) {
				if (error && error.response) {
					const axiosError = error as AxiosError<any>;
					const data = axiosError.response.data;
					setError(data[Object.keys(data)[0]]);
				}
			} finally {
				setSubmitting(false);
			}
		} else {
			setError('Недостаточно баллов');
		}
	};

	return (
		<section className={`${css['wrapper']} ${className ? className : ''}`}>
			<div className={`content ${css['inner']}`}>
				<div className={css['head']}>
					<h2 className={css['title']}>Благотворительность</h2>
					<button
						className={css['hide-btn']}
						onClick={() => setHide(!hide)}
					>
						Свернуть блок{' '}
						<ArrowIcon
							style={{
								transform: `rotate(${hide ? 90 : -90}deg)`,
							}}
						/>
					</button>
				</div>
				<Collapse isOpen={!hide}>
					<div className={css['description-wrapper']}>
						<img
							src={content?.img}
							alt="Image"
							width={478}
							height={286}
							loading="lazy"
							className={css['description-image']}
						/>
						<div className={css['description']}>
							<h3 className={css['description-title']}>
								{content?.title}
							</h3>
							<ReactMarkdown className={css['description-text']}>
								{content?.text}
							</ReactMarkdown>
						</div>
					</div>
					{SHOP_ACTIVE !== 'disabled' && (
						<div className={css['charity-count']}>
							<div className={css['count-description']}>
								<p className={css['count-title']}>
									Уже собрано:
								</p>
								<span
									className={`${css['count']} ${disableForm ? css['full-width'] : ''
										}`}
								>
									{count?.total_amount
										? count?.total_amount
										: 0}
								</span>
							</div>
							{!disableForm && (
								<form
									className={css['charity-form']}
									onSubmit={handleSubmit(onSubmit)}
								>
									<div className={css['form-inner']}>
										<div className={css['field-wrapper']}>
											<p className={css['field-text']}>
												Я хочу отдать на
												благотворительность
											</p>
											<div
												className={
													css['input-container']
												}
											>
												<input
													{...register(
														'points_number'
													)}
													name="points_number"
													type="number"
													id="points_number"
													onScroll={(e) => {
														e.preventDefault();
														e.currentTarget.blur();
													}}
													onWheel={(e) => {
														e.preventDefault();
														e.currentTarget.blur();
													}}
												/>
												<label
													htmlFor="points_number"
													className={
														css['field-text']
													}
												>
													баллов
												</label>
												{errors['points_number'] && (
													<FieldErrorMessage
														msg={
															errors[
																'points_number'
															]?.message
														}
														className={css['error']}
													/>
												)}
											</div>
										</div>
										<button
											type="submit"
											className={css['send-btn']}
											disabled={submitting}
										>
											{!submitting
												? 'Отправить баллы'
												: 'Отправка...'}
										</button>
										{error && (
											<FieldErrorMessage
												className={css['server-error']}
												msg={error}
											/>
										)}
									</div>
								</form>
							)}
						</div>
					)}
				</Collapse>
			</div>
		</section>
	);
};

export default Charity;
