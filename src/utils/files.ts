export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const sanitizeFileName = (name: string) => {
	return name
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-zA-Z0-9._-]/g, '_')
		.replace(/\s+/g, '_');
};

export const formatFileSize = (bytes: number) => {
	if (bytes === 0) return '0 Bytes';

	const k = 1000;
	const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	const value = (bytes / Math.pow(k, i)).toFixed(1);
	return value.replace('.', ',') + ' ' + sizes[i];
};
