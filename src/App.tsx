import { useEffect, useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Features from './components/Features';
import Header from './components/Header';
import Hero from './components/Hero';
import OCRTest from './components/OCRTest';

type View = 'home' | 'chat' | 'ocr';

function App() {
	const [currentView, setCurrentView] = useState<View>('home');

	// Handle URL parameters for PWA shortcuts
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const view = params.get('view') as View;
		if (view && ['home', 'chat', 'ocr'].includes(view)) {
			setCurrentView(view);
		}
	}, []);

	return (
		<div className='min-h-screen flex flex-col'>
			<Header
				onNavigate={(view) => setCurrentView(view)}
				currentView={currentView}
			/>
			{currentView === 'home' && (
				<>
					<Hero onGetStarted={() => setCurrentView('chat')} />
					<Features />
				</>
			)}
			{currentView === 'chat' && (
				<ChatInterface onBack={() => setCurrentView('home')} />
			)}
			{currentView === 'ocr' && <OCRTest />}
		</div>
	);
}

export default App;
