import { uploadGroupFilesAction } from '@/features/groups/action';

import { useUserStore } from '@/store/user-store';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';

const useUploadTable = () => {
	const [uploaded, setUploaded] = useState<any[]>([]);
	const [isPending, startTransition] = useTransition();
	const { user } = useUserStore();

	const handleUploadFiles = (groupId: string, files: FileList | null) => {
		if (!files) return;

		const formData = new FormData();

		for (const file of Array.from(files)) {
			formData.append('files', file);
		}

		startTransition(async () => {
			const result = await uploadGroupFilesAction({ userId: user?.id || '', groupId, formData });
			console.log(`result`, result);
			// setUploaded(result);
		});
	};

	return {
		isPending,
		handleUploadFiles,
	};
};

export default useUploadTable;
