import { create } from 'zustand';

interface IFileManagerPanelStoreProps {
	groupId: string;
	groupName: string;
	setGroupId: (id: string) => void;
	setGroupName: (name: string) => void;
}

export const FileManagerPanelStore = create<IFileManagerPanelStoreProps>()((set) => ({
	groupId: '',
	groupName: '',
	setGroupId: (groupId) => set({ groupId }),
	setGroupName: (name) => set({ groupName: name }),
}));
