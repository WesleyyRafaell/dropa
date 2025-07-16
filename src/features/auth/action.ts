'use server';

import { loginWithEmailAndPassword, loginWithGoogle, logOut, signUp } from './service';
import { redirect } from 'next/navigation';

interface ILoginActionProps {
	email: string;
	password: string;
}

export async function loginWithEmailAndPasswordAction({ email, password }: ILoginActionProps) {
	const result = await loginWithEmailAndPassword(email, password);

	if (!result.success) return { success: false, error: result.error };

	redirect('/');
}

export async function loginWithGoogleAction() {
	const result = await loginWithGoogle();

	if (!result.success) return { success: false, error: result.error };

	return { success: true, data: result.data };
}

export async function logOutAction() {
	const result = await logOut();

	if (!result.success) return { success: false, error: result.error };

	redirect('/');
}

export async function signUpAction(email: string, password: string) {
	const result = await signUp(email, password);

	if (!result.success) return { success: false, error: result.error };
}
