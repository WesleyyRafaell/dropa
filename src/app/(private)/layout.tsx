import { redirect } from 'next/navigation';
import { UserClientBridge } from './user-client-bridge';
import { getUserAction } from '@/features/auth/action';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
	const user = await getUserAction();

	if (user?.error || !user.data) redirect('/login');

	return (
		<>
			<UserClientBridge user={user?.data} />
			{children}
		</>
	);
}
