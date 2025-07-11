'use server';

import { loginWithEmailAndPassword } from './service';
import { redirect } from 'next/navigation';

interface ILoginActionProps {
	email: string;
	password: string;
}

export async function loginAction({ email, password }: ILoginActionProps) {
	const result = await loginWithEmailAndPassword(email, password);

	if (!result.success) return { success: false, error: result.error };

	redirect('/'); // ou para alguma dashboard
}
