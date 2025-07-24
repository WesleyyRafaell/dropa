import { supabaseServer } from '@/lib/server';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
	const supabase = await supabaseServer();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect('/login');

	return <>{children}</>;
}
