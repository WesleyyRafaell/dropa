export interface IGroup {
	id: string;
	user_id: string;
	name: string;
	description: string | null;
	created_at: string;
}

export interface UploadReminderFilesParams {
	userId: string;
	groupId: string;
	formData: FormData;
}

export interface getAllFilesResponse {
	id: string;
	group_id: string;
	name: string;
	path: string;
	url: string;
	created_at: string;
	fileName: string;
	downloadUrl: string;
}
