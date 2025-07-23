import Link from 'next/link';

interface ILogoProps {
	type?: 'primary' | 'secondary';
}

const Logo = ({ type = 'primary' }: ILogoProps) => {
	const getLogoUi = () => {
		if (type === 'secondary')
			return (
				<h1 className="text-3xl font-bold text-gray-900">
					<span className="bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent">
						Dropa
					</span>
				</h1>
			);

		return (
			<h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
				Dropa
			</h1>
		);
	};
	return (
		<Link href="/" className="inline-block">
			{getLogoUi()}
		</Link>
	);
};

export default Logo;
