import { MouseEventHandler, useEffect, useState } from 'react';
import BurgerButton from '../../atoms/BurgerButton';
import css from './index.module.css';

type Props = {
	onClick: MouseEventHandler<HTMLButtonElement>;
};

const HeaderMobile = ({ onClick }: Props) => {
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const onScroll = () => setOffset(window.pageYOffset);
		window.removeEventListener('scroll', onScroll);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header className={`${css['wrapper']} ${offset && css['opaque']}`}>
			<div className={`content ${css['inner']}`}>
				<img
					src="/images/commong/logo_1.png"
					alt="Logo"
					width={144}
					height={57}
					loading="lazy"
					className={css['logo']}
					srcSet="/images/common/logo_1.png 1x, /images/common/logo_1@2x.png 2x"
				/>
				<BurgerButton onClick={onClick} className={css['burger']} />
			</div>
		</header>
	);
};

export default HeaderMobile;
