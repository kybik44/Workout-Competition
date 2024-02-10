export const getMonthName = (date: string) => {
	const monthNames = [
		'Января',
		'Февраля',
		'Марта',
		'Апреля',
		'Мая',
		'Июня',
		'Июля',
		'Августа',
		'Сентября',
		'Октября',
		'Ноября',
		'Декабря',
	];

	return monthNames[new Date(date).getMonth()];
};
