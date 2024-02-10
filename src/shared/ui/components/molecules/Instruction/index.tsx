import { Step } from '../../../../../entities/types';
import AboutPageTitle from '../../atoms/AboutPageTitle';
import css from './index.module.css';

type Props = {
	instruction_steps: Step[];
};

const Instruction = ({ instruction_steps }: Props) => {
	return (
		<div className={css['wrapper']}>
			<AboutPageTitle className={css['title']}>
				Что тебе необходимо делать
			</AboutPageTitle>

			<div className={css['steps']}>
				{instruction_steps.map(({ image, title, description }, idx) => (
					<div className={css['step']} key={idx}>
						<div className={css['img']}>
							<img
								alt="Thumbnail"
								src={image.url}
								width="72"
								height="72"
								loading="lazy"
								className={`${css['thumbnail']} `}
							/>
						</div>
						<div className={css['info']}>
							<h5 className={css['step-title']}>{title}</h5>
							<p className={css['text']}>{description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Instruction;
