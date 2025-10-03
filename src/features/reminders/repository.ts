import { supabaseServer } from '@/lib/server';
import { IReminder } from './models';

export interface IRemindersRepository {
	getAllReminders(
		groupId: string,
	): Promise<{ success: true; data: IReminder[] | null } | { success: false; error: string }>;
	createReminder(
		title: string,
		content: string,
		groupId: string,
	): Promise<{ success: true; data: IReminder } | { success: false; error: string }>;
	editGroup(
		content: string,
		reminderId: string,
	): Promise<{ success: true } | { success: false; error: string }>;
	deleteReminder(
		reminderId: string,
	): Promise<{ success: true } | { success: false; error: string }>;
}

export const RemindersRepository: IRemindersRepository = {
	async getAllReminders(groupId: string) {
		const supabase = await supabaseServer();

		const { data: groups, error } = await supabase
			.from('reminders')
			.select('*')
			.eq('group_id', groupId)
			.order('created_at', { ascending: false });

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			data: groups,
		};
	},
	async createReminder(title, content, groupId) {
		const supabase = await supabaseServer();

		const { data, error } = await supabase
			.from('reminders')
			.insert([
				{
					title,
					content,
					group_id: groupId,
				},
			])
			.select()
			.single();

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			data: data,
		};
	},
	async editGroup(content, reminderId) {
		const supabase = await supabaseServer();

		const { error } = await supabase
			.from('reminders')
			.update({ content: content })
			.eq('id', reminderId);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
		};
	},
	async deleteReminder(reminderId) {
		const supabase = await supabaseServer();

		const { error } = await supabase.from('reminders').delete().eq('id', reminderId);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
		};
	},
};
