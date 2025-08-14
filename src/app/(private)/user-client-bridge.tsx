'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/user-store';
import { User } from '@supabase/supabase-js';

interface Props {
	user: User;
}

export function UserClientBridge({ user }: Props) {
	const { setUser, user: UserStore } = useUserStore();

	useEffect(() => {
		if (UserStore) return;

		setUser({ id: user?.id, ...user?.user_metadata });
	}, [user, setUser, UserStore]);

	return null;
}
