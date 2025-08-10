import { getAllGroupsAction } from '@/features/groups/action';
import View from './view';

const Dashboard = async () => {
	const result = await getAllGroupsAction();

	return <View groups={result.groups?.data || []} />;
};

export default Dashboard;
