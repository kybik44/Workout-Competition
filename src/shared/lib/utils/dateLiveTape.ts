const dateLiveTape = (time: string): string => {
	return new Date(time).toLocaleString('ru-RU', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	});
};

export default dateLiveTape;
