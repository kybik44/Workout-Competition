import { useEffect } from 'react';

const useZoom = (minZoom: number) => {
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			typeof document !== 'undefined' &&
			document.documentElement
		) {
			const root = document.documentElement;

			const setZoom = (zoom: number) => {
				root.style.setProperty('zoom', `${zoom}`);
			};

			const calculateZoom = () => {
				const { clientWidth } = root;
				const width = 1920;
				const tabletWidth = 1024;
				const min = minZoom;

				if (
					clientWidth < width &&
					clientWidth > tabletWidth &&
					clientWidth / width >= min
				) {
					setZoom(clientWidth / width);
				} else if (
					clientWidth < width &&
					clientWidth > tabletWidth &&
					clientWidth / width <= min
				) {
					setZoom(min);
				} else {
					setZoom(1);
				}
			};

			calculateZoom();
			window.addEventListener('resize', calculateZoom);

			return () => window.addEventListener('resize', calculateZoom);
		}
	}, []);
};

export default useZoom;
