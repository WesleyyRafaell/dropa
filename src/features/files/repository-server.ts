import { supabaseServer } from '@/lib/server';
import { getAllFilesResponse } from './models';

export interface IFilesRepository {
	getFilesByGroup(
		groupId: string,
	): Promise<{ success: true; data: getAllFilesResponse[] } | { success: false; error: string }>;
	getFileDownloadUrl(
		path: string,
	): Promise<{ success: true; data: string } | { success: false; error: string }>;
}

export const FilesRepositoryServer: IFilesRepository = {
	async getFilesByGroup(groupId: string) {
		const supabase = await supabaseServer();

		const { data: files, error } = await supabase
			.from('dropa_files')
			.select('*')
			.eq('group_id', groupId)
			.order('created_at', { ascending: false });

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			data: files,
		};
	},
	async getFileDownloadUrl(path: string) {
		const supabase = await supabaseServer();

		const { data: signedUrlData, error } = await supabase.storage
			.from('dropa_bucket')
			.createSignedUrl(path, 3600);

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			data: signedUrlData?.signedUrl,
		};
	},
};
