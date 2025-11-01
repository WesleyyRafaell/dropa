export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export const sanitizeFileName = (name: string) => {
	return name
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-zA-Z0-9._-]/g, '_')
		.replace(/\s+/g, '_');
};
