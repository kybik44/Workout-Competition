import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../../../entities/modules/auth';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import Head from '../../../shared/ui/components/molecules/Head';
import Achievements from '../../../shared/ui/components/organisms/Achievements';
import ProfileInfo from '../../../shared/ui/components/organisms/ProfileInfo';

import {
	ProfileResult,
	ProfileScoreData,
} from '../../../entities/modules/auth/types';
import {
	ActivitiesResponse,
	ChallengeData,
	WorkoutData
} from '../../../entities/types';
import LiveTape from '../../../shared/ui/components/molecules/LiveTape';
import ProfileChallenges from '../../../shared/ui/components/organisms/ProfileChallgenes';
import ProfileResults from '../../../shared/ui/components/organisms/ProfileResults';

type Props = {
	results: ProfileResult[];
	score: ProfileScoreData;
	challenges: ChallengeData[];
	workouts: WorkoutData[];
	activities: ActivitiesResponse;
	profile: string;
};

const PublicProfilePage = ({
	results,
	score,
	challenges,
	workouts,
	activities,
	profile,
}: Props) => {
	const router = useRouter();
	const { pathname } = router;
	const { auth, setAuth } = useContext(AuthContext);

	return (
		<PrivateTemplateGeneric title="Профиль">
			<Head isSmallHead={false} pathname={pathname} />
			<ProfileInfo
				team={score?.team?.name}
				setAuth={setAuth}
				user={score?.user_info}
			/>
			<Achievements achievements={score?.achievements} />
			<ProfileResults
				isStravaConnected={score?.is_strava_connected}
				results={results}
			/>
			{((challenges && challenges?.length > 0) ||
				(workouts && workouts?.length > 0)) && (
				<ProfileChallenges
					workouts={workouts}
					challenges={challenges}
				/>
			)}
			<LiveTape profile={profile} activitiesData={activities} />
		</PrivateTemplateGeneric>
	);
};

export default PublicProfilePage;
