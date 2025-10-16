import { supabaseServer } from '@/lib/server';
import { getAllFilesResponse } from './models';

export interface IFilesRepository {
	getFilesByGroup(
		groupId: string,
	): Promise<{ success: true; data: getAllFilesResponse[] } | { success: false; error: string }>;
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
