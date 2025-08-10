import React from 'react';
import { FaFilePdf, FaFileWord } from 'react-icons/fa6';
import { IoIosMore } from 'react-icons/io';

const Table = () => {
	return (
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
	);
};

export default Table;
