'use server';

interface ICreateGroupProps {
	name: string;
	userId: string;
}

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
