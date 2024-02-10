import Link from 'next/link';
import React, { FC, MouseEventHandler } from 'react';
import { ROUTES } from '../../../../lib/constants/routes';
import useClickOutside from '../../../../lib/hooks/useClickOutside';
import useMedia from '../../../../lib/hooks/useMedia';
import CrossIcon from '../../atoms/Icons/CrossIcon';
import CrossMobIcon from '../../atoms/Icons/CrossMobIcon';
import css from './index.module.css';

type Props = {
	open: boolean;
	menuHandler: MouseEventHandler<HTMLButtonElement>;
	current: string;
};

const Menu: FC<Props> = ({ menuHandler, open, current }) => {
	const isMobile = useMedia('(max-width: 890px)');

	const clickRef = React.useRef();
	useClickOutside(clickRef, menuHandler);

	return (
		<>
			<div className={`${css['container']} ${open ? css['open'] : ''}`}>
				<button className={css['close-button']} onClick={menuHandler}>
					{isMobile ? <CrossMobIcon /> : <CrossIcon />}
				</button>

				<nav className={css['nav']}>
					<ul className={css['list']}>
						{ROUTES.map((link) => (
							<li className={`${css['list-item']}`} key={link.id}>
								<Link href={link.href}>
									<a
										className={`${css['link']} ${current === link?.href
												? css['active']
												: ''
											}`}
									>
										{link.title}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			{open && <div ref={clickRef} className={css['mask']}></div>}
		</>
	);
};

export default Menu;
