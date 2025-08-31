import { getAllRemindersAction } from '@/features/reminders/action';
import { IReminder } from '@/features/reminders/models';
import { FileManagerPanelStore } from '@/store/file-manager-panel-store';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

const useFileManagerPanel = () => {
	const { groupId, groupName } = FileManagerPanelStore();
	const [isPending, startTransition] = useTransition();
	const [reminders, setReminders] = useState<IReminder[]>([]);

	useEffect(() => {
		getAllRemindersById(groupId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupId]);

	const getAllRemindersById = (groupId: string) => {
		if (!groupId) return;
		if (isPending) return;

		startTransition(async () => {
			const result = await getAllRemindersAction(groupId);

			if (result?.error) {
				toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			}

			if (result?.success && result?.reminders) {
				setReminders(result?.reminders?.data || []);
			}
		});
	};

	return {
		isPending,
		reminders,
		groupName,
	};
};

export default useFileManagerPanel;
