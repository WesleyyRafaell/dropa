'use client';

import { createGroupAction, deleteGroupAction, editGroupAction } from '@/features/groups/action';
import { useEffect, useState, useTransition } from 'react';
import { IViewProps } from './view';
import { useUserStore } from '@/store/user-store';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { FileManagerPanelStore } from '@/store/file-manager-panel-store';
import { IGroup } from '@/features/groups/models';

const useDashboard = ({ groups }: IViewProps) => {
	const { user } = useUserStore();
	const [isPending, startTransition] = useTransition();
	const [, startTransitionEdit] = useTransition();
	const [groupList, setGroupList] = useState(groups || []);
	const { setGroupId, setGroupName, groupId } = FileManagerPanelStore();

	useEffect(() => {
		if (!groupId) {
			selectFirstGroup();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupId]);

	const handleCreteNewGroup = () => {
		startTransition(async () => {
			const result = await createGroupAction({
				name: 'Novo card',
				userId: user?.id || '',
			});

			if (result?.error) {
				toast.error(result?.error || 'Foi mal, algum erro aconteceu na criação.');
			}

			if (result?.success && result?.group) {
				setGroupList((prev) => [result.group, ...(prev ?? [])]);
				toast.success('Sucesso ao criar grupo.');
			}
		});
	};

	const handleEditNewGroup = useDebouncedCallback((idGroup: string, newNameGroup: string) => {
		setGroupName(newNameGroup);
		startTransitionEdit(async () => {
			const result = await editGroupAction({
				userId: idGroup,
				name: newNameGroup,
			});

			if (result?.error) {
				toast.error(result?.error || 'Foi mal, algum erro aconteceu na edição.');
			}
			if (result?.success) {
				toast.success('Nome do grupo editado.');
			}
		});
	}, 800);

	const handleDeleteGroup = (id: string) => {
		const groups = groupList?.filter((group) => group?.id !== id);
		setGroupList(groups);
		startTransition(async () => {
			const result = await deleteGroupAction({
				groupId: id,
			});

			if (result?.error) {
				toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			}

			if (result?.success) {
				toast.success('Sucesso ao apagar grupo.');
				if (id === groupList[groupList.length - 1].id) {
					selectLastGroup(groups);
				}
				return;
			}
		});
	};

	const selectLastGroup = (groups: IGroup[] | undefined) => {
		const lastGroup = groups && groups.length > 0 ? groups[groups.length - 1] : null;

		if (!lastGroup?.id) return;

		handleSelectGroup(lastGroup?.id, lastGroup?.name);
	};

	const selectFirstGroup = () => {
		const firstGroup = groupList && groupList.length > 0 ? groupList[0] : null;

		if (!firstGroup?.id) return;

		handleSelectGroup(firstGroup?.id, firstGroup?.name);
	};

	const handleSelectGroup = (id: string, name: string) => {
		setGroupId(id);
		setGroupName(name || '');
	};

	return {
		isPending,
		groupList,
		handleCreteNewGroup,
		handleEditNewGroup,
		handleDeleteGroup,
		handleSelectGroup,
	};
};

export default useDashboard;
