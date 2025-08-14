import { supabaseServer } from '@/lib/server';
import { redirect } from 'next/navigation';
import { UserClientBridge } from './user-client-bridge';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
	const supabase = await supabaseServer();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect('/login');

	return (
		<>
			<UserClientBridge user={user} />
			{children}
		</>
	);
}
