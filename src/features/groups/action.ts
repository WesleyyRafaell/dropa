'use server';

import { IGroupProps, IDeleteGroupProps, IEditGroupProps } from '@/types/features';
import { GroupsRepository } from './repository';
import { UploadReminderFilesParams } from './models';

export async function getAllGroupsAction() {
	const result = await GroupsRepository.getAllGroups();

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, groups: result };
}

export async function createGroupAction({ name, userId }: IGroupProps) {
	const result = await GroupsRepository.createGroup(name, userId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, group: result.data };
}

export async function editGroupAction({ name, groupId }: IEditGroupProps) {
	const result = await GroupsRepository.editGroup(name, groupId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true };
}

export async function deleteGroupAction({ groupId }: IDeleteGroupProps) {
	const result = await GroupsRepository.deleteGroup(groupId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true };
}

export async function uploadGroupFilesAction({
	userId,
	groupId,
	formData,
}: UploadReminderFilesParams) {
	const result = await GroupsRepository.uploadGroupFiles({ userId, groupId, formData });

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, data: result?.data };
}

export async function getFilesByGroupAction(groupId: string) {
	const result = await GroupsRepository.getFilesByGroup(groupId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, data: result?.data };
}
