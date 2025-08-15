'use server';

import { ICreateGroupProps, IDeleteGroupProps } from '@/types/features';
import { GroupsRepository } from './repository';

export async function getAllGroupsAction() {
	const result = await GroupsRepository.getAllGroups();

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, groups: result };
}

export async function createGroupAction({ name, userId }: ICreateGroupProps) {
	const result = await GroupsRepository.createGroup(name, userId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true, group: result.data };
}

export async function deleteGroupAction({ groupId }: IDeleteGroupProps) {
	const result = await GroupsRepository.deleteGroup(groupId);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true };
}
