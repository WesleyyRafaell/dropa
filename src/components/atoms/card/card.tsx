import { cn } from '@/utils/cn';
import React, { PropsWithChildren } from 'react';

interface ICardProps extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const Card = ({ className, children, ...props }: ICardProps) => {
	return (
		<div className={cn('card bg-primary text-primary-content', className)} {...props}>
			<div className="card-body">{children}</div>
		</div>
	);
};

export default Card;
