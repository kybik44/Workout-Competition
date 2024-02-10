import { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { PickupPointData } from '../../../../../entities/modules/shop/types';
import useMedia from '../../../../lib/hooks/useMedia';
import ArrowIcon from '../../atoms/Icons/ArrowIcon';
import SelectInput from '../Inputs/SelectInput';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	points: PickupPointData[];
	content: string;
	onBack: () => void;
	setPoint: (state: number) => void;
	onSubmit: () => void;
	submitting: boolean;
};

const PickupPoint = ({
	points,
	className,
	content,
	onBack,
	setPoint,
	submitting,
	onSubmit,
	...props
}: Props) => {
	const isMobile = useMedia('(max-width: 820px)');
	const { control, handleSubmit } = useForm();
	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<form onSubmit={handleSubmit(onSubmit)} className={css['controls']}>
				<Controller
					control={control}
					name="pickup_point"
					rules={{
						required: 'Обязательное поле',
					}}
					render={({
						field: { onChange },
						fieldState: { error },
					}) => (
						<SelectInput
							title="Выберите пункт выдачи"
							items={points?.map((p) => {
								return {
									name: p?.address,
									value: p?.id,
								};
							})}
							onItemChange={(item) => {
								setPoint(item);
								onChange(item);
							}}
							error={error}
							label="Выберите пункт выдачи"
						/>
					)}
				/>

				<div className={css['navigate']}>
					<button
						type="button"
						className={css['back']}
						onClick={() => onBack()}
					>
						<ArrowIcon />
						Назад
					</button>
					{content && isMobile && (
						<ReactMarkdown className={css['info']}>
							{content}
						</ReactMarkdown>
					)}
					<button
						disabled={submitting}
						type="submit"
						className={css['send']}
					>
						{submitting ? 'Оформление...' : 'Оформить заказ'}
					</button>
				</div>
			</form>
			{content && !isMobile && (
				<ReactMarkdown className={css['info']}>{content}</ReactMarkdown>
			)}
		</div>
	);
};

export default PickupPoint;
