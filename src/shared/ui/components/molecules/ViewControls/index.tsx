import { FC } from 'react';
import RowPositionIcon from '../../atoms/Icons/RowPositionIcon';
import SquarePositionIcon from '../../atoms/Icons/SquarePositionIcon';
import css from './index.module.css';

type Props = {
	view: string;
	setView: (string) => void;
};

const LayoutButtons: FC<Props> = ({ view, setView }) => {
	return (
		<div className={css['layout']}>
			<button
				className={css['layout-button']}
				onClick={() => setView('grid')}
			>
				<SquarePositionIcon
					className={
						view === 'grid' ? css['active'] : css['disabled']
					}
				/>
			</button>
			<button
				className={css['layout-button']}
				onClick={() => setView('column')}
			>
				<RowPositionIcon
					className={
						view === 'column' ? css['active'] : css['disabled']
					}
				/>
			</button>
		</div>
	);
};

export default LayoutButtons;
