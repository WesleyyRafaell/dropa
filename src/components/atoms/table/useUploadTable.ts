import { getFilesByGroupAction, uploadGroupFilesAction } from '@/features/groups/action';
import { getAllFilesResponse } from '@/features/groups/models';
import { FileManagerPanelStore } from '@/store/file-manager-panel-store';

import { useUserStore } from '@/store/user-store';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const useUploadTable = () => {
	const { groupId } = FileManagerPanelStore();
	const [uploadingItens, setUploadingItens] = useState<string[]>([]);
	const [filesByGroup, setFilesByGroup] = useState<getAllFilesResponse[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { user } = useUserStore();

	useEffect(() => {
		getAllFilesByGroup(groupId);
	}, [groupId]);

	const getAllFilesByGroup = async (groupId: string) => {
		const result = await getFilesByGroupAction(groupId);

		if (result?.error || !result?.data) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			return;
		}

		setFilesByGroup(result?.data);
	};

	const handleUploadFiles = async (groupId: string, files: FileList | null) => {
		if (!files) return;

		for (const file of files) {
			setUploadingItens((prev) => [...prev, file?.name]);
		}

		const formData = new FormData();

		for (const file of Array.from(files)) {
			formData.append('files', file);
		}

		const result = await uploadGroupFilesAction({ userId: user?.id || '', groupId, formData });

		if (result?.error) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			return;
		}

		toast.success('Sucesso no upload S2');
		setUploadingItens([]);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return {
		uploadingItens,
		fileInputRef,
		filesByGroup,
		handleUploadFiles,
	};
};

export default useUploadTable;
