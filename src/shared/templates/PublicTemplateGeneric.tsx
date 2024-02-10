import Head from 'next/head';
import React from 'react';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import useZoom from '../lib/hooks/useZoom';

const CookiePopUp = dynamic(
	() => import('../../entities/modules/cookie/components')
);

interface Props {
	title: string;
	description?: string;
	children: React.ReactChild | React.ReactNode;
}
const PublicTemplateGeneric: FC<Props> = ({ title, description, children }) => {
	useZoom(0.85);
	return (
		<>
			<Head>
				{title && <title>{title}</title>}
				{description && (
					<meta
						key="description"
						content={description}
						name="description"
					/>
				)}
			</Head>
			{children}
			<CookiePopUp />
			{/* any services here */}
		</>
	);
};

export default PublicTemplateGeneric;
