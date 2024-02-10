import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CookiePopUp = dynamic(
	() => import('../../entities/modules/cookie/components')
);
import { AuthContext } from '../../entities/modules/auth';
import useZoom from '../lib/hooks/useZoom';

interface Props {
	title: string;
	description?: string;
	children: React.ReactChild | React.ReactNode;
}
const PrivateTemplateGeneric = ({ title, description, children }: Props) => {
	const { auth, loading } = useContext(AuthContext);
	useZoom(0.8);

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
				<meta
					name="viewport"
					content="initial-scale=0.8, user-scalable=no"
				/>
			</Head>
			{!auth && !loading && null}
			{auth && !loading && <>{children}</>}
			{loading && (
				<div
					style={{
						width: '100vw',
						height: '100vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: 'auto',
					}}
				>
					Загрузка...
				</div>
			)}

			<CookiePopUp />
		</>
	);
};

export default PrivateTemplateGeneric;
