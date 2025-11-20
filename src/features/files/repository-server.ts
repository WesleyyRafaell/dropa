import { supabaseServer } from '@/lib/server';
import { getAllFilesResponse } from './models';

export interface IFilesRepository {
	getFilesByUserId(
		userId: string,
	): Promise<{ success: true; data: getAllFilesResponse[] } | { success: false; error: string }>;
	getFilesByGroup(
		groupId: string,
	): Promise<{ success: true; data: getAllFilesResponse[] } | { success: false; error: string }>;
	getFileDownloadUrl(
		path: string,
	): Promise<{ success: true; data: string } | { success: false; error: string }>;
	deleteFile(
		fileId: string,
		path: string,
	): Promise<{ success: true } | { success: false; error: string }>;
	getShortLink(
		longUrl: string,
	): Promise<{ success: true; data: { link: string } } | { success: false; error: string }>;
}

export const FilesRepositoryServer: IFilesRepository = {
	async getFilesByUserId(userId: string) {
		const supabase = await supabaseServer();

		const { data: files, error } = await supabase
			.from('dropa_files')
			.select('*')
			.eq('user_id', userId)
			.order('created_at', { ascending: false });

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			data: files,
		};
	},
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
	async deleteFile(fileId: string, path: string) {
		const supabase = await supabaseServer();

		const deleteTable = supabase.from('dropa_files').delete().eq('id', fileId);
		const deleteFile = supabase.storage.from('dropa_bucket').remove([path]);

		const result = await Promise.all([deleteTable, deleteFile]);

		if (result[0].error || result[1].error) return { success: false, error: 'Erro na requisição' };

		return { success: true };
	},
	async getShortLink(longUrl: string) {
		const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ long_url: longUrl }),
		});

		if (!response.ok) return { success: false, error: 'Erro na requisição' };

		const data = await response.json();

		return {
			success: true,
			data: data,
		};
	},
};
