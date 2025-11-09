import { ArrowLeft, Bot, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
			text: "Hello! I'm Axonik.ai, your medical AI assistant. How can I help you today?",
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
		<div className='flex-1 flex flex-col max-w-[1200px] mx-auto w-full h-[calc(100vh-80px)] bg-surface'>
			<div className='flex items-center gap-4 px-4 md:px-8 py-6 border-b border-border bg-surface'>
				<button
					className='bg-transparent border border-border rounded-lg p-2 cursor-pointer text-text-secondary transition-all hover:bg-background hover:text-primary hover:border-primary flex items-center justify-center'
					onClick={onBack}
				>
					<ArrowLeft size={20} />
				</button>
				<div className='flex-1'>
					<h2 className='text-2xl md:text-3xl font-bold text-text-primary mb-1'>
						Axonik.ai Assistant
					</h2>
					<p className='text-sm text-text-secondary'>
						Medical AI at your service
					</p>
				</div>
			</div>

			<div className='flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 bg-background'>
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex gap-4 max-w-[80%] md:max-w-[80%] animate-slideIn ${
							message.sender === 'user'
								? 'self-end flex-row-reverse'
								: 'self-start'
						}`}
					>
						<div
							className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
								message.sender === 'user'
									? 'bg-primary text-white'
									: 'bg-gradient-to-br from-primary to-accent text-white'
							}`}
						>
							{message.sender === 'user' ? (
								<User size={20} />
							) : (
								<Bot size={20} />
							)}
						</div>
						<div
							className={`flex flex-col gap-2 ${
								message.sender === 'user' ? 'items-end' : 'items-start'
							}`}
						>
							<div
								className={`px-5 py-4 rounded-2xl leading-relaxed break-words ${
									message.sender === 'user'
										? 'bg-primary text-white rounded-br-sm'
										: 'bg-surface text-text-primary border border-border rounded-bl-sm'
								}`}
							>
								{message.text}
							</div>
							<div className='text-xs text-text-secondary px-2'>
								{message.timestamp.toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</div>
						</div>
					</div>
				))}
				{isLoading && (
					<div className='flex gap-4 max-w-[80%] self-start animate-slideIn'>
						<div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center flex-shrink-0'>
							<Bot size={20} />
						</div>
						<div className='flex flex-col items-start'>
							<div className='flex gap-2 px-5 py-4 bg-surface border border-border rounded-2xl rounded-bl-sm'>
								<span className='w-2 h-2 bg-text-secondary rounded-full animate-typing'></span>
								<span className='w-2 h-2 bg-text-secondary rounded-full animate-typing [animation-delay:0.2s]'></span>
								<span className='w-2 h-2 bg-text-secondary rounded-full animate-typing [animation-delay:0.4s]'></span>
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<div className='px-4 md:px-8 py-6 border-t border-border bg-surface'>
				<div className='flex gap-4 items-end bg-background border border-border rounded-2xl p-4 transition-all focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'>
					<textarea
						className='flex-1 border-none bg-transparent resize-none font-inherit text-base text-text-primary outline-none max-h-[120px] leading-normal placeholder:text-text-secondary'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder='Ask a medical question...'
						rows={1}
					/>
					<button
						className='bg-primary text-white border-none rounded-xl p-3 cursor-pointer flex items-center justify-center transition-all flex-shrink-0 hover:bg-primary-dark hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
						onClick={handleSend}
						disabled={!input.trim() || isLoading}
					>
						<Send size={20} />
					</button>
				</div>
				<p className='mt-3 text-xs text-text-secondary text-center'>
					This is a demonstration. Always consult with healthcare professionals
					for medical advice.
				</p>
			</div>
		</div>
	);
};

export default ChatInterface;
