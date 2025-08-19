'use client';

import { FolderContainer, FolderLoading, Logo, Table } from '@/components/atoms';
import { VscNewFolder } from 'react-icons/vsc';
import { CardText, NewCard } from '@/components/molecules';
import { IGroup } from '@/features/groups/models';
import useDashboard from './useDashboard';

export interface IViewProps {
	groups?: IGroup[];
}

const View = ({ groups }: IViewProps) => {
	const { groupList, handleCreteNewGroup, handleEditNewGroup, handleDeleteGroup, isPending } =
		useDashboard({ groups });

	return (
		<div className="flex justify-center">
			<div className="w-4xl flex flex-col gap-7">
				<div className="bg-white p-4 rounded-b-3xl">
					<Logo type="secondary" />
				</div>
				<div className="flex flex-col gap-7">
					<div className="bg-white rounded-3xl p-4">
						<div>
							<div className="pt-3.5 pb-4 flex gap-7 items-center overflow-x-scroll overflow-y-hidden">
								<div
									onClick={handleCreteNewGroup}
									className="w-16 h-16 flex-shrink-0 cursor-pointer bg-primary rounded-full flex justify-center items-center"
								>
									<VscNewFolder className="text-white text-2xl" />
								</div>
								{isPending ? <FolderLoading /> : null}
								{groupList?.map((group) => (
									<FolderContainer
										id={group?.id}
										key={group.id}
										name={group.name}
										deleteGroup={() => handleDeleteGroup(group?.id)}
										editGroup={handleEditNewGroup}
									></FolderContainer>
								))}
							</div>
						</div>
					</div>
					<div className="bg-white rounded-3xl p-4">
						<h2 className="text-gray-700 text-xl font-medium">Trucker</h2>
						<div className="tabs tabs-lift mt-4">
							<input type="radio" name="my_tabs_3" className="tab" aria-label="Arquivos" />
							<div className="tab-content bg-base-100 border-base-300 p-6">
								<Table />
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
									<NewCard />
									<CardText title="teste" text="texto" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default View;
