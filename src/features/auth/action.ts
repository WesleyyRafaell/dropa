'use server';

import { redirect } from 'next/navigation';
import { SupabaseAuthRepository } from './repository';

interface ILoginActionProps {
	email: string;
	password: string;
}

export async function loginWithEmailAndPasswordAction({ email, password }: ILoginActionProps) {
	const result = await SupabaseAuthRepository.signInWithEmailAndPassword(email, password);

	if (!result.success) {
		return { success: false, error: result.error };
	}

	return { success: true };
}

export async function loginWithGoogleAction() {
	const result = await SupabaseAuthRepository.signInWithGoogle();

	if (!result.success) return { success: false, error: result.error };

	return { success: true, data: result.data };
}

export async function logOutAction() {
	const result = await SupabaseAuthRepository.logOut();

	if (!result.success) return { success: false, error: result.error };

	redirect('/');
}

export async function signUpAction(email: string, password: string) {
	const result = await SupabaseAuthRepository.signUp(email, password);

	if (!result.success) return { success: false, error: result.error };

	return { success: true };
}
