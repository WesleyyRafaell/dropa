import { FileManagerPanelStore } from '@/store/file-manager-panel-store';

import { useUserStore } from '@/store/user-store';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadGroupFilesAction } from '@/features/files/action-client';
import { getFilesByGroupAction } from '@/features/files/action-server';
import { getAllFilesResponse } from '@/features/files/models';

const useUploadTable = () => {
	const { groupId } = FileManagerPanelStore();
	const [uploadingItens, setUploadingItens] = useState<string[]>([]);
	const [filesByGroup, setFilesByGroup] = useState<getAllFilesResponse[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [filesLoading, setFilesLoading] = useState(false);
	const { user } = useUserStore();

	useEffect(() => {
		getAllFilesByGroup(groupId);
	}, [groupId]);

	const getAllFilesByGroup = async (groupId: string) => {
		setFilesLoading(true);
		const result = await getFilesByGroupAction(groupId);
		setFilesLoading(false);

		console.log(`result`, result);

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

		if (result?.error || !result?.data) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			setUploadingItens([]);
			return;
		}

		setFilesByGroup((prevState) => [...result?.data, ...prevState]);
		toast.success('Sucesso no upload ❤️');
		setUploadingItens([]);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return {
		filesLoading,
		uploadingItens,
		fileInputRef,
		filesByGroup,
		handleUploadFiles,
	};
};

export default useUploadTable;
