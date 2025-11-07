import { getAllFilesResponse, UploadReminderFilesParams } from './models';
import { supabaseClient } from '@/lib/client';
import { v4 as uuidv4 } from 'uuid';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { MAX_FILE_SIZE, sanitizeFileName } from '@/utils/files';

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

		const tooLargeFiles = files.filter((file) => file.size > MAX_FILE_SIZE);

		if (tooLargeFiles.length > 0) {
			const fileNames = tooLargeFiles.map((f) => f.name).join(', ');

			const message = `Os seguintes arquivos excedem 50 MB: ${fileNames}`;

			return { success: false, error: message };
		}

		const supabase = supabaseClient();

		const {
			data: { session },

			error: sessionError,
		} = await supabase.auth.getSession();

		if (sessionError || !session) throw new Error('Usuário não autenticado.');

		const uploaded: { name: string; group_id: string; url: string; path: string; size: number }[] =
			[];

		for (const file of files) {
			const sanitizedName = sanitizeFileName(file.name);
			const path = `user_${userId}/group_${groupId}/${uuidv4()}-${sanitizedName}`;

			const uppy = new Uppy({
				autoProceed: false,

				restrictions: { maxNumberOfFiles: 1 },
			}).use(Tus, {
				endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,

				headers: {
					authorization: `Bearer ${session.access_token}`,
				},

				uploadDataDuringCreation: true,
			});

			uppy.addFile({
				name: `${uuidv4()}-${sanitizedName}`,
				type: file.type,
				data: file,
				meta: {
					bucketName: 'dropa_bucket',

					objectName: path,
				},
			});

			try {
				await new Promise<void>((resolve, reject) => {
					uppy.once('upload-success', () => resolve());
					uppy.once('error', (err) => reject(err));
					uppy.upload().catch(reject);
				});

				const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dropa_bucket/${path}`;

				uploaded.push({
					name: sanitizeFileName(file.name),
					url: publicUrl,
					group_id: groupId,
					path,
					size: file.size,
				});
			} catch (error) {
				console.error(`Erro ao fazer upload de ${sanitizedName}:`, error);
			}
		}

		if (uploaded.length === 0) {
			return { success: false, error: 'Nenhum arquivo foi enviado com sucesso.' };
		}

		const { data: filesFromSupabase, error } = await supabase
			.from('dropa_files')
			.insert(
				uploaded.map((file) => ({
					group_id: groupId,
					name: file.name,
					path: file.path,
					url: file.url,
					size: file.size,
				})),
			)
			.select();

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			data: filesFromSupabase,
		};
	},
};
