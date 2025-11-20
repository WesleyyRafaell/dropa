'use client';

import { useIsMobile } from '@/hooks/isMobile';
import { useState } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';

interface IFolderContainerProps {
	id?: string;
	name?: string;
	children?: React.ReactNode;
	noAction?: boolean;
	loadingDeleteGroup: boolean;
	deleteGroup?: () => void;
	editGroup?: (idGroup: string, newNameGroup: string) => void;
	selectGroup?: (idGroup: string, nameGroup: string) => void;
}

const FolderContainer = ({
	id,
	name,
	noAction,
	loadingDeleteGroup,
	deleteGroup,
	editGroup,
	selectGroup,
}: IFolderContainerProps) => {
	const isMobile = useIsMobile();
	const [inputValue, setInputValue] = useState(name);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setInputValue(value);
		editGroup?.(id ?? '', value);
	};

	return (
		<div className="indicator group" onClick={() => selectGroup?.(id || '', inputValue || '')}>
			{!noAction ? (
				<span
					onClick={() => {
						(document.getElementById(id || '') as HTMLDialogElement)?.showModal();
					}}
					className={`indicator-item badge badge-primary cursor-pointer group-hover:opacity-100 transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 '}`}
				>
					<BsTrash3Fill />
				</span>
			) : null}

			<div className="relative w-48 mt-3.5 cursor-pointer flex-shrink-0">
				<div className="absolute -top-3 left-4 z-10">
					<div className="bg-primary rounded-t-lg px-6 py-1 shadow-sm">
						<div className="w-12 h-2"></div>
					</div>
				</div>

				<div className="relative bg-primary rounded-lg shadow-lg h-20 p-6">
					<div className="absolute inset-0 bg-gradient-to-br from-[#5f54db]/20 to-[#4c48bb]/10 rounded-lg pointer-events-none"></div>

					<div className="relative z-10 flex justify-center items-center h-full">
						<input
							type="text"
							value={inputValue}
							placeholder={name}
							onChange={handleInputChange}
							className="
											input
											input-ghost
										placeholder-white
											pl-1
											text-base
											font-medium
											border-b
										border-b-white
											focus:border-b
										focus:border-white
											focus:bg-transparent
											focus:ring-0
											focus:outline-none
										!text-white"
						/>
					</div>

					<div className="absolute -bottom-1 -right-1 w-full h-full bg-[#4c48bb]/30 rounded-lg -z-10"></div>
				</div>
			</div>

			<dialog id={id} className="modal">
				<div className="modal-box">
					{loadingDeleteGroup ? (
						<div className="h-40 flex justify-center items-center">
							<span className="loading loading-ring loading-xl text-primary text-2xl"></span>
						</div>
					) : null}

					{!loadingDeleteGroup ? (
						<div className="h-40">
							<h3 className="font-bold text-lg">Hello!</h3>
							<p className="py-4">
								Deseja deletar o grupo <span className="font-bold">{name}</span>?
							</p>
							<p className="font-light text-[14px]">Esta ação é irreversível</p>
							<div className="modal-action">
								<button className="btn btn-primary" onClick={deleteGroup}>
									Deletar
								</button>
								<form method="dialog">
									<button className="btn btn-outline btn-accent">Cancelar</button>
								</form>
							</div>
						</div>
					) : null}
				</div>
			</dialog>
		</div>
	);
};

export default FolderContainer;
