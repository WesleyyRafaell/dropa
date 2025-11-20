'use client';

import React from 'react';
import { LuFileHeart } from 'react-icons/lu';
import useUploadTable from './useUploadTable';
import { formatIsoToDate } from '@/utils/formatDate';
import { RiFileDownloadLine } from 'react-icons/ri';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { formatFileSize, MAX_UPLOAD_LIMIT_FREE_ACCOUNT } from '@/utils/files';
import { FaRegCopy } from 'react-icons/fa';
import { Dropzone } from '@/components/atoms';
import { CurrentLimiteUploadSizeStore } from '@/store/current-limit-upload-size';

interface ITableProps {
	groupId: string;
}

const Table = ({ groupId }: ITableProps) => {
	const {
		handleUploadFiles,
		downloadFile,
		deleteFile,
		getCopyFile,
		uploadingItens,
		deleteFilesLoading,
		filesByGroup,
		filesLoading,
	} = useUploadTable();
	const { currentLimiteUploadSize } = CurrentLimiteUploadSizeStore();

	return (
		<div>
			{filesLoading ? (
				<div className="flex justify-center items-center h-60">
					<span className="loading loading-ring loading-xl text-primary text-2xl"></span>
				</div>
			) : null}
			{!filesLoading ? (
				<>
					{currentLimiteUploadSize <= MAX_UPLOAD_LIMIT_FREE_ACCOUNT ? (
						<div className="flex flex-col justify-center items-center gap-3 mb-6">
							<Dropzone id={groupId} changeDropzone={(id, files) => handleUploadFiles(id, files)} />

							{uploadingItens?.length ? (
								<ul className="list w-full bg-base-100 rounded-box shadow-md">
									<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
										Subindo seus arquivos, aguarde um pouco
									</li>
									{uploadingItens?.map((item) => (
										<li className="list-row" key={item}>
											<div>
												<span className="loading loading-ring loading-sm text-primary text-2xl"></span>
											</div>
											<div>
												<div>{item}</div>
											</div>
										</li>
									))}
								</ul>
							) : null}
						</div>
					) : null}
					<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
						<table className="table">
							<thead>
								<tr>
									<th></th>
									<th>Arquivo</th>
									<th>Tamanho</th>
									<th>Ultima modificação</th>
									<th>Copiar url</th>
									<th>Download</th>
									<th>Excluir</th>
								</tr>
							</thead>
							<tbody>
								{filesByGroup?.map((file, index) => (
									<tr key={file?.id}>
										<th>{index + 1}</th>
										<td>
											<div className="flex items-center gap-2">
												<div className="w-5 h-5">
													<LuFileHeart size={20} className="text-primary" />
												</div>
												<div className="tooltip max-w-40" data-tip={file?.name}>
													<p className="line-clamp-2">{file?.name}</p>
												</div>
											</div>
										</td>
										<td>{formatFileSize(file?.size)}</td>
										<td>{formatIsoToDate(file?.created_at)}</td>

										<td>
											<div className="flex justify-center cursor-pointer">
												<FaRegCopy
													onClick={() => getCopyFile(file?.path)}
													size={20}
													className="text-primary"
												/>
											</div>
										</td>

										<td>
											<div className="flex justify-center cursor-pointer">
												<a
													onClick={() => downloadFile(file?.path)}
													target="_blank"
													rel="noopener noreferrer"
												>
													<RiFileDownloadLine size={25} className="text-primary" />
												</a>
											</div>
										</td>
										<td>
											<div className="flex justify-center cursor-pointer">
												<RiDeleteBin5Fill
													onClick={() => {
														(
															document.getElementById(file.id || '') as HTMLDialogElement
														)?.showModal();
													}}
													size={25}
													className="text-primary"
												/>
												<dialog id={file.id} className="modal">
													<div className="modal-box">
														{deleteFilesLoading ? (
															<div className="h-40 flex justify-center items-center">
																<span className="loading loading-ring loading-xl text-primary text-2xl"></span>
															</div>
														) : null}

														{!deleteFilesLoading ? (
															<div className="h-40">
																<h3 className="font-bold text-lg">Hello!</h3>
																<p className="py-4">
																	Deseja deletar o arquivo <strong>{file.name}</strong>?
																</p>
																<p className="font-light text-[14px]">Esta ação é irreversível</p>
																<div className="modal-action">
																	<button
																		className="btn btn-primary"
																		onClick={() => deleteFile(file.id, file.path)}
																	>
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
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			) : null}
		</div>
	);
};

export default Table;
