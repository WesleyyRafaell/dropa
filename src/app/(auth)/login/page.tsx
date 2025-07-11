import LoginForm from './form';

const Login = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-700 flex items-center justify-center px-4 py-8">
			<div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
			<div
				className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce"
				style={{ animationDelay: '1s' }}
			></div>
			<div
				className="absolute bottom-40 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce"
				style={{ animationDelay: '2s' }}
			></div>

			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
						Dropa
					</h1>

					<p className="text-blue-100 mt-2">Welcome back</p>
				</div>

				{/* Login Form */}
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
