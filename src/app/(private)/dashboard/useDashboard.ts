'use client';

import { createGroupAction, deleteGroupAction, editGroupAction } from '@/features/groups/action';
import { useState, useTransition } from 'react';
import { IViewProps } from './view';
import { useUserStore } from '@/store/user-store';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';

const useDashboard = ({ groups }: IViewProps) => {
	const { user } = useUserStore();
	const [isPending, startTransition] = useTransition();
	const [, startTransitionEdit] = useTransition();
	const [groupList, setGroupList] = useState(groups);

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
				return;
			}
		});
	};

	return {
		isPending,
		groupList,
		handleCreteNewGroup,
		handleEditNewGroup,
		handleDeleteGroup,
	};
};

export default useDashboard;
