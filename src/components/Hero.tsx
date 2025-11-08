import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
	onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
	const [showHowToUse, setShowHowToUse] = useState(false);

	return (
		<section className='flex-1 py-16 px-4 md:px-8 bg-gradient-to-b from-surface to-background'>
			<div className='max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
				<div className='flex flex-col gap-6'>
					<div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold w-fit'>
						<Sparkles size={16} />
						<span>Powered by Advanced AI</span>
					</div>
					<h1 className='text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-text-primary'>
						Medical AI Assistant
						<span className='block bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent'>
							That Understands
						</span>
					</h1>
					<p className='text-lg md:text-xl text-text-secondary leading-relaxed max-w-[600px]'>
						Get instant, accurate medical insights powered by cutting-edge
						artificial intelligence. Your trusted companion for healthcare
						information and decision support.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 mt-2'>
						<button
							className='flex items-center justify-center gap-2 bg-primary text-white border-none px-8 py-4 rounded-xl text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:translate-y-0'
							onClick={onGetStarted}
						>
							Get Started
							<ArrowRight size={20} />
						</button>
						<button 
							className='bg-transparent text-primary border-2 border-primary px-8 py-4 rounded-xl text-base font-semibold cursor-pointer transition-all hover:bg-primary/5 hover:-translate-y-0.5'
							onClick={() => setShowHowToUse(true)}
						>
							How to Use?
						</button>
					</div>
					<div className='flex gap-8 md:gap-12 mt-8 pt-8 border-t border-border'>
						<div className='flex flex-col gap-1'>
							<div className='text-2xl md:text-3xl font-bold text-primary'>
								99.9%
							</div>
							<div className='text-sm text-text-secondary font-medium'>
								Accuracy
							</div>
						</div>
						<div className='flex flex-col gap-1'>
							<div className='text-2xl md:text-3xl font-bold text-primary'>
								24/7
							</div>
							<div className='text-sm text-text-secondary font-medium'>
								Available
							</div>
						</div>
						<div className='flex flex-col gap-1'>
							<div className='text-2xl md:text-3xl font-bold text-primary'>
								HIPAA
							</div>
							<div className='text-sm text-text-secondary font-medium'>
								Compliant
							</div>
						</div>
					</div>
				</div>
				<div className='flex justify-center items-center relative'>
					<div className='w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-primary to-accent rounded-3xl relative overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.3)] flex items-center justify-center'>
						<div className='absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] animate-rotate'></div>
						<div className='relative z-10 flex flex-col items-center gap-8'>
							<div className='w-20 h-20 bg-white rounded-full animate-pulse shadow-[0_0_0_0_rgba(255,255,255,0.7)]'></div>
							<div className='flex gap-2 items-end'>
								<div className='w-2 h-10 bg-white rounded-md animate-wave'></div>
								<div className='w-2 h-[60px] bg-white rounded-md animate-wave [animation-delay:0.2s]'></div>
								<div className='w-2 h-10 bg-white rounded-md animate-wave [animation-delay:0.4s]'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showHowToUse && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
					<div className="bg-white rounded-lg shadow-xl max-w-lg w-full transform transition-all duration-200">
						<div className="p-6">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold text-gray-900">
									How to Use
								</h2>
								<button
									onClick={() => setShowHowToUse(false)}
									className="text-gray-400 hover:text-gray-600 transition-colors"
									aria-label="Close modal"
								>
									<X size={24} />
								</button>
							</div>
							<div className="space-y-4 mb-6">
								<div className="flex gap-4">
									<div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
										1
									</div>
									<div className="flex-1">
										<p className="text-gray-700 leading-relaxed">
											Select <span className="font-semibold text-primary">"OCR TEST"</span>
										</p>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
										2
									</div>
									<div className="flex-1">
										<p className="text-gray-700 leading-relaxed">
											Select <span className="font-semibold">Language(s)</span>
										</p>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
										3
									</div>
									<div className="flex-1">
										<p className="text-gray-700 leading-relaxed">
											Select <span className="font-semibold">image</span>
										</p>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
										4
									</div>
									<div className="flex-1">
										<p className="text-gray-700 leading-relaxed">
											Click <span className="font-semibold text-primary">"Extract Text"</span> and wait
										</p>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
										5
									</div>
									<div className="flex-1">
										<p className="text-gray-700 leading-relaxed">
											You can <span className="font-semibold">mask personal info</span> or <span className="font-semibold">copy the output text</span>
										</p>
									</div>
								</div>
							</div>
							<div className="pt-4 border-t">
								<button
									onClick={() => setShowHowToUse(false)}
									className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
								>
									Got it!
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default Hero;
