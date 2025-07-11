import { supabaseServer } from '@/lib/server';

export interface IAuthRepository {
	signInWithEmailAndPassword(
		email: string,
		password: string,
	): Promise<
		{ success: true; user: { id: string; email: string } } | { success: false; error: string }
	>;
}

export const SupabaseAuthRepository: IAuthRepository = {
	async signInWithEmailAndPassword(email, password) {
		const supabase = await supabaseServer();

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			user: { id: data.user.id, email: data.user.email! },
		};
	},
};
