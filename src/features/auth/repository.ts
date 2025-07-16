import { supabaseServer } from '@/lib/server';
import { Provider, User } from '@supabase/supabase-js';

export interface IAuthRepository {
	signInWithEmailAndPassword(
		email: string,
		password: string,
	): Promise<
		{ success: true; user: { id: string; email: string } } | { success: false; error: string }
	>;
	signInWithGoogle(): Promise<
		{ success: true; data: { provider: Provider; url: string } } | { success: false; error: string }
	>;
	logOut(): Promise<{ success: true } | { success: false; error: string }>;
	signUp(
		email: string,
		password: string,
	): Promise<{ success: true; user: User | null } | { success: false; error: string }>;
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
	async signInWithGoogle() {
		const supabase = await supabaseServer();

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login/callback`,
			},
		});

		if (error) return { success: false, error: error.message };

		return { success: true, data };
	},
	async logOut() {
		const supabase = await supabaseServer();

		const { error } = await supabase.auth.signOut();

		if (error) return { success: false, error: error.message };

		return { success: true };
	},
	async signUp(email, password) {
		const supabase = await supabaseServer();

		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) return { success: false, error: error.message };

		return {
			success: true,
			user: data?.user,
		};
	},
};
