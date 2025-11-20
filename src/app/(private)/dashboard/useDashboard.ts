'use client';

import { createGroupAction, deleteGroupAction, editGroupAction } from '@/features/groups/action';
import { useEffect, useState, useTransition } from 'react';
import { IViewProps } from './view';
import { useUserStore } from '@/store/user-store';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { FileManagerPanelStore } from '@/store/file-manager-panel-store';
import { logOutAction } from '@/features/auth/action';
import { redirect } from 'next/navigation';
import useGetLimitUploadFiles from '@/hooks/getLimitUploadFiles';

const useDashboard = ({ groups }: IViewProps) => {
	const { updateCurrentUserLimitUploadSize } = useGetLimitUploadFiles();
	const { user } = useUserStore();
	const [isPending, startTransition] = useTransition();
	const [loadingDeleteGroup, setLoadingDeleteGroup] = useState(false);
	const [, startTransitionEdit] = useTransition();
	const [groupList, setGroupList] = useState(groups || []);
	const { setGroupId, setGroupName } = FileManagerPanelStore();

	useEffect(() => {
		updateCurrentUserLimitUploadSize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

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
				groupId: idGroup,
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

	const logOut = async () => {
		const result = await logOutAction();

		if (result?.error) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
		}

		toast.success('Você saiu com sucesso');
		redirect('/');
	};

	return {
		isPending,
		loadingDeleteGroup,
		groupList,
		logOut,
		handleCreteNewGroup,
		handleEditNewGroup,
		handleDeleteGroup,
		handleSelectGroup,
	};
};

export default useDashboard;
