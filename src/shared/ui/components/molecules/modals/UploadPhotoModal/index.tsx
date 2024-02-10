import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { updateProfile } from '../../../../../../entities/modules/auth/api';
import { UserType } from '../../../../../../entities/modules/auth/types';
import { TOKEN_KEY } from '../../../../../lib/constants/global';
import storage from '../../../../../lib/utils/storage';
import SmallCrossIcon from '../../../atoms/Icons/SmallCrossIcon';
import PhotoInput from '../../Inputs/PhotoInput';
import css from './index.module.css';
import { ChangeAvatarInputs, ChangeAvatarValidationSchema } from './validation';

type Props = {
	isOpen: boolean;
	setOpen: (state: boolean) => void;
	userId: string;
	setAuth: (state: UserType) => void;
};

const ChangeAvatarModal = ({ isOpen, setOpen, userId, setAuth }: Props) => {
	const [submitting, setSubmitting] = useState<boolean>(false);

	const { handleSubmit, control, setValue, clearErrors, setError } = useForm({
		resolver: yupResolver(ChangeAvatarValidationSchema),
	});

	const closeModal = () => {
		setValue('avatar', null);
		setOpen(false);
		clearErrors('avatar');
	};

	const onSubmit = async (data: ChangeAvatarInputs) => {
		const formData = new FormData();
		formData.append('avatar', data?.avatar);
		try {
			setSubmitting(true);
			const { data } = await updateProfile(
				formData,
				userId,
				storage.get(TOKEN_KEY)
			);
			setAuth(data);
			closeModal();
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				setError('avatar', data[Object.keys(data)[0]]);
			}
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Modal
			open={isOpen}
			onClose={closeModal}
			showCloseIcon={false}
			center
			classNames={{
				modal: css['modal'],
			}}
		>
			<button type="button" className={css['close']} onClick={closeModal}>
				<SmallCrossIcon />
			</button>
			<h2 className={css['title']}>Изменение фото</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={css['form']}>
				<Controller
					control={control}
					name="avatar"
					defaultValue={null}
					render={({
						field: { onBlur, onChange },
						fieldState: { error },
					}) => (
						<PhotoInput
							accept="image/*"
							onBlur={onBlur}
							type="file"
							handleChange={(v) => onChange(v)}
							error={error}
							containerClass={css['avatar']}
							label="Загрузите в окно новое фото"
						/>
					)}
				/>
				<button
					disabled={submitting}
					type="submit"
					className={css['save']}
				>
					{submitting ? 'Сохранение...' : 'Сохранить'}
				</button>
				<button
					type="reset"
					onClick={closeModal}
					className={css['reset']}
				>
					Отменить
				</button>
			</form>
		</Modal>
	);
};

export default ChangeAvatarModal;
