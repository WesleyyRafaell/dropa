import { getFilesByUserIdAction } from '@/features/files/action-server';
import { CurrentLimiteUploadSizeStore } from '@/store/current-limit-upload-size';
import { useUserStore } from '@/store/user-store';

const useGetLimitUploadFiles = () => {
	const { user } = useUserStore();
	const { setCurrentLimiteUploadSize } = CurrentLimiteUploadSizeStore();

	const updateCurrentUserLimitUploadSize = async () => {
		const result = await getFilesByUserIdAction(user?.id || '');

		if (result?.error || !result.data) return;

		const totalFilesSize = result?.data.reduce((acc, cur) => acc + cur.size, 0);

		setCurrentLimiteUploadSize(totalFilesSize);
	};

	return {
		updateCurrentUserLimitUploadSize,
	};
};

export default useGetLimitUploadFiles;
