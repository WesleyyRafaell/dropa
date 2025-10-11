import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatIsoToDate = (isoDate: string) => {
	const formatted = format(parseISO(isoDate), 'dd/MM/yyyy, HH:mm', {
		locale: ptBR,
	});

	return formatted;
};
