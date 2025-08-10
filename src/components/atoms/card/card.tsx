import { cn } from '@/utils/cn';
import React, { PropsWithChildren } from 'react';

interface ICardProps extends PropsWithChildren {
	className?: string;
}

const Card = ({ className, children }: ICardProps) => {
	return (
		<div className={cn('card bg-primary text-primary-content', className)}>
			<div className="card-body">{children}</div>
		</div>
	);
};

export default Card;
