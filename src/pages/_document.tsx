import Document, { Head, Html, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../shared/lib/utils/gtag';
import ym from '../shared/lib/utils/ym';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					{/* <link
						rel="shortcut icon"
						href="/any-favicon-filename-16x16px.png"
						type="image/png"
						sizes="16x16"
					/>
					<link
						rel="shortcut icon"
						href="/any-favicon-filename-32x32px.png"
						type="image/png"
						sizes="32x32"
					/>
					<link
						rel="shortcut icon"
						href="/any-favicon-filename-64x64px.png"
						type="image/png"
						sizes="64x64"
					/>
					<link
						rel="mask-icon"
						href="/favicon-64x64px.svg"
						color="#ff0000"
					></link> */}

					{/* Plausible */}
					{process.env.NODE_ENV === 'production' &&
					process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
						<script
							async
							defer
							data-domain={
								process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
							}
							src="https://plausible.io/js/plausible.js"
						></script>
					) : null}
					{process.env.NODE_ENV === 'production' &&
					process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
						<script
							dangerouslySetInnerHTML={{
								__html:
									'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }',
							}}
						/>
					) : null}

					{/* Google analytics */}
					{process.env.NEXT_PUBLIC_GTAG_ID &&
					process.env.NODE_ENV === 'production' ? (
						<script
							async
							src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
						/>
					) : null}
					{process.env.NEXT_PUBLIC_GTAG_ID &&
					process.env.NODE_ENV === 'production' ? (
						<script
							dangerouslySetInnerHTML={{
								__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
							}}
						/>
					) : null}
				</Head>
				<body>
					<Main />
					<NextScript />
					{/* Jivo */}
					{process.env.NODE_ENV === 'production' &&
					process.env.NEXT_PUBLIC_JIVO_ID ? (
						<script
							src={`//code.jivosite.com/widget/${process.env.NEXT_PUBLIC_JIVO_ID}`}
							async
						></script>
					) : null}
					{/* Yandex metrics */}
					{process.env.NODE_ENV === 'production' &&
					process.env.NEXT_PUBLIC_YM_ID ? (
						<div dangerouslySetInnerHTML={{ __html: ym() }} />
					) : null}
				</body>
			</Html>
		);
	}
}

export default MyDocument;
