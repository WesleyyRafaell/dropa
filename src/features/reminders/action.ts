'use server';

import { RemindersRepository } from './repository';
import { IReminderProps } from '@/types/features';

export async function getAllRemindersAction(groupId: string) {
	const result = await RemindersRepository.getAllReminders(groupId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, reminders: result };
}

export async function createReminderAction({ content, groupId }: IReminderProps) {
	const result = await RemindersRepository.createReminder('', content, groupId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, reminder: result.data };
}
