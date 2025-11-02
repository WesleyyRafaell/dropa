'use server';

import { FilesRepositoryServer } from './repository-server';

export async function getFilesByGroupAction(groupId: string) {
	const result = await FilesRepositoryServer.getFilesByGroup(groupId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, data: result?.data };
}

export async function getFileDownloadUrlAction(path: string) {
	const result = await FilesRepositoryServer.getFileDownloadUrl(path);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, data: result?.data };
}
