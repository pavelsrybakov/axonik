import { ArrowLeft, Bot, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './ChatInterface.css';

interface Message {
	id: string;
	text: string;
	sender: 'user' | 'ai';
	timestamp: Date;
}

interface ChatInterfaceProps {
	onBack: () => void;
}

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			text: "Hello! I'm Axonic.ai, your medical AI assistant. How can I help you today?",
			sender: 'ai',
			timestamp: new Date(),
		},
	]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			text: input,
			sender: 'user',
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput('');
		setIsLoading(true);

		// Simulate AI response
		setTimeout(() => {
			const aiMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: 'Thank you for your question. This is a demo response. In a production environment, this would be processed by our advanced medical AI system to provide accurate, evidence-based insights.',
				sender: 'ai',
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, aiMessage]);
			setIsLoading(false);
		}, 1500);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className='chat-interface'>
			<div className='chat-header'>
				<button className='back-button' onClick={onBack}>
					<ArrowLeft size={20} />
				</button>
				<div className='chat-header-content'>
					<h2 className='chat-title'>Axonic.ai Assistant</h2>
					<p className='chat-subtitle'>Medical AI at your service</p>
				</div>
			</div>

			<div className='chat-messages'>
				{messages.map((message) => (
					<div
						key={message.id}
						className={`message ${
							message.sender === 'user' ? 'message-user' : 'message-ai'
						}`}
					>
						<div className='message-avatar'>
							{message.sender === 'user' ? (
								<User size={20} />
							) : (
								<Bot size={20} />
							)}
						</div>
						<div className='message-content'>
							<div className='message-text'>{message.text}</div>
							<div className='message-time'>
								{message.timestamp.toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</div>
						</div>
					</div>
				))}
				{isLoading && (
					<div className='message message-ai'>
						<div className='message-avatar'>
							<Bot size={20} />
						</div>
						<div className='message-content'>
							<div className='typing-indicator'>
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<div className='chat-input-container'>
				<div className='chat-input-wrapper'>
					<textarea
						className='chat-input'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder='Ask a medical question...'
						rows={1}
					/>
					<button
						className='send-button'
						onClick={handleSend}
						disabled={!input.trim() || isLoading}
					>
						<Send size={20} />
					</button>
				</div>
				<p className='chat-disclaimer'>
					This is a demonstration. Always consult with healthcare professionals
					for medical advice.
				</p>
			</div>
		</div>
	);
};

export default ChatInterface;
