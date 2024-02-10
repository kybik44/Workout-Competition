import { ComponentProps, useState } from 'react';
import { UserType } from '../../../../../entities/modules/auth/types';
import ChangeAvatarModal from '../../molecules/modals/UploadPhotoModal';
import css from './index.module.css';

type Props = ComponentProps<'section'> & {
	user: UserType;
	setAuth: (state: UserType) => void;
	team: string;
	personal?: boolean;
};

const ProfileInfo = ({
	user,
	className,
	setAuth,
	team,
	personal,
	...props
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<section
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>
					{personal ? 'Личный кабинет' : 'Профиль участника'}
				</h2>
				<div className={css['info-wrapper']}>
					<img
						src={user?.avatar}
						alt="Avatar"
						width={483}
						height={332}
						loading="lazy"
						className={css['avatar']}
					/>
					<div className={css['info']}>
						<div>
							<h3 className={css['name']}>
								{user?.first_name} {user?.third_name}{' '}
								{user?.last_name}
							</h3>
							<div className={css['info-fields']}>
								{personal && (
									<div className={css['field']}>
										<p className={css['field-name']}>
											E-mail:
										</p>
										<p className={css['field-value']}>
											{user?.email}
										</p>
									</div>
								)}
								<div className={css['field']}>
									<p className={css['field-name']}>Город:</p>
									<p className={css['field-value']}>
										{user?.city}
									</p>
								</div>
								<div className={css['field']}>
									<p className={css['field-name']}>
										Подразделение:
									</p>
									<p className={css['field-value']}>{team}</p>
								</div>
							</div>
						</div>
						{personal && (
							<button
								onClick={() => setOpen(true)}
								type="button"
								className={css['change-avatar']}
							>
								Изменить фото
							</button>
						)}
					</div>
				</div>
			</div>
			<ChangeAvatarModal
				userId={user?.id}
				isOpen={open}
				setOpen={setOpen}
				setAuth={setAuth}
			/>
		</section>
	);
};

export default ProfileInfo;
