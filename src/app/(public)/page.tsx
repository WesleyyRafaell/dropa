import { ButtonLink } from '@/components/atoms';
import { ArrowRight, Upload, FileText, Image, FolderOpen, Share2, Star, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Background Gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-700"></div>

				{/* Floating Elements */}
				<div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
				<div
					className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce"
					style={{ animationDelay: '1s' }}
				></div>
				<div
					className="absolute bottom-40 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce"
					style={{ animationDelay: '2s' }}
				></div>

				<div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
					<div className="animate-fade-in">
						<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
							Armazene simples
							<br />
							<span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
								rápido e facil.
							</span>
						</h1>

						<p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
							Dropa facilita o armazenamento seguro de seus textos, fotos e arquivos. Acesse tudo de
							qualquer lugar, a qualquer hora.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
							<ButtonLink link="/login" text="Login" />

							<ButtonLink type="secondary" link="/register" text="Cadastro" />
						</div>

						{/* Feature Icons */}
						<div className="flex justify-center gap-8 md:gap-16 mb-16">
							<div className="text-center group">
								<div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
									<FileText className="h-8 w-8" />
								</div>
								<p className="text-sm font-medium">Textos</p>
							</div>
							<div className="text-center group">
								<div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
									<Image className="h-8 w-8" />
								</div>
								<p className="text-sm font-medium">Fotos</p>
							</div>
							<div className="text-center group">
								<div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
									<Upload className="h-8 w-8" />
								</div>
								<p className="text-sm font-medium">Arquivos</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			{/* <section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
							Why Choose{' '}
							<span className="bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent">
								Dropa
							</span>
							?
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Built for modern life with the features you need to stay organized and productive.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								icon: Shield,
								title: 'Secure Storage',
								description:
									'Your files are encrypted and protected with enterprise-grade security.',
							},
							{
								icon: Zap,
								title: 'Lightning Fast',
								description:
									'Upload and access your files instantly with our optimized infrastructure.',
							},
							{
								icon: Globe,
								title: 'Access Anywhere',
								description: 'Your files follow you wherever you go, on any device, anytime.',
							},
							{
								icon: Lock,
								title: 'Privacy First',
								description: 'We never access your files. Your privacy is our top priority.',
							},
							{
								icon: Smartphone,
								title: 'Mobile Ready',
								description: 'Full functionality on mobile devices with our responsive design.',
							},
							{
								icon: Cloud,
								title: 'Auto Sync',
								description: 'Your files are automatically synchronized across all your devices.',
							},
						].map((feature, index) => (
							<div
								key={index}
								className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-lg"
							>
								<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
									<feature.icon className="h-8 w-8 text-white" />
								</div>
								<h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
								<p className="text-gray-600 leading-relaxed">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section> */}

			{/* How It Works Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
							Como{' '}
							<span className="bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent">
								Dropa
							</span>{' '}
							Funciona
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Começar é simples. Apenas três passos para organizar sua vida digital.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								icon: FolderOpen,
								number: '01',
								title: 'Organize',
								description:
									'Crie um grupo, no dropa cada arquivo é separado por grupo para facilitar a organização dos seus arquivos',
							},
							{
								icon: Upload,
								number: '02',
								title: 'Guarde',
								description:
									'Arraste e solte seus arquivos e fotos diretamente no Dropa. Ou use a sessão de lembrentes para anotar seus itens do dia a dia',
							},
							{
								icon: Share2,
								number: '03',
								title: 'Acesse',
								description:
									'Acesse seus arquivos de qualquer dispositivo, em qualquer lugar do mundo, a qualquer hora.',
							},
						].map((step, index) => (
							<div key={index} className="text-center relative">
								{index < 2 && (
									<div className="hidden md:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2 z-0"></div>
								)}

								<div className="p-8 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-purple-50 relative z-10 rounded-lg">
									<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
										<step.icon className="h-10 w-10 text-white" />
									</div>

									<div className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent mb-2">
										{step.number}
									</div>
									<h3 className="text-2xl font-semibold mb-4 text-gray-900">{step.title}</h3>
									<p className="text-gray-600 leading-relaxed">{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-700"></div>

				{/* Decorative elements */}
				<div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
				<div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

				<div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
					<div className="flex justify-center mb-6">
						<div className="flex gap-1">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
							))}
						</div>
					</div>

					<h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
						Pronto para a
						<br />
						<span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
							organização?
						</span>
					</h2>

					<p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
						Junte-se aos nossosusuários que já confiam no Dropa para manter sua vida digital
						organizada e acessível.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
							Start Free Today
							<ArrowRight className="h-5 w-5" />
						</button>
						<button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-4 rounded-full font-semibold transition-all">
							Contact Sales
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-8">
						<div className="md:col-span-2">
							<h3 className="text-2xl font-bold mb-4">
								<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
									Dropa
								</span>
							</h3>
							<p className="text-gray-400 leading-relaxed max-w-md">
								A solução de armazenamento moderna para todo o seu conteúdo digital. Armazene
								textos, fotos e arquivos com segurança e acesse-os de qualquer lugar.
							</p>
						</div>

						{/* <div>
							<h4 className="font-semibold mb-4">Product</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Features
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Security
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Pricing
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										API
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Company</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										About
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Blog
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Careers
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Contact
									</a>
								</li>
							</ul>
						</div> */}
					</div>

					<hr className="border-gray-800 my-8" />

					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-400 text-sm">© 2025 Dropa. All rights reserved.</p>
						<p className="text-gray-400 text-sm flex items-center gap-1 mt-4 md:mt-0">
							Made with <Heart className="h-4 w-4 text-red-500" /> for
							<Link
								className="underline"
								target="_blank"
								href="https://www.linkedin.com/in/wesleyrafael10s/"
							>
								Wesley
							</Link>
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
