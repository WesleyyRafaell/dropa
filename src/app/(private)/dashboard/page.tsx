import { FolderContainer, Logo } from '@/components/atoms';
import { FaFilePdf } from 'react-icons/fa6';
import { IoIosMore } from 'react-icons/io';
import { FaFileWord } from 'react-icons/fa';
import { VscNewFolder } from 'react-icons/vsc';

const Dashboard = () => {
	return (
		<div className="flex justify-center">
			<div className="w-4xl flex flex-col gap-7">
				<div className="bg-white p-4 rounded-b-3xl">
					<Logo type="secondary" />
				</div>
				<div className="flex flex-col gap-7">
					<div className="bg-white rounded-3xl p-4">
						<div>
							<div className="pt-3.5 flex gap-7 items-center">
								<div className="w-16 h-16 cursor-pointer bg-primary rounded-full flex justify-center items-center">
									<VscNewFolder className="text-white text-2xl" />
								</div>
								<FolderContainer text="Trucker"></FolderContainer>
								<FolderContainer text="Estudo"></FolderContainer>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-3xl p-4">
						<h2 className="text-gray-700 text-xl font-medium">Trucker</h2>
						<div className="tabs tabs-lift mt-4">
							<input type="radio" name="my_tabs_3" className="tab" aria-label="Arquivos" />
							<div className="tab-content bg-base-100 border-base-300 p-6">
								<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
									<table className="table">
										{/* head */}
										<thead>
											<tr>
												<th></th>
												<th>Arquivo</th>
												<th>Ultima modificação</th>
												<th>Tamanho do arquivo</th>
												<th>Ações</th>
											</tr>
										</thead>
										<tbody>
											{/* row 1 */}
											<tr>
												<th>1</th>
												<td>
													<div className="flex items-center gap-2">
														<FaFilePdf size={20} className="text-primary" />
														Cy Ganderton
													</div>
												</td>
												<td>Quality Control Specialist</td>
												<td>Blue</td>
												<td>
													<div className="flex justify-center">
														<IoIosMore size={25} />
													</div>
												</td>
											</tr>
											{/* row 2 */}
											<tr>
												<th>2</th>
												<td>
													<div className="flex items-center gap-2">
														<FaFileWord size={20} className="text-primary" />
														Cy Ganderton
													</div>
												</td>
												<td>Desktop Support Technician</td>
												<td>Purple</td>
											</tr>
											{/* row 3 */}
											<tr>
												<th>3</th>
												<td>Brice Swyre</td>
												<td>Tax Accountant</td>
												<td>Red</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							<input
								type="radio"
								name="my_tabs_3"
								className="tab"
								aria-label="Lembrentes"
								defaultChecked
							/>
							<div className="tab-content bg-base-100 border-base-300 p-6">
								<div className="grid grid-cols-4 gap-4">
									<div className="card bg-primary text-primary-content cursor-pointer">
										<div className="card-body">
											<h2 className="card-title">Novo lembrente</h2>
											<div className="flex justify-center p-5">
												<VscNewFolder className="text-white text-3xl" />
											</div>
										</div>
									</div>
									<div className="card bg-primary text-primary-content ">
										<div className="card-body">
											<h2 className="card-title">Card title!</h2>
											<p>
												A card component has a figure, a body part, and inside body there are title
												and actions parts
											</p>
										</div>
									</div>
									<div className="card bg-primary text-primary-content ">
										<div className="card-body">
											<h2 className="card-title">Card title!</h2>
											<p>
												A card component has a figure, a body part, and inside body there are title
												and actions parts
											</p>
										</div>
									</div>
									<div className="card bg-primary text-primary-content ">
										<div className="card-body">
											<h2 className="card-title">Card title!</h2>
											<p>
												A card component has a figure, a body part, and inside body there are title
												and actions parts
											</p>
										</div>
									</div>
									<div className="card bg-primary text-primary-content ">
										<div className="card-body">
											<h2 className="card-title">Card title!</h2>
											<p>
												A card component has a figure, a body part, and inside body there are title
												and actions parts
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
