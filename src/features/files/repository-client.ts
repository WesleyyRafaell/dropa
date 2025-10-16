import { getAllFilesResponse, UploadReminderFilesParams } from './models';
import { supabaseClient } from '@/lib/client';
import { v4 as uuidv4 } from 'uuid';

export interface IFilesRepository {
	uploadGroupFiles({
		userId,
		groupId,
		formData,
	}: UploadReminderFilesParams): Promise<
		{ success: true; data: getAllFilesResponse[] } | { success: false; error: string }
	>;
}

export const FilesRepositoryClient: IFilesRepository = {
	async uploadGroupFiles({ userId, formData, groupId }: UploadReminderFilesParams) {
		const files = formData.getAll('files') as File[];

		if (files.length === 0) throw new Error('Nenhum arquivo enviado.');

		const supabase = supabaseClient();

		const uploaded: { name: string; group_id: string; url: string; path: string }[] = [];

		for (const file of files) {
			const fileBuffer = Buffer.from(await file.arrayBuffer());

			const path = `user_${userId}/group_${groupId}/${uuidv4()}-${file.name}`;

			const { error } = await supabase.storage.from('dropa_bucket').upload(path, fileBuffer, {
				contentType: file.type,
			});

			if (error) throw error;

			const { data } = supabase.storage.from('dropa_bucket').getPublicUrl(path);

			uploaded.push({
				name: file.name,
				url: data.publicUrl,
				group_id: groupId,
				path,
			});
		}

		const { data: filesFromSupabase, error } = await supabase
			.from('dropa_files')
			.insert(
				uploaded.map((file) => ({
					group_id: groupId,
					name: file.name,
					path: file.path,
					url: file.url,
				})),
			)
			.select();

		if (error) return { success: false, error: error.message };

		const filesWithUrls = await Promise.all(
			filesFromSupabase?.map(async (file) => {
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
