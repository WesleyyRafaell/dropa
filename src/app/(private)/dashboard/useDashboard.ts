'use client';

import { createGroupAction } from '@/features/groups/action';
import { useState, useTransition } from 'react';
import { IViewProps } from './view';

const useDashboard = ({ groups }: IViewProps) => {
	const [isPending, startTransition] = useTransition();
	const [groupList, setGroupList] = useState(groups);

	const handleCreteNewGroup = () => {
		startTransition(async () => {
			const result = await createGroupAction({
				name: 'Novo card',
				userId: 'f2b72014-1c53-45ca-814f-3dc4bf2f3519',
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
