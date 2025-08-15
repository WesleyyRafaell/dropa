import { supabaseServer } from '@/lib/server';
import { IGroup } from './models';

export interface IGroupsRepository {
	getAllGroups(): Promise<
		{ success: true; data: IGroup[] | null } | { success: false; error: string }
	>;
	createGroup(
		name: string,
		userId: string,
	): Promise<{ success: true; data: IGroup } | { success: false; error: string }>;
	deleteGroup(groupId: string): Promise<{ success: true } | { success: false; error: string }>;
}

export const GroupsRepository: IGroupsRepository = {
	async getAllGroups() {
		const supabase = await supabaseServer();

		const { data: groups, error } = await supabase
			.from('groups')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			data: groups,
		};
	},
	async createGroup(name, userId) {
		const supabase = await supabaseServer();

		const { data, error } = await supabase
			.from('groups')
			.insert([
				{
					name,
					user_id: userId,
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
	async deleteGroup(userId) {
		const supabase = await supabaseServer();

		const { error } = await supabase.from('groups').delete().eq('id', userId);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
		};
	},
};
