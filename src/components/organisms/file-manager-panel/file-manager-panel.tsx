import { Table } from '@/components/atoms';
import { CardText, NewCard } from '@/components/molecules';
import React from 'react';
import useFileManagerPanel from './useFileManagerPanel';

const FileManagerPanel = () => {
	const {
		reminders,
		loadingReminders,
		groupName,
		groupId,
		isPendingCreateNewReminder,
		loadingDeleteReminder,
		createNewReminder,
		handleDeleteReminder,
		handleEditNewReminder,
	} = useFileManagerPanel();

	return (
		<div className="bg-white rounded-3xl p-4">
			{!groupId ? (
				<div className="text-center">
					<p className="text-primary font-bold">Selecione um grupo</p>
				</div>
			) : null}
			{groupId ? (
				<>
					<h2 className="text-gray-700 text-xl font-medium">{groupName}</h2>

					<div className="tabs tabs-lift mt-4">
						<input
							type="radio"
							name="my_tabs_3"
							className="tab"
							aria-label="Arquivos"
							defaultChecked
						/>
						<div className="tab-content bg-base-100 border-base-300 p-6">
							<Table groupId={groupId} />
						</div>

						<input type="radio" name="my_tabs_3" className="tab" aria-label="Lembrentes" />
						<div className="tab-content bg-base-100 border-base-300 p-6">
							{loadingReminders ? (
								<div className="flex justify-center items-center h-60">
									<span className="loading loading-ring loading-xl text-primary text-2xl"></span>
								</div>
							) : null}

							{!loadingReminders ? (
								<div className="grid grid-cols-4 gap-4">
									<NewCard
										createNewReminder={createNewReminder}
										isPendingCreateNewReminder={isPendingCreateNewReminder}
									/>
									{reminders?.map((reminder) => (
										<CardText
											key={reminder?.id}
											reminderId={reminder.id}
											text={reminder?.content}
											loadingDeleteReminder={loadingDeleteReminder}
											deleteReminder={handleDeleteReminder}
											editGroup={handleEditNewReminder}
										/>
									))}
								</div>
							) : null}
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};

export default FileManagerPanel;
