'use client';

import { FolderContainer, Logo } from '@/components/atoms';
import { VscNewFolder } from 'react-icons/vsc';
import { IGroup } from '@/features/groups/models';
import useDashboard from './useDashboard';
import { FileManagerPanel } from '@/components/organisms';
import { IoIosLogOut } from 'react-icons/io';
import { useUserStore } from '@/store/user-store';

export interface IViewProps {
	groups?: IGroup[];
}

const View = ({ groups }: IViewProps) => {
	const { user } = useUserStore();
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
				<div className=" bg-white p-4 rounded-b-3xl">
					<Logo type="secondary" />

					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs text-gray-600">{user?.email}</p>
						</div>

						<div className="tooltip max-w-40" data-tip="Sair">
							<div
								onClick={logOut}
								className="w-11 h-11 bg-white cursor-pointer flex justify-center items-center rounded-full hover:bg-primary text-primary hover:text-white transition-all"
							>
								<IoIosLogOut className="text-2xl" />
							</div>
						</div>
					</div>
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
