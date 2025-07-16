import { z } from 'zod';

export const loginSchema = z.object({
	email: z.email({ message: 'E-mail inválido' }),
	password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});

export const signUpSchema = z
	.object({
		email: z.email({ message: 'E-mail inválido' }),
		password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'As senhas não coincidem',
	});

export type loginTypeSchema = z.infer<typeof loginSchema>;

export type registerTypeSchema = z.infer<typeof signUpSchema>;
