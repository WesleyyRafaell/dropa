import { SupabaseAuthRepository } from './repository';

export async function loginWithEmailAndPassword(email: string, password: string) {
	return await SupabaseAuthRepository.signInWithEmailAndPassword(email, password);
}
