import { Card } from '@/components/atoms';
import React from 'react';

interface ICardTextProps {
	title?: string;
	text?: string;
}

const CardText = ({ title, text }: ICardTextProps) => {
	return (
		<Card>
			<h2 className="card-title">{title}</h2>
			<p>{text}</p>
		</Card>
	);
};

export default CardText;
