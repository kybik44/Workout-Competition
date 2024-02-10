import React, { FC } from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

type Props = {
	imgUrl: string;
};

//all props for LazyLoad here https://www.npmjs.com/package/react-lazy-load-image-component

const MyImage: FC<Props> = ({ imgUrl }) => (
	<div>test</div>

	// <LazyLoadImage
	// 	alt="image"
	// 	height="200px"
	// 	width="200px"
	// 	src={imgUrl}
	// 	effect="blur"
	// />
);

export default MyImage;
