import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll: () => req.cookies.getAll(),
				setAll: (cookies) => {
					cookies.forEach(({ name, value, options }) => {
						res.cookies.set(name, value, options);
					});
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const isAuth = !!user;
	const isLoginPage = req.nextUrl.pathname === '/login';

	// Se não autenticado e tentando acessar rota privada
	if (!isAuth && !isLoginPage) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	// Se autenticado e acessando login, redireciona pra /
	if (isAuth && isLoginPage) {
		return NextResponse.redirect(new URL('/', req.url));
	}

	return res;
}

export const config = {
	matcher: ['/dashboard'],
};
