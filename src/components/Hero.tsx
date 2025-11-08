import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
	onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
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
						<button className='bg-transparent text-primary border-2 border-primary px-8 py-4 rounded-xl text-base font-semibold cursor-pointer transition-all hover:bg-primary/5 hover:-translate-y-0.5'>
							Learn More
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
		</section>
	);
};

export default Hero;
