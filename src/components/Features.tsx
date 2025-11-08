import { Brain, CheckCircle, Clock, Lock, Shield, Zap } from 'lucide-react';
import './Features.css';

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
		<section className='features' id='features'>
			<div className='features-container'>
				<div className='features-header'>
					<h2 className='features-title'>Why Choose Axonic.ai?</h2>
					<p className='features-subtitle'>
						Built for healthcare professionals and patients who demand accuracy,
						security, and reliability.
					</p>
				</div>
				<div className='features-grid'>
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div key={index} className='feature-card'>
								<div className='feature-icon'>
									<Icon size={32} />
								</div>
								<h3 className='feature-title'>{feature.title}</h3>
								<p className='feature-description'>{feature.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Features;
