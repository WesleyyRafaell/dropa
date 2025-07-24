import { FolderContainer, Logo } from '@/components/atoms';

const Dashboard = () => {
	return (
		<div className="flex justify-center">
			<div className="w-4xl flex flex-col gap-7">
				<div className="bg-white p-4 rounded-b-3xl">
					<Logo type="secondary" />
				</div>
				<div className="bg-white rounded-3xl p-4">
					<div>
						<h2 className="text-gray-700 text-xl font-medium">grupos</h2>
						<div className="pt-3.5 flex gap-7">
							<FolderContainer>oi</FolderContainer>
							<FolderContainer>oi</FolderContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
