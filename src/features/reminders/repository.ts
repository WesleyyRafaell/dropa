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
		name: string,
		userId: string,
	): Promise<{ success: true } | { success: false; error: string }>;
	deleteGroup(groupId: string): Promise<{ success: true } | { success: false; error: string }>;
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
	async editGroup(name, userId) {
		const supabase = await supabaseServer();

		const { error } = await supabase.from('groups').update({ name: name }).eq('id', userId);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
		};
	},
	async deleteGroup(userId) {
		const supabase = await supabaseServer();

		const { error } = await supabase.from('groups').delete().eq('id', userId);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
		};
	},
};
