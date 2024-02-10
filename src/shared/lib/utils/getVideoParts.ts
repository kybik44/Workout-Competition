import axios from 'axios';

export const getVideoParts = async (
	file: string | ArrayBuffer,
	size: number,
	urls: Record<number, string>
) => {
	const keys = Object.keys(urls);
	const promises = [];

	for (const indexStr of keys) {
		const index = parseInt(indexStr) - 1;
		const start = index * size;
		const end = (index + 1) * size;
		const blob =
			index + 1 < keys.length
				? file.slice(start, end)
				: file.slice(start);
		promises.push(axios.put(urls[index + 1], blob));
	}
	const resParts = await Promise.all(promises);

	return resParts.map((part, index) => ({
		ETag: (part as any).headers.etag.slice(1, -1),
		PartNumber: index + 1,
	}));
};
