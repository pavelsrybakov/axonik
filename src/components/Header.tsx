import { Brain } from 'lucide-react';
import './Header.css';

const Header = () => {
	return (
		<header className='header'>
			<div className='header-container'>
				<div className='logo'>
					<Brain className='logo-icon' size={28} />
					<span className='logo-text'>Axonic.ai</span>
				</div>
				<nav className='nav'>
					<a href='#features' className='nav-link'>
						Features
					</a>
					<a href='#about' className='nav-link'>
						About
					</a>
					<button className='nav-button'>Sign In</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
