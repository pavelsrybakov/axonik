import { useState } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import Features from './components/Features';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
	const [showChat, setShowChat] = useState(false);

	return (
		<div className='app'>
			<Header />
			{!showChat ? (
				<>
					<Hero onGetStarted={() => setShowChat(true)} />
					<Features />
				</>
			) : (
				<ChatInterface onBack={() => setShowChat(false)} />
			)}
		</div>
	);
}

export default App;
