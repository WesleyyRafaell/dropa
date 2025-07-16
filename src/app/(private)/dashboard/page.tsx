import { logOutAction } from '@/features/auth/action';

const Dashboard = () => {
	return (
		<>
			<p>dashboard</p>
			<button onClick={logOutAction}>sair</button>
		</>
	);
};

export default Dashboard;
