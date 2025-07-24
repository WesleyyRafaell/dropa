interface IFolderContainerProps {
	children: React.ReactNode;
}

const FolderContainer = ({ children }: IFolderContainerProps) => {
	return (
		<div className="relative w-52 mt-3.5 cursor-pointer">
			<div className="absolute -top-3 left-4 z-10">
				<div className="bg-[#8970ff] rounded-t-lg px-6 py-1 shadow-sm">
					<div className="w-12 h-2"></div>
				</div>
			</div>

			<div className="relative bg-[#7462f0] rounded-lg shadow-lg min-h-24 p-6">
				<div className="absolute inset-0 bg-gradient-to-br from-[#5f54db]/20 to-[#4c48bb]/10 rounded-lg pointer-events-none"></div>

				<div className="relative z-10">{children}</div>

				<div className="absolute -bottom-1 -right-1 w-full h-full bg-[#4c48bb]/30 rounded-lg -z-10"></div>
			</div>
		</div>
	);
};

export default FolderContainer;
