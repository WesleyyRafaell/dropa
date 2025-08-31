import { Table } from '@/components/atoms';
import { CardText, NewCard } from '@/components/molecules';
import React from 'react';
import useFileManagerPanel from './useFileManagerPanel';

const FileManagerPanel = () => {
	const { reminders, isPending, groupName } = useFileManagerPanel();

	return (
		<div className="bg-white rounded-3xl p-4">
			<h2 className="text-gray-700 text-xl font-medium">{groupName}</h2>
			{isPending ? (
				<div className="flex justify-center items-center h-60">
					<span className="loading loading-ring loading-xl text-primary text-2xl"></span>
				</div>
			) : null}
			{!isPending ? (
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
							{reminders?.map((reminder) => (
								<CardText key={reminder?.id} title={reminder?.title} text={reminder?.content} />
							))}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default FileManagerPanel;
