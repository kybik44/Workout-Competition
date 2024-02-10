import { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import { ChartId, ChartPeriod } from '../../../../../entities/types';
import { getChartData } from '../../../../api/statistics';
import { TOKEN_KEY } from '../../../../lib/constants/global';
import storage from '../../../../lib/utils/storage';
import ChartWrapper from '../ChartWrapper';
import CollapseWrapper from '../CollapseWrapper';
import css from './index.module.css';

const Graphs = () => {
	const [genderPieChart, setGenderPieChart] = useState(undefined);
	const [genderPeriod, setGenderPeriod] = useState<ChartPeriod>(365);
	const [ageChart, setAgeChart] = useState(undefined);
	const [agePeriod, setAgePeriod] = useState<ChartPeriod>(365);
	const [disciplineChart, setDisciplineChart] = useState(undefined);
	const [disciplinePeriod, setDisciplinePeriod] = useState<ChartPeriod>(365);
	const [cityActivityChart, setCityActivityChart] = useState(undefined);
	const [cityPeriod, setCityPeriod] = useState<ChartPeriod>(365);
	const [teamActivityChart, setTeamActivityChart] = useState(undefined);
	const [teamPeriod, setTeamPeriod] = useState<ChartPeriod>(365);
	const [error, setError] = useState(undefined);
	const [period, setPeriod] = useState<ChartPeriod>(365);

	const [currentChart, setCurrentChart] = useState<ChartId | null>(
		'teams_activity_chart'
	);

	const names = {
		age_chart: {
			value: ageChart,
			setter: setAgeChart,
			period: agePeriod,
			periodSet: setAgePeriod,
		},
		gender_chart: {
			value: genderPieChart,
			setter: setGenderPieChart,
			period: genderPeriod,
			periodSet: setGenderPeriod,
		},
		discipline_activity_chart: {
			value: disciplineChart,
			setter: setDisciplineChart,
			period: disciplinePeriod,
			periodSet: setDisciplinePeriod,
		},
		city_activity_chart: {
			value: cityActivityChart,
			setter: setCityActivityChart,
			period: cityPeriod,
			periodSet: setCityPeriod,
		},
		teams_activity_chart: {
			value: teamActivityChart,
			setter: setTeamActivityChart,
			period: teamPeriod,
			periodSet: setTeamPeriod,
		},
	};
	const handleChartGetting = async (
		name: ChartId,
		p: ChartPeriod = period
	) => {
		if (!names[name].value || p !== names[name].period) {
			try {
				const { data } = await getChartData(
					storage.get(TOKEN_KEY),
					name,
					p
				);
				if (data?.datasets) {
					names[name].setter(data);
					names[name].periodSet(p);
				}
			} catch (error) {
				setError('Ошибка загрузки');
			}
		}
	};

	const toggleGraph = (name: ChartId) => {
		if (name !== currentChart) {
			handleChartGetting(name);
			setCurrentChart(name);
		} else {
			setCurrentChart(undefined);
		}
	};

	useEffect(() => {
		handleChartGetting('teams_activity_chart', 365);
	}, []);

	const handleChangePeriod = (v) => {
		let vv = Number(v);
		if (vv === 1 || vv === 7 || vv === 365 || vv === 30) {
			setPeriod(vv);
			currentChart && handleChartGetting(currentChart, vv);
		}
	};

	const options = [
		{ value: 365, name: 'последний год' },
		{ value: 30, name: 'последние 30 дней' },
		{ value: 7, name: 'последние 7 дней' },
		{ value: 1, name: 'последний день' },
	];

	return (
		<div className={css['wrapper']}>
			<div className={css['period-wrapper']}>
				<span className={css['period-title']}>Статистика за</span>
				<Select
					options={options}
					values={options}
					valueField={'value'}
					labelField={'name'}
					onChange={(v) => handleChangePeriod(v[0].value)}
					className={css['select']}
					searchable={false}
				/>
			</div>
			<div className={css['graphs']}>
				<CollapseWrapper
					onClick={() => toggleGraph('teams_activity_chart')}
					title="График активности подразделений"
					isOpen={currentChart === 'teams_activity_chart'}
				>
					<ChartWrapper
						type="bar"
						data={teamActivityChart}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							plugins: {
								legend: {
									display: false,
								},
							},
							indexAxis: 'y',
						}}
					/>
				</CollapseWrapper>
				<CollapseWrapper
					onClick={() => toggleGraph('city_activity_chart')}
					title="ТОП Городов"
					isOpen={currentChart === 'city_activity_chart'}
				>
					<ChartWrapper
						type="bar"
						data={cityActivityChart}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							indexAxis: 'y',
							plugins: {
								legend: {
									display: false,
								},
							},
						}}
					/>
				</CollapseWrapper>
				<CollapseWrapper
					title="График активности дисциплин"
					isOpen={currentChart === 'discipline_activity_chart'}
					onClick={() => toggleGraph('discipline_activity_chart')}
				>
					<ChartWrapper
						type="bar"
						data={disciplineChart}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							indexAxis: 'y',
							plugins: {
								legend: {
									display: false,
								},
							},
						}}
					/>
				</CollapseWrapper>
				<CollapseWrapper
					onClick={() => toggleGraph('gender_chart')}
					title="Гендерный график"
					isOpen={currentChart === 'gender_chart'}
				>
					<ChartWrapper
						type="pie"
						data={genderPieChart}
						options={{
							maintainAspectRatio: false,
							plugins: {
								legend: {
									display: true,
									position: 'right',
								},
							},
						}}
					/>
				</CollapseWrapper>
				<CollapseWrapper
					onClick={() => toggleGraph('age_chart')}
					title="Возрастной график"
					isOpen={currentChart === 'age_chart'}
				>
					<ChartWrapper
						type="bar"
						data={ageChart}
						options={{
							responsive: true,
							maintainAspectRatio: false,

							plugins: {
								legend: {
									display: false,
								},
							},
						}}
					/>
				</CollapseWrapper>
			</div>
		</div>
	);
};

export default Graphs;
