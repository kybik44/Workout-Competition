import { useState } from 'react';
import css from './index.module.css';

import Link from 'next/link';
import { DataItem } from '../..';
import BagIcon from '../../../../../shared/ui/components/atoms/Icons/BagIcon';
import PinIcon from '../../../../../shared/ui/components/atoms/Icons/PinIcon';
import LikeComponent from '../../../contest/components/LikeComponent';

type Props = {
	likes?: boolean;
	achievements?: boolean;
	data: DataItem;
	profileLink?: boolean;
	handleLike?: (id: string, liked: boolean) => void;
};

const ProfileCell = ({
	achievements,
	likes,
	data,
	profileLink,
	handleLike,
}: Props) => {
	const [preview, setPreview] = useState<boolean>(false);

	return (
		<div className={css['wrapper']}>
			<div className={css['inner']}>
				<div className={css['profile']}>
					<img
						src={data?.avatar}
						alt="Avatar"
						className={css['avatar']}
						width={46}
						height={46}
						onClick={() => setPreview(!preview)}
					/>
					{likes && (
						<div className={css['like']}>
							<LikeComponent
								likeId={data?.id}
								className={css['like-icon']}
								handleClick={() =>
									handleLike(data?.profile_id, data?.is_liked)
								}
								liked={data?.is_liked}
							/>
							<span>{data?.likes}</span>
						</div>
					)}
				</div>
				<div className={css['info']}>
					{!profileLink && (
						<h3 className={css['name']}>{data?.full_name}</h3>
					)}
					{profileLink && (
						<Link href={`/profile/${data?.id}`}>
							<a className={css['name']} target="_blank">
								{data?.full_name}
							</a>
						</Link>
					)}
					<div className={css['info-fields']}>
						<p className={css['field']}>
							<PinIcon /> {data?.city}
						</p>
						<p className={css['field']}>
							<BagIcon /> {data?.team}
						</p>
					</div>
				</div>
			</div>
			{achievements && data?.achievements && (
				<div className={css['achievements']}>
					{data?.achievements
						?.filter((a) => a?.is_assigned)
						?.map((a, idx) => (
							<img
								src={a?.image}
								alt={a?.name}
								width={36}
								height={36}
								key={`${a?.name}${idx}`}
								style={{
									left: `${idx * 24}px`,
									zIndex: idx,
								}}
							/>
						))}
				</div>
			)}
			{preview && (
				<img
					src={data?.avatar}
					alt="Avatar"
					className={css['preview']}
					onClick={() => setPreview(false)}
				/>
			)}
		</div>
	);
};

export default ProfileCell;
