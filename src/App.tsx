import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Features from './components/Features';
import Header from './components/Header';
import Hero from './components/Hero';
import OCRTest from './components/OCRTest';

type View = 'home' | 'chat' | 'ocr';

function App() {
	const [currentView, setCurrentView] = useState<View>('home');

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
