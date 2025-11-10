'use client';

import { FolderContainer, Logo } from '@/components/atoms';
import { VscNewFolder } from 'react-icons/vsc';
import { IGroup } from '@/features/groups/models';
import useDashboard from './useDashboard';
import { FileManagerPanel } from '@/components/organisms';

export interface IViewProps {
	groups?: IGroup[];
}

const View = ({ groups }: IViewProps) => {
	const {
		groupList,
		handleCreteNewGroup,
		handleEditNewGroup,
		handleDeleteGroup,
		handleSelectGroup,
		logOut,
		isPending,
		loadingDeleteGroup,
	} = useDashboard({ groups });

	return (
		<div className="flex justify-center">
			<div className="w-4xl flex flex-col gap-7">
				<div className="flex items-center justify-between bg-white p-4 rounded-b-3xl">
					<Logo type="secondary" />

					<button onClick={logOut} className="btn btn-primary btn-outline border-0">
						Sair
					</button>
				</div>
				<div className="flex flex-col gap-7">
					<div className="bg-white rounded-3xl p-4">
						<div>
							<div className="pt-3.5 pb-4 flex gap-7 items-center overflow-x-scroll overflow-y-hidden">
								<div
									onClick={handleCreteNewGroup}
									className="w-16 h-16 flex-shrink-0 cursor-pointer bg-primary rounded-full flex justify-center items-center"
								>
									{isPending ? (
										<div>
											<span className="loading loading-ring loading-xl text-white text-2xl"></span>
										</div>
									) : null}

									{!isPending ? <VscNewFolder className="text-white text-2xl" /> : null}
								</div>

								{groupList?.map((group) => (
									<FolderContainer
										id={group?.id}
										key={group.id}
										name={group.name}
										loadingDeleteGroup={loadingDeleteGroup}
										deleteGroup={() => handleDeleteGroup(group?.id)}
										editGroup={handleEditNewGroup}
										selectGroup={handleSelectGroup}
									></FolderContainer>
								))}
							</div>
						</div>
					</div>
					<FileManagerPanel />
				</div>
			</div>
		</div>
	);
};

export default View;
