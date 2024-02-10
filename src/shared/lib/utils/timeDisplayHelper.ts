const timeDisplayHelper = (date: string) => {
	const hours = new Date(date).getHours().toString();
	const minute = new Date(date).getMinutes().toString();

	const hoursTwoSigns = hours.length === 1 ? `0${hours}` : hours;
	const minuteTwoSigns = minute.length === 1 ? `0${minute}` : minute;

	return `${hoursTwoSigns}:${minuteTwoSigns}`;
};

export default timeDisplayHelper;
