import { Card } from '@/components/atoms';
import React from 'react';
import { VscNewFolder } from 'react-icons/vsc';

interface INewCardProps {
	createNewReminder: () => void;
	isPendingCreateNewReminder: boolean;
}

const NewCard = ({ createNewReminder, isPendingCreateNewReminder }: INewCardProps) => {
	return (
		<Card className="cursor-pointer" onClick={createNewReminder}>
			{isPendingCreateNewReminder ? (
				<div className="h-full flex justify-center items-center">
					<span className="loading loading-ring loading-xl text-white text-2xl"></span>
				</div>
			) : null}

			{!isPendingCreateNewReminder ? (
				<>
					<h2 className="card-title">Novo lembrete</h2>
					<div className="flex justify-center p-5">
						<VscNewFolder className="text-white text-3xl" />
					</div>
				</>
			) : null}
		</Card>
	);
};

export default NewCard;
