import { Logo } from '@/components/atoms';

const Dashboard = () => {
	return (
		<div className="flex justify-center">
			<div className="w-4xl flex flex-col gap-7">
				<div className="bg-white p-4 rounded-b-3xl">
					<Logo type="secondary" />
				</div>
				<div className="bg-white rounded-3xl p-4">
					<div>
						<p>grupos</p>
						<div className="relative w-60 mt-3.5">
							<div className="absolute -top-3 left-4 z-10">
								<div className="bg-[#8970ff] rounded-t-lg px-6 py-1 shadow-sm">
									<div className="w-12 h-2"></div>
								</div>
							</div>

							<div className="relative bg-[#7462f0] rounded-lg shadow-lg min-h-32 p-6">
								<div className="absolute inset-0 bg-gradient-to-br from-[#5f54db]/20 to-[#4c48bb]/10 rounded-lg pointer-events-none"></div>

								<div className="relative z-10">oi</div>

								<div className="absolute -bottom-1 -right-1 w-full h-full bg-[#4c48bb]/30 rounded-lg -z-10"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
