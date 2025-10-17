import { getAllFilesResponse, UploadReminderFilesParams } from './models';
import { supabaseClient } from '@/lib/client';
import { v4 as uuidv4 } from 'uuid';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';

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

		const {
			data: { session },

			error: sessionError,
		} = await supabase.auth.getSession();

		if (sessionError || !session) throw new Error('Usuário não autenticado.');

		const uploaded: { name: string; group_id: string; url: string; path: string }[] = [];

		const uppy = new Uppy({
			autoProceed: false,

			restrictions: { maxNumberOfFiles: files.length },
		}).use(Tus, {
			endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,

			headers: {
				authorization: `Bearer ${session.access_token}`,

				'x-upsert': 'true',
			},

			uploadDataDuringCreation: true,
		});

		for (const file of files) {
			const path = `user_${userId}/group_${groupId}/${uuidv4()}-${file.name}`;

			uppy.addFile({
				name: file.name,
				type: file.type,
				data: file,
				meta: {
					bucketName: 'dropa_bucket',

					objectName: path,
				},
			});

			await new Promise<void>((resolve, reject) => {
				uppy.once('upload-success', () => resolve());
				uppy.once('error', (err) => reject(err));
				uppy.upload().catch(reject);
			});

			const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dropa_bucket/${path}`;

			uploaded.push({
				name: file.name,
				url: publicUrl,
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
