import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

interface HeroProps {
	onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
	return (
		<section className='hero'>
			<div className='hero-container'>
				<div className='hero-content'>
					<div className='hero-badge'>
						<Sparkles size={16} />
						<span>Powered by Advanced AI</span>
					</div>
					<h1 className='hero-title'>
						Medical AI Assistant
						<span className='gradient-text'> That Understands</span>
					</h1>
					<p className='hero-description'>
						Get instant, accurate medical insights powered by cutting-edge
						artificial intelligence. Your trusted companion for healthcare
						information and decision support.
					</p>
					<div className='hero-actions'>
						<button className='btn-primary' onClick={onGetStarted}>
							Get Started
							<ArrowRight size={20} />
						</button>
						<button className='btn-secondary'>Learn More</button>
					</div>
					<div className='hero-stats'>
						<div className='stat'>
							<div className='stat-number'>99.9%</div>
							<div className='stat-label'>Accuracy</div>
						</div>
						<div className='stat'>
							<div className='stat-number'>24/7</div>
							<div className='stat-label'>Available</div>
						</div>
						<div className='stat'>
							<div className='stat-number'>HIPAA</div>
							<div className='stat-label'>Compliant</div>
						</div>
					</div>
				</div>
				<div className='hero-visual'>
					<div className='visual-card'>
						<div className='card-glow'></div>
						<div className='card-content'>
							<div className='pulse-dot'></div>
							<div className='wave-lines'>
								<div className='wave-line'></div>
								<div className='wave-line'></div>
								<div className='wave-line'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
