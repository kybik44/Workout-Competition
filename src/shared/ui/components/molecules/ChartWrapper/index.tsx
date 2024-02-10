import { ComponentProps } from 'react';

type Props = ComponentProps<'div'> & {
	data: any;
	type: 'bar' | 'pie';
	options: any;
};

const ChartWrapper = ({ data, type, options, ...props }: Props) => {
	const dc = {
		datasets: [],
		labels: [],
	};

	return (
		<div {...props}>
			<iframe
				srcDoc={`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Chart</title>
                    </head>
                    <body style="margin: 0; height: 100vh;">
                        <canvas id="myChart" style="width: 100%; height: 100%;"></canvas>
                        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                        <script>
                            const ctx = document.getElementById('myChart');
                            const chart = new Chart(ctx, {
                                type: '${type}',
                                data: ${JSON.stringify(data, null, 2) ||
					JSON.stringify(dc, null, 2)
					},
                                options: ${JSON.stringify(options, null, 2)}
                            })
                        </script>
                    </body>
                </html>
                `}
				style={{
					width: '100%',
					height: '500px',
					border: 'none',
					background: 'transparent',
				}}
			></iframe>
		</div>
	);
};

export default ChartWrapper;
