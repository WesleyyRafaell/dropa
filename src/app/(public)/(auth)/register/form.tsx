'use client';

import { signUpAction } from '@/features/auth/action';
import { registerTypeSchema, signUpSchema } from '@/features/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<registerTypeSchema>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = (data: registerTypeSchema) => {
		startTransition(async () => {
			const result = await signUpAction(data?.email, data?.password);

			if (!result.success) {
				toast.error(result?.error);
				return;
			}

			toast.success('Verifique seu e-mail');
			router.push('/login');
		});
	};

	return (
		<div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
			<h2 className="text-2xl font-bold text-white mb-6 text-center">Criar conta</h2>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Email Field */}
				<div>
					<label htmlFor="email" className="block text-white text-sm font-medium mb-2">
						Email
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Mail className="h-5 w-5 text-blue-300" />
						</div>
						<input
							id="email"
							type="email"
							{...register('email')}
							className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
							placeholder="Insira seu email"
							required
						/>
					</div>
					{errors.email && <p className="mt-1.5 text-error">{errors.email.message}</p>}
				</div>

				{/* Password Field */}
				<div>
					<label htmlFor="password" className="block text-white text-sm font-medium mb-2">
						Senha
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Lock className="h-5 w-5 text-blue-300" />
						</div>
						<input
							id="password"
							{...register('password')}
							type={showPassword ? 'text' : 'password'}
							className="w-full pl-12 pr-12 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
							placeholder="Insira a sua senha"
						/>
						<button
							onClick={() => setShowPassword(!showPassword)}
							type="button"
							className="absolute inset-y-0 right-0 pr-4 flex items-center"
						>
							{showPassword ? (
								<EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
							) : (
								<Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
							)}
						</button>
					</div>
					{errors.password && <p className="mt-1.5 text-error">{errors.password.message}</p>}
				</div>

				{/* Confirm Password Field */}
				<div>
					<label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
						Confirmar senha
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Lock className="h-5 w-5 text-blue-300" />
						</div>
						<input
							id="confirmPassword"
							{...register('confirmPassword')}
							type={showPassword ? 'text' : 'password'}
							className="w-full pl-12 pr-12 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
							placeholder="Confirme a sua senha"
						/>
						<button
							onClick={() => setShowPassword(!showPassword)}
							type="button"
							className="absolute inset-y-0 right-0 pr-4 flex items-center"
						>
							{showPassword ? (
								<EyeOff className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
							) : (
								<Eye className="h-5 w-5 text-blue-300 hover:text-white transition-colors" />
							)}
						</button>
					</div>
					{errors.confirmPassword && (
						<p className="mt-1.5 text-error">{errors.confirmPassword.message}</p>
					)}
				</div>

				{/* Terms and Conditions */}
				{/* <div className="flex items-start">
					<input
						type="checkbox"
						className="w-4 h-4 mt-1 rounded border-white/30 bg-white/20 text-blue-600 focus:ring-blue-400 focus:ring-2"
						required
					/>
					<span className="ml-2 text-sm text-blue-100">
						I agree to the{' '}
						<a href="#" className="text-white hover:text-blue-200 transition-colors">
							Terms of Service
						</a>{' '}
						and{' '}
						<a href="#" className="text-white hover:text-blue-200 transition-colors">
							Privacy Policy
						</a>
					</span>
				</div> */}

				{/* Create Account Button */}
				{isPending ? (
					<div className="w-full flex justify-center">
						<span className="loading loading-spinner text-secondary"></span>
					</div>
				) : (
					<button
						disabled={isPending}
						type="submit"
						className="w-full cursor-pointer bg-white text-blue-900 hover:bg-blue-50 py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
					>
						Criar conta
					</button>
				)}
			</form>

			{/* Divider */}
			<div className="my-6 flex items-center">
				<div className="flex-1 border-t border-white/30"></div>
				<span className="px-4 text-blue-200 text-sm">Ou logar com</span>
				<div className="flex-1 border-t border-white/30"></div>
			</div>

			{/* Social Registration */}
			<div className="grid grid-cols-1 gap-4 mb-6">
				<button
					disabled={isPending}
					onClick={() => router.push('/login/google')}
					className="flex cursor-pointer w-full items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-lg transition-all"
				>
					<svg className="h-5 w-5" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="currentColor"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="currentColor"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="currentColor"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Google
				</button>
			</div>

			{/* Sign In Link */}
			<p className="text-center text-blue-200">
				Já possui uma conta?{' '}
				<a href="/login" className="text-white hover:text-blue-200 font-semibold transition-colors">
					Login
				</a>
			</p>
		</div>
	);
};
