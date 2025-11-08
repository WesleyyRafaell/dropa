import { FileManagerPanelStore } from '@/store/file-manager-panel-store';

import { useUserStore } from '@/store/user-store';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadGroupFilesAction } from '@/features/files/action-client';
import {
	deleteFileAction,
	getFileDownloadUrlAction,
	getFilesByGroupAction,
} from '@/features/files/action-server';
import { getAllFilesResponse } from '@/features/files/models';
import CustomProgressBar from '../../atoms/custom-toast/custom-toast';
import { copyText } from '@/utils/text';

const useUploadTable = () => {
	const { groupId } = FileManagerPanelStore();
	const [uploadingItens, setUploadingItens] = useState<string[]>([]);
	const [filesByGroup, setFilesByGroup] = useState<getAllFilesResponse[]>([]);
	const [filesLoading, setFilesLoading] = useState(false);
	const [deleteFilesLoading, setDeleteFilesLoading] = useState(false);
	const { user } = useUserStore();

	useEffect(() => {
		getAllFilesByGroup(groupId);
	}, [groupId]);

	const getAllFilesByGroup = async (groupId: string) => {
		setFilesLoading(true);
		const result = await getFilesByGroupAction(groupId);
		setFilesLoading(false);

		if (result?.error || !result?.data) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			return;
		}

		setFilesByGroup(result?.data);
	};

	const handleUploadFiles = async (groupId: string, files: File[] | null) => {
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
	};

	const getFileDownloadUrl = async (path: string, toastMessage: string) => {
		const id = toast(CustomProgressBar, {
			progress: 0,
			customProgressBar: true,
			closeButton: false,
			data: {
				message: toastMessage,
			},
		});

		toast.update(id, {
			progress: 0.5,
		});

		const result = await getFileDownloadUrlAction(path);

		toast.done(id);

		return result;
	};

	const getCopyFile = async (path: string) => {
		const toastMessage = 'Estamos buscando seu link, só um momento';

		const result = await getFileDownloadUrl(path, toastMessage);

		if (result?.error || !result?.data) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			return;
		}

		// const shortUrl = await getShortLinkAction(result?.data);

		// if (!shortUrl.data) {
		// 	toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
		// 	return;
		// }

		// const success = copyText(shortUrl?.data?.link || '');
		const success = copyText(result?.data || '');

		if (!success) {
			toast.error('Não foi possível copiar o link');
			return;
		}

		toast.success('Link de download copiado');
	};

	const downloadFile = async (path: string) => {
		const toastMessage = 'Seu download começará em breve.';

		const result = await getFileDownloadUrl(path, toastMessage);

		if (result?.error || !result?.data) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			return;
		}

		const link = document.createElement('a');
		link.href = result?.data;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const deleteFile = async (id: string, path: string) => {
		setDeleteFilesLoading(true);
		const result = await deleteFileAction(id, path);

		if (result?.error) {
			toast.error(result?.error || 'Foi mal, algum erro aconteceu.');
			setDeleteFilesLoading(false);
			return;
		}

		toast.success('Sucesso na remoção do arquivo');
		setDeleteFilesLoading(false);
		getAllFilesByGroup(groupId);
	};

	return {
		uploadingItens,
		filesByGroup,
		filesLoading,
		deleteFilesLoading,
		handleUploadFiles,
		downloadFile,
		deleteFile,
		getCopyFile,
	};
};

export default useUploadTable;
