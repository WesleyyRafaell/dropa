import { Card } from '@/components/atoms';
import React from 'react';
import { VscNewFolder } from 'react-icons/vsc';

const NewCard = () => {
	return (
		<Card className="cursor-pointer">
			<h2 className="card-title">Novo lembrete</h2>
			<div className="flex justify-center p-5">
				<VscNewFolder className="text-white text-3xl" />
			</div>
		</Card>
	);
};

export default NewCard;
