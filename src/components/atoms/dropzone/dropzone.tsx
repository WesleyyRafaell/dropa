import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IDropzoneProps {
	id: string;
	changeDropzone: (id: string, files: File[]) => void;
}

const Dropzone = ({ id, changeDropzone }: IDropzoneProps) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			changeDropzone(id, acceptedFiles);
		},
		[changeDropzone, id],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
	});

	return (
		<div
			{...getRootProps()}
			className={`
								p-10 border-2 w-full h-48 flex flex-col justify-center border-dashed rounded-lg cursor-pointer transition-colors duration-200
								text-center

								${
									isDragActive
										? 'border-primary bg-primary-content text-primary'
										: 'border-base-300 hover:border-base-content hover:bg-base-200 text-base-content'
								}
							`}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p className="font-bold">Solte os arquivos aqui...</p>
			) : (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mx-auto h-12 w-12 opacity-60"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"
						/>
					</svg>
					<p className="mt-2 text-sm">
						Arraste e solte alguns arquivos aqui, ou **clique para selecionar**.
					</p>
					<p className="text-xs opacity-70 mt-1">Ex: PNG, JPG, PDF</p>
				</>
			)}
		</div>
	);
};

export default Dropzone;
