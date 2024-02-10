import { ComponentProps, useState } from 'react';
import { Achievement } from '../../../../../entities/types';
import AchievementModal from '../../molecules/modals/AchievementModal';
import css from './index.module.css';

type Props = ComponentProps<'section'> & {
	personal?: boolean;
	achievements?: Achievement[];
};

const Achievements = ({
	className,
	personal,
	achievements,
	...props
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [preview, setPreview] = useState<Achievement | null>(null);

	const onClose = () => {
		setOpen(false);
	};

	return (
		<section
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>
					{personal ? 'Мои достижения' : 'Достижения'}
					{personal && <span> (жми на ачивку - узнай условия)</span>}
				</h2>
				<div className={css['achievements']}>
					{achievements
						?.sort((a, b) => b?.id - a?.id)
						?.map((a, idx) => (
							<img
								src={
									a?.is_assigned
										? a?.image
										: a?.image_disabled
								}
								alt={a?.name}
								width={165}
								height={165}
								loading="lazy"
								className={`${css['achievement']}`}
								key={`${a?.id}${idx}`}
								onClick={() => {
									if (personal) {
										setPreview(a);
										setOpen(true);
									}
								}}
							/>
						))}
				</div>
			</div>
			<AchievementModal
				isOpen={open}
				onClose={onClose}
				achievement={preview}
			/>
		</section>
	);
};

export default Achievements;
