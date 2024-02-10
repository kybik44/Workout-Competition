import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserFilesType } from '../../../entities/modules/contest/types';
import useNotifications from '../../../entities/modules/notifications/hooks/useNotifications';
import { NotificationData } from '../../../entities/modules/notifications/types';
import { NewsContent, WorkoutData } from '../../../entities/types';
import { TOKEN_KEY } from '../../../shared/lib/constants/global';
import storage from '../../../shared/lib/utils/storage';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import News from '../../../shared/ui/components/molecules/News';
import Photoalbum from '../../../shared/ui/components/molecules/Photoalbum';
import Schedule from '../../../shared/ui/components/molecules/Schedule';
import NotificationModal from '../../../shared/ui/components/molecules/modals/NotificationModal';

type Props = {
	workouts: WorkoutData[];
	photoalbumPhotos: UserFilesType;
	instagramPhotos: UserFilesType;
	news: NewsContent[];
};

const HomePage = ({
	workouts,
	photoalbumPhotos,
	instagramPhotos,
	news,
}: Props) => {
	const router = useRouter();
	const { pathname } = router;

	const [showNotification, setShowNotification] = useState<boolean>(false);
	const [
		currentNotification,
		setCurrentNotification,
	] = useState<NotificationData | null>(null);

	const { notifications } = useNotifications({
		token: storage.get(TOKEN_KEY),
		type: 1,
	});

	useEffect(() => {
		notifications &&
			!currentNotification &&
			setCurrentNotification(notifications[0]);
	}, [notifications]);

	useEffect(() => {
		currentNotification && setShowNotification(true);
	}, [currentNotification]);

	return (
		<PrivateTemplateGeneric title="Главная">
			<Head isSmallHead={false} pathname={pathname} background="run" />
			<News news={news} />
			<Schedule workouts={workouts} />
			<Photoalbum photos={photoalbumPhotos} />
			<Footer />
			<NotificationModal
				open={showNotification}
				setOpen={setShowNotification}
				content={currentNotification}
			/>
		</PrivateTemplateGeneric>
	);
};

export default HomePage;
