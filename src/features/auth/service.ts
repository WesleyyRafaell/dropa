import { SupabaseAuthRepository } from './repository';

export async function loginWithEmailAndPassword(email: string, password: string) {
	return await SupabaseAuthRepository.signInWithEmailAndPassword(email, password);
}

export async function loginWithGoogle() {
	return await SupabaseAuthRepository.signInWithGoogle();
}

export async function logOut() {
	return await SupabaseAuthRepository.logOut();
}

export async function signUp(email: string, password: string) {
	return await SupabaseAuthRepository.signUp(email, password);
}
