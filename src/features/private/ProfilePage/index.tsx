import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../entities/modules/auth';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import Head from '../../../shared/ui/components/molecules/Head';
import Achievements from '../../../shared/ui/components/organisms/Achievements';
import ProfileInfo from '../../../shared/ui/components/organisms/ProfileInfo';

import {
	ProfileResult,
	ProfileScoreData,
} from '../../../entities/modules/auth/types';
import useNotifications from '../../../entities/modules/notifications/hooks/useNotifications';
import { NotificationData } from '../../../entities/modules/notifications/types';
import {
	ActivitiesResponse,
	ChallengeData,
	WorkoutData
} from '../../../entities/types';
import { TOKEN_KEY } from '../../../shared/lib/constants/global';
import storage from '../../../shared/lib/utils/storage';
import LiveTape from '../../../shared/ui/components/molecules/LiveTape';
import NotificationModal from '../../../shared/ui/components/molecules/modals/NotificationModal';
import ProfileChallenges from '../../../shared/ui/components/organisms/ProfileChallgenes';
import ProfileResults from '../../../shared/ui/components/organisms/ProfileResults';

type Props = {
	results: ProfileResult[];
	score: ProfileScoreData;
	challenges: ChallengeData[];
	workouts: WorkoutData[];
	activities: ActivitiesResponse;
};

const ProfilePage = ({
	results,
	score,
	challenges,
	workouts,
	activities,
}: Props) => {
	const router = useRouter();
	const { pathname } = router;
	const { auth, setAuth } = useContext(AuthContext);
	const [showNotification, setShowNotification] = useState<boolean>(false);
	const [
		currentNotification,
		setCurrentNotification,
	] = useState<NotificationData | null>(null);

	const { notifications } = useNotifications({
		token: storage.get(TOKEN_KEY),
		type: 2,
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
		<PrivateTemplateGeneric title="Профиль">
			<Head isSmallHead={false} pathname={pathname} />
			<ProfileInfo
				team={score?.team?.name}
				setAuth={setAuth}
				user={auth}
				personal
			/>
			<Achievements achievements={score?.achievements} personal />
			<ProfileResults
				isStravaConnected={score?.is_strava_connected}
				results={results}
				personal
			/>
			{((challenges && challenges?.length > 0) ||
				(workouts && workouts?.length > 0)) && (
				<ProfileChallenges
					workouts={workouts}
					challenges={challenges}
					personal
				/>
			)}
			<LiveTape personal activitiesData={activities} />
			<NotificationModal
				open={showNotification}
				setOpen={setShowNotification}
				content={currentNotification}
			/>
		</PrivateTemplateGeneric>
	);
};

export default ProfilePage;
