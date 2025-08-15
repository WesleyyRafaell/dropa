import { BsTrash3Fill } from 'react-icons/bs';

interface IFolderContainerProps {
	id?: string;
	name?: string;
	children?: React.ReactNode;
	noAction?: boolean;
	deleteGroup?: () => void;
}

const FolderContainer = ({ id, name, children, noAction, deleteGroup }: IFolderContainerProps) => {
	return (
		<div className="indicator group">
			{!noAction ? (
				<span
					onClick={() => {
						(document.getElementById(id || '') as HTMLDialogElement)?.showModal();
					}}
					className="indicator-item badge badge-primary cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
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

					<div className="relative z-10 flex justify-center items-center h-full">{children}</div>

					<div className="absolute -bottom-1 -right-1 w-full h-full bg-[#4c48bb]/30 rounded-lg -z-10"></div>
				</div>
			</div>

			<dialog id={id} className="modal">
				<div className="modal-box">
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
			</dialog>
		</div>
	);
};

export default FolderContainer;
