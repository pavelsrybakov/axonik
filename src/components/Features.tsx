import { Brain, CheckCircle, Clock, Lock, Shield, Zap } from 'lucide-react';

const Features = () => {
	const features = [
		{
			icon: Brain,
			title: 'AI-Powered Analysis',
			description:
				'Advanced machine learning algorithms provide accurate medical insights and recommendations.',
		},
		{
			icon: Shield,
			title: 'HIPAA Compliant',
			description:
				'Your medical data is protected with enterprise-grade security and compliance standards.',
		},
		{
			icon: Zap,
			title: 'Instant Results',
			description:
				'Get medical insights in seconds, not hours. Fast, reliable, and always available.',
		},
		{
			icon: Lock,
			title: 'Privacy First',
			description:
				'Your data is encrypted and never shared. Complete privacy and confidentiality guaranteed.',
		},
		{
			icon: Clock,
			title: '24/7 Availability',
			description:
				'Access medical AI assistance anytime, anywhere. No appointments needed.',
		},
		{
			icon: CheckCircle,
			title: 'Evidence-Based',
			description:
				'All recommendations are based on the latest medical research and clinical guidelines.',
		},
	];

	return (
		<section className='py-24 px-4 md:px-8 bg-surface' id='features'>
			<div className='max-w-[1200px] mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-extrabold text-text-primary mb-4'>
						Why Choose Axonik.ai?
					</h2>
					<p className='text-lg md:text-xl text-text-secondary max-w-[600px] mx-auto'>
						Built for healthcare professionals and patients who demand accuracy,
						security, and reliability.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={index}
								className='bg-background p-8 rounded-2xl border border-border transition-all flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl hover:border-primary-light'
							>
								<div className='w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white mb-2'>
									<Icon size={32} />
								</div>
								<h3 className='text-xl font-bold text-text-primary'>
									{feature.title}
								</h3>
								<p className='text-text-secondary leading-relaxed'>
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Features;
