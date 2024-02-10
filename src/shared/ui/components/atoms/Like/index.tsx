import React, { ComponentProps } from 'react';
import useMedia from '../../../../lib/hooks/useMedia';
import LikeIcon from '../Icons/LikeIcon';
import css from './index.module.css';

type Props = ComponentProps<'button'> & {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	likes: number;
};

const Like = ({ className, onClick, likes, ...props }: Props) => {
	const isMobile = useMedia('(max-width: 768px)');
	return (
		<div className={css['likes']}>
			<button className={css['like']}>
				<LikeIcon />
			</button>
			<span className={css['count']}>{likes}</span>
		</div>
	);
};

export default Like;
