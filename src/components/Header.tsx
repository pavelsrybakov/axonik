import { Brain } from 'lucide-react';

type View = 'home' | 'chat' | 'ocr';

interface HeaderProps {
	onNavigate?: (view: View) => void;
	currentView?: View;
}

const Header = ({ onNavigate, currentView }: HeaderProps) => {
	const handleNavClick = (e: React.MouseEvent, view: View) => {
		e.preventDefault();
		onNavigate?.(view);
	};

	return (
		<header className='bg-surface border-b border-border shadow-sm sticky top-0 z-[100]'>
			<div className='max-w-[1200px] mx-auto px-4 md:px-8 py-4 flex justify-between items-center'>
				<div
					className='flex items-center gap-3 text-2xl font-bold text-primary cursor-pointer'
					onClick={() => onNavigate?.('home')}
				>
					<Brain className='text-primary' size={28} />
					<span className='bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent'>
						Axonik.ai
					</span>
				</div>
				<nav className='flex items-center gap-4 md:gap-8'>
					{currentView !== 'home' && (
						<button
							className='text-text-secondary font-medium transition-colors hover:text-primary bg-transparent border-none cursor-pointer text-inherit font-inherit p-0'
							onClick={(e) => handleNavClick(e, 'home')}
						>
							Home
						</button>
					)}
					<button
						className={`text-text-secondary font-medium transition-colors hover:text-primary bg-transparent border-none cursor-pointer text-inherit font-inherit p-0 ${
							currentView === 'ocr' ? 'text-primary font-semibold' : ''
						}`}
						onClick={(e) => handleNavClick(e, 'ocr')}
					>
						OCR Test
					</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
