import { RegisterForm } from './form';
import { supabaseServer } from '@/lib/server';
import { redirect } from 'next/navigation';

const Register = async () => {
	const supabase = await supabaseServer();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) redirect('/dashboard');

	return <RegisterForm />;
};

export default Register;
