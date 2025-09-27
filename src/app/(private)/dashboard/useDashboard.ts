'use client';

import { createGroupAction, deleteGroupAction, editGroupAction } from '@/features/groups/action';
import { useState, useTransition } from 'react';
import { IViewProps } from './view';
import { useUserStore } from '@/store/user-store';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { FileManagerPanelStore } from '@/store/file-manager-panel-store';

const useDashboard = ({ groups }: IViewProps) => {
	const { user } = useUserStore();
	const [isPending, startTransition] = useTransition();
	const [loadingDeleteGroup, setLoadingDeleteGroup] = useState(false);
	const [, startTransitionEdit] = useTransition();
	const [groupList, setGroupList] = useState(groups || []);
	const { setGroupId, setGroupName } = FileManagerPanelStore();

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

	const handleDeleteGroup = async (id: string) => {
		setLoadingDeleteGroup(true);

		const result = await deleteGroupAction({
			groupId: id,
		});

		if (result?.error) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
		}

		if (result?.success) {
			toast.success('Sucesso ao apagar grupo.');
			const groups = groupList?.filter((group) => group?.id !== id);

			setGroupList(groups);
			setGroupId('');
			setGroupName('');
			setLoadingDeleteGroup(false);
			return;
		}
		setLoadingDeleteGroup(false);
	};

	const handleSelectGroup = (id: string, name: string) => {
		setGroupId(id);
		setGroupName(name || '');
	};

	return {
		isPending,
		loadingDeleteGroup,
		groupList,
		handleCreteNewGroup,
		handleEditNewGroup,
		handleDeleteGroup,
		handleSelectGroup,
	};
};

export default useDashboard;
