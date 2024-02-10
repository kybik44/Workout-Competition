import { FC } from 'react';
import css from './index.module.css';

type Props = {
	setSection: (string) => void;
	section: string;
};

const AboutNav: FC<Props> = ({ setSection, section }: Props) => {
	const routes = [
		{
			id: 1,
			title: 'Общее',
			href: 'marathon',
		},
		{
			id: 4,
			title: 'Правила добавления результата',
			href: 'about',
		},
		{
			id: 2,
			title: 'Как начисляются баллы',
			href: 'scores',
		},

		{
			id: 3,
			title: 'Челленджи',
			href: 'challenges',
		},
	];

	return (
		<>
			<nav className={css['nav']}>
				<ul className={css['list']}>
					{routes.map(({ id, title, href }) => (
						<li className={css['list-item']} key={id}>
							<button
								className={`${css['nav-link']} ${section === href ? css['active-link'] : ''
									}`}
								onClick={() => setSection(href)}
							>
								{title}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default AboutNav;
