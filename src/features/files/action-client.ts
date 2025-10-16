import { UploadReminderFilesParams } from './models';
import { FilesRepositoryClient } from './repository-client';

export async function uploadGroupFilesAction({
	userId,
	groupId,
	formData,
}: UploadReminderFilesParams) {
	const result = await FilesRepositoryClient.uploadGroupFiles({ userId, groupId, formData });

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, data: result?.data };
}
