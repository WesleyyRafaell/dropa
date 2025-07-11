'use client';

import { IButtonLinkProps } from '@/types/components';
import { ArrowRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import clsx from 'clsx';

const styleMap = {
	primary: {
		className: 'bg-white text-blue-900 hover:bg-blue-50 transform hover:scale-105',
		icon: <ArrowRight className="h-5 w-5" />,
	},
	secondary: {
		className: 'border-2 border-white text-white hover:bg-white hover:text-blue-900',
		icon: null,
	},
} as const;

const ButtonLink = ({ link, text, type = 'primary' }: IButtonLinkProps) => {
	const style = styleMap[type] || styleMap.primary;

	const baseClass =
		'cursor-pointer text-lg px-8 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2';

	return (
		<button onClick={() => redirect(link)} className={clsx(baseClass, style.className)}>
			{text}
			{style.icon}
		</button>
	);
};

export default ButtonLink;
