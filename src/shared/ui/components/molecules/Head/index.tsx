import { useState } from 'react';
import useMedia from '../../../../lib/hooks/useMedia';
import BurgerButton from '../../atoms/BurgerButton';
import LogoText from '../../atoms/LogoText';
import HeaderMobile from '../HeaderMobile';
import Menu from '../Menu';
import css from './index.module.css';

type Props = {
	isSmallHead: boolean;
	background?: 'run' | 'football' | 'bike';
	pathname: string;
};

const Head = ({ background, isSmallHead, pathname }: Props) => {
	const isMobile = useMedia('(max-width: 890px)');
	const [open, setOpen] = useState(false);
	const menuHandler = () => {
		setOpen(!open);
	};
	return (
		<>
			{isMobile && <HeaderMobile onClick={menuHandler} />}
			<section
				className={`
			${background === 'run'
						? css['wrapper-run']
						: background === 'football'
							? css['wrapper-football']
							: background === 'bike'
								? css['wrapper-bike']
								: css['wrapper']
					}`}
			>
				<div className={`content ${css['inner']}`}>
					<img
						src="/images/commong/logo_1.png"
						alt="Logo"
						width={266}
						height={105}
						loading="lazy"
						className={`${css['logo']} ${isSmallHead ? css['small'] : ''
							}`}
						srcSet="/images/common/logo_1.png 1x, /images/common/logo_1@2x.png 2x"
					/>
					<LogoText isSmallHead={isSmallHead} />
				</div>
			</section>
			{!isMobile && <BurgerButton onClick={menuHandler} />}
			<Menu current={pathname} open={open} menuHandler={menuHandler} />
		</>
	);
};

export default Head;
