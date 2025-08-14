'use client';

import { createGroupAction } from '@/features/groups/action';
import { useState, useTransition } from 'react';
import { IViewProps } from './view';
import { useUserStore } from '@/store/user-store';

const useDashboard = ({ groups }: IViewProps) => {
	const { user } = useUserStore();
	const [isPending, startTransition] = useTransition();
	const [groupList, setGroupList] = useState(groups);

	const handleCreteNewGroup = () => {
		startTransition(async () => {
			const result = await createGroupAction({
				name: 'Novo card',
				userId: user?.id || '',
			});

			if (result?.success && result?.group) {
				setGroupList((prev) => [result.group, ...(prev ?? [])]);
			}
		});
	};

	return {
		isPending,
		groupList,
		handleCreteNewGroup,
	};
};

export default useDashboard;
