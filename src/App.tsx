import { useEffect, useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ConsentDeclined from './components/ConsentDeclined';
import ConsentModal from './components/ConsentModal';
import Features from './components/Features';
import Header from './components/Header';
import Hero from './components/Hero';
import OCRTest from './components/OCRTest';

type View = 'home' | 'chat' | 'ocr' | 'consent-declined';

function App() {
	const [currentView, setCurrentView] = useState<View>('home');
	const [showConsentModal, setShowConsentModal] = useState(false);

	// Check localStorage on initial load to restore consent state
	useEffect(() => {
		const isAccepted = localStorage.getItem('isAccepted');
		if (isAccepted === 'true') {
			setShowConsentModal(false);
		} else if (isAccepted === 'false') {
			// If consent was declined, redirect to declined page
			setCurrentView('consent-declined');
			setShowConsentModal(false);
		} else {
			// No consent given yet, show modal
			setShowConsentModal(true);
		}
	}, []);

	// Handle URL parameters for PWA shortcuts
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const view = params.get('view') as View;
		if (view && ['home', 'chat', 'ocr'].includes(view)) {
			setCurrentView(view);
		}
	}, []);

	const handleConsentAccept = () => {
		setShowConsentModal(false);
		localStorage.setItem('isAccepted', 'true');
	};

	const handleConsentDecline = () => {
		setShowConsentModal(false);
		localStorage.setItem('isAccepted', 'false');
		setCurrentView('consent-declined');
	};

	// If consent was declined, show the declined page (no header)
	if (currentView === 'consent-declined') {
		return <ConsentDeclined />;
	}

	return (
		<div className='min-h-screen flex flex-col'>
			{showConsentModal && (
				<ConsentModal
					onAccept={handleConsentAccept}
					onDecline={handleConsentDecline}
				/>
			)}
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
