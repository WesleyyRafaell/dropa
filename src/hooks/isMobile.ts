import { useEffect, useState } from 'react';

export function useIsMobile() {
	const query = '(max-width: 768px)';

	const getMatch = () => typeof window !== 'undefined' && window.matchMedia(query).matches;

	const [isMobile, setIsMobile] = useState(getMatch);

	useEffect(() => {
		const media = window.matchMedia(query);

		const handler = () => setIsMobile(media.matches);

		handler();

		media.addEventListener('change', handler);

		return () => media.removeEventListener('change', handler);
	}, []);

	return isMobile;
}
