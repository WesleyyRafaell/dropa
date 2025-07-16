import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const publicRoutes = [
	{ path: '/login', whenAuthenticated: 'redirect' },
	{ path: '/login/google', whenAuthenticated: 'redirect' },
	{ path: '/login/callback', whenAuthenticated: 'redirect' },
	{ path: '/register', whenAuthenticated: 'redirect' },
	{ path: '/', whenAuthenticated: 'next' },
] as const;

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const publicPath = publicRoutes.find((route) => route.path === path);

	// ✅ Crie uma única instância de resposta
	const res = NextResponse.next();

	// ✅ Use essa resposta para setar cookies
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

	// 🧠 Lógica da rota
	if (!isAuth && publicPath) return res;

	if (!isAuth && !publicPath) return NextResponse.redirect(new URL('/login', req.url));

	if (isAuth && publicPath?.whenAuthenticated === 'redirect')
		return NextResponse.redirect(new URL('/dashboard', req.url));

	return res;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
