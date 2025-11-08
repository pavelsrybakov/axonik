import { lazy, Suspense, useEffect, useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ConsentDeclined from './components/ConsentDeclined';
import ConsentModal from './components/ConsentModal';
import Features from './components/Features';
import Header from './components/Header';
import Hero from './components/Hero';
const OCRTest = lazy(() => import('./components/OCRTest'));
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

type View = 'home' | 'chat' | 'ocr' | 'consent-declined' | 'privacy-policy' | 'terms';

function App() {
	const [currentView, setCurrentView] = useState<View>('home');
	const [showConsentModal, setShowConsentModal] = useState(false);

	// Check consent
	useEffect(() => {
		const isAccepted = localStorage.getItem('isAccepted');
		if (isAccepted === 'true') {
			setShowConsentModal(false);
		} else if (isAccepted === 'false') {
			setCurrentView('consent-declined');
			setShowConsentModal(false);
		} else {
			setShowConsentModal(true);
		}
	}, [currentView]);

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

	// Handle views that render without header
	switch (currentView) {
		case 'consent-declined':
			return <ConsentDeclined />;
		case 'privacy-policy':
			return <PrivacyPolicy onBack={() => setCurrentView('home')} />;
		case 'terms':
			return <TermsOfService onBack={() => setCurrentView('home')} />;
		default:
			break;
	}

	return (
		<div className='min-h-screen flex flex-col'>
			{showConsentModal && (
				<ConsentModal
					onAccept={handleConsentAccept}
					onDecline={handleConsentDecline}
					onNavigateToPrivacy={() => {
						setShowConsentModal(false);
						setCurrentView('privacy-policy');
					}}
					onNavigateToTerms={() => {
						setShowConsentModal(false);
						setCurrentView('terms');
					}}
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
			{currentView === 'ocr' && (
				<Suspense
					fallback={
						<div className='flex-1 flex items-center justify-center min-h-[calc(100vh-80px)]'>
							<div className='text-center'>
								<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
								<p className='text-text-secondary'>Loading OCR tools...</p>
							</div>
						</div>
					}
				>
					<OCRTest />
				</Suspense>
			)}
		</div>
	);
}

export default App;
