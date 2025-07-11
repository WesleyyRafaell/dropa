import { supabaseServer } from '@/lib/server';

export async function getUserSession() {
	const supabase = await supabaseServer();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
}
