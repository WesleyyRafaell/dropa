import { supabaseServer } from '@/lib/server';
import { getAllFilesResponse, IGroup, UploadReminderFilesParams } from './models';
import { randomUUID } from 'crypto';

export interface IGroupsRepository {
	getAllGroups(): Promise<
		{ success: true; data: IGroup[] | null } | { success: false; error: string }
	>;
	createGroup(
		name: string,
		userId: string,
	): Promise<{ success: true; data: IGroup } | { success: false; error: string }>;
	editGroup(
		name: string,
		userId: string,
	): Promise<{ success: true } | { success: false; error: string }>;
	deleteGroup(groupId: string): Promise<{ success: true } | { success: false; error: string }>;
	getFilesByGroup(
		groupId: string,
	): Promise<{ success: true; data: getAllFilesResponse[] } | { success: false; error: string }>;
	uploadGroupFiles({
		userId,
		groupId,
		formData,
	}: UploadReminderFilesParams): Promise<{ success: true } | { success: false; error: string }>;
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
	async editGroup(name, groupId) {
		const supabase = await supabaseServer();

		const { error } = await supabase.from('groups').update({ name: name }).eq('id', groupId);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
		};
	},
	async deleteGroup(groupId) {
		const supabase = await supabaseServer();

		const { error } = await supabase.from('groups').delete().eq('id', groupId);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
		};
	},
	async uploadGroupFiles({ userId, formData, groupId }: UploadReminderFilesParams) {
		const files = formData.getAll('files') as File[];

		if (files.length === 0) throw new Error('Nenhum arquivo enviado.');

		const supabase = await supabaseServer();

		const uploaded: { name: string; url: string; path: string }[] = [];

		for (const file of files) {
			const fileBuffer = Buffer.from(await file.arrayBuffer());

			const path = `user_${userId}/group_${groupId}/${randomUUID()}-${file.name}`;

			const { error } = await supabase.storage.from('dropa_bucket').upload(path, fileBuffer, {
				contentType: file.type,
			});

			if (error) throw error;

			const { data } = supabase.storage.from('dropa_bucket').getPublicUrl(path);

			uploaded.push({
				name: file.name,
				url: data.publicUrl,
				path,
			});
		}

		const { error } = await supabase.from('dropa_files').insert(
			uploaded.map((file) => ({
				group_id: groupId,
				name: file.name,
				path: file.path,
				url: file.url,
			})),
		);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
		};
	},
	async getFilesByGroup(groupId: string) {
		const supabase = await supabaseServer();

		const { data: files, error } = await supabase
			.from('dropa_files')
			.select('*')
			.eq('group_id', groupId);

		if (error) return { success: false, error: error.message };

		const filesWithUrls = await Promise.all(
			files.map(async (file) => {
				const { data: signedUrlData } = await supabase.storage
					.from('dropa_bucket')
					.createSignedUrl(file.path, 3600);

				return {
					...file,
					fileName: file.path.split('/').pop(),
					downloadUrl: signedUrlData?.signedUrl,
				};
			}),
		);

		return {
			success: true,
			data: filesWithUrls,
		};
	},
};
