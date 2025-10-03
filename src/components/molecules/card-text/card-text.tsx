'use client';

import { Card } from '@/components/atoms';
import React, { useState } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';

interface ICardTextProps {
	text?: string;
	reminderId: string;
	loadingDeleteReminder: boolean;
	deleteReminder: (id: string) => void;
	editGroup: (content: string, reminderId: string) => void;
}

const CardText = ({
	text,
	reminderId,
	loadingDeleteReminder,
	deleteReminder,
	editGroup,
}: ICardTextProps) => {
	const [inputValue, setInputValue] = useState(text);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;

		setInputValue(value);
		editGroup?.(value, reminderId ?? '');
	};

	return (
		<div className="indicator group w-48">
			<span
				onClick={() => {
					(document.getElementById(reminderId || '') as HTMLDialogElement)?.showModal();
				}}
				className="indicator-item badge  badge-primary cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<BsTrash3Fill />
			</span>
			<Card className="mt-3.5">
				<textarea
					className="textarea h-24 bg-transparent
					border-white textarea-md  focus:shadow-none
					focus:outline-none focus:ring-0 text-white"
					value={inputValue}
					onChange={handleInputChange}
				></textarea>
			</Card>

			<dialog id={reminderId} className="modal">
				<div className="modal-box">
					{loadingDeleteReminder ? (
						<div className="h-40 flex justify-center items-center">
							<span className="loading loading-ring loading-xl text-primary text-2xl"></span>
						</div>
					) : null}

					{!loadingDeleteReminder ? (
						<div className="h-40">
							<h3 className="font-bold text-lg">Hello!</h3>
							<p className="py-4">Deseja deletar este lembrete?</p>
							<p className="font-light text-[14px]">Esta ação é irreversível</p>
							<div className="modal-action">
								<button className="btn btn-primary" onClick={() => deleteReminder(reminderId)}>
									Deletar
								</button>
								<form method="dialog">
									<button className="btn btn-outline btn-accent">Cancelar</button>
								</form>
							</div>
						</div>
					) : null}
				</div>
			</dialog>
		</div>
	);
};

export default CardText;
