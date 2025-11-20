import { create } from 'zustand';

interface ICurrentLimiteUploadSizeStoreProps {
	currentLimiteUploadSize: number;
	setCurrentLimiteUploadSize: (currentLimite: number) => void;
}

export const CurrentLimiteUploadSizeStore = create<ICurrentLimiteUploadSizeStoreProps>()((set) => ({
	currentLimiteUploadSize: 0,
	setCurrentLimiteUploadSize: (currentLimite) => set({ currentLimiteUploadSize: currentLimite }),
}));
