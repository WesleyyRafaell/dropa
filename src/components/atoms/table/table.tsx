'use client';

import React from 'react';
import { LuFileHeart } from 'react-icons/lu';
import useUploadTable from './useUploadTable';
import { formatIsoToDate } from '@/utils/formatDate';
import { RiFileDownloadLine } from 'react-icons/ri';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Link from 'next/link';

interface ITableProps {
	groupId: string;
}

const Table = ({ groupId }: ITableProps) => {
	const { handleUploadFiles, uploadingItens, fileInputRef, filesByGroup } = useUploadTable();

	return (
		<div>
			<div className="flex flex-col justify-center items-center gap-3 mb-6">
				<input
					ref={fileInputRef}
					type="file"
					className="file-input file-input-primary"
					onChange={(e) => handleUploadFiles(groupId, e.target.files)}
					multiple
				/>
				{uploadingItens?.length ? (
					<ul className="list bg-base-100 rounded-box shadow-md">
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
			<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Arquivo</th>
							<th>Ultima modificação</th>
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
										<LuFileHeart size={20} className="text-primary" />
										{file?.name}
									</div>
								</td>
								<td>{formatIsoToDate(file?.created_at)}</td>

								<td>
									<div className="flex justify-center cursor-pointer">
										<Link href={file?.downloadUrl || ''} target="_blank">
											<RiFileDownloadLine size={25} className="text-primary" />
										</Link>
									</div>
								</td>
								<td>
									<div className="flex justify-center cursor-pointer">
										<RiDeleteBin5Fill size={25} className="text-primary" />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
