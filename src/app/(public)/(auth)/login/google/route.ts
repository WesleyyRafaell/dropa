import { NextRequest, NextResponse } from 'next/server';
import { loginWithGoogleAction } from '../../../../../features/auth/action';

export async function GET(request: NextRequest) {
	const { data, error, success } = await loginWithGoogleAction();

	if (!success && error) {
		return NextResponse.redirect(new URL('/login?error=oauth', request.url));
	}

	return NextResponse.redirect(data?.url || '');
}
