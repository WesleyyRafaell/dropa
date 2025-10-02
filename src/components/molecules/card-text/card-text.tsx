import { Card } from '@/components/atoms';
import React from 'react';

interface ICardTextProps {
	title?: string;
	text?: string;
}

const CardText = ({ text }: ICardTextProps) => {
	return (
		<Card>
			<textarea
				className="textarea h-24 bg-transparent
				 border-white textarea-md  focus:shadow-none
				 focus:outline-none focus:ring-0 text-white"
				value={text}
				placeholder="Bio"
			></textarea>
		</Card>
	);
};

export default CardText;
