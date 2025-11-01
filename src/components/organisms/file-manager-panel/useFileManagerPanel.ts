import {
	createReminderAction,
	getAllRemindersAction,
	deleteReminderAction,
	editGroupAction,
} from '@/features/reminders/action';
import { IReminder } from '@/features/reminders/models';
import { FileManagerPanelStore } from '@/store/file-manager-panel-store';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';

const useFileManagerPanel = () => {
	const { groupId, groupName } = FileManagerPanelStore();

	const [loadingReminders, setLoadingReminders] = useState(false);
	const [reminders, setReminders] = useState<IReminder[]>([]);
	const [isPendingCreateNewReminder, startTransitionCreateNewReminder] = useTransition();
	const [loadingDeleteReminder, setLoadingDeleteReminder] = useState(false);

	useEffect(() => {
		getAllRemindersById(groupId);
	}, [groupId]);

	const getAllRemindersById = async (groupId: string) => {
		if (!groupId) return;
		setLoadingReminders(true);

		const result = await getAllRemindersAction(groupId);

		setLoadingReminders(false);

		if (result?.error) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
		}

		if (result?.success && result?.reminders) {
			setReminders(result?.reminders?.data || []);
		}
	};

	const createNewReminder = () => {
		if (isPendingCreateNewReminder) return;

		startTransitionCreateNewReminder(async () => {
			const result = await createReminderAction({ content: 'Novo lembrete', groupId, title: '' });

			if (result?.error) {
				toast.error(result?.error || 'Foi mal, algum erro aconteceu na criação do lembrete.');
			}

			if (result?.success && result?.reminder) {
				setReminders((prev) => [result.reminder, ...(prev ?? [])]);
				toast.success('Sucesso ao criar lembrete.');
			}
		});
	};

	const handleEditNewReminder = useDebouncedCallback(
		async (content: string, reminderId: string) => {
			const result = await editGroupAction(content, reminderId);

			if (result?.error) {
				toast.error(result?.error || 'Foi mal, algum erro aconteceu na edição.');
			}
		},
		800,
	);

	const handleDeleteReminder = async (id: string) => {
		setLoadingDeleteReminder(true);

		const result = await deleteReminderAction(id);

		if (result?.error) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
		}

		if (result?.success) {
			toast.success('Sucesso ao apagar lembrete.');
			const remindersFilter = reminders?.filter((reminder) => reminder?.id !== id);

			setReminders(remindersFilter);

			setLoadingDeleteReminder(false);
			return;
		}
		setLoadingDeleteReminder(false);
	};

	return {
		loadingReminders,
		reminders,
		groupName,
		groupId,
		isPendingCreateNewReminder,
		loadingDeleteReminder,
		createNewReminder,
		handleDeleteReminder,
		handleEditNewReminder,
	};
};

export default useFileManagerPanel;
