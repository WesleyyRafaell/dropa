import Link from 'next/link';

const Logo = () => {
	return (
		<Link href="/">
			<h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
				Dropa
			</h1>
		</Link>
	);
};

export default Logo;
