import { useState, useEffect } from 'react';

interface ConsentModalProps {
	onAccept: () => void;
	onDecline: () => void;
}

export default function ConsentModal({ onAccept, onDecline }: ConsentModalProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Show modal on mount (every page load)
		setIsVisible(true);
	}, []);

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-200">
				<div className="p-6">
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-3">
							Privacy Consent
						</h2>
						<p className="text-gray-700 text-sm leading-relaxed mb-4">
							We value your privacy. This website may collect and process personal
							data, including images you upload, to provide you with AI-powered
							services. By continuing, you consent to the collection and processing
							of your personal data.
						</p>
						<p className="text-gray-600 text-xs leading-relaxed">
							By using our website, you agree to our{' '}
							<a
								href="#privacy-policy"
								className="text-blue-600 hover:text-blue-800 underline"
								onClick={(e) => {
									e.preventDefault();
									// Link to privacy policy page
								}}
							>
								Privacy Policy
							</a>{' '}
							and{' '}
							<a
								href="#terms"
								className="text-blue-600 hover:text-blue-800 underline"
								onClick={(e) => {
									e.preventDefault();
									// Link to terms page
								}}
							>
								Terms of Service
							</a>
							.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
						<button
							onClick={() => {
								setIsVisible(false);
								onAccept();
							}}
							className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
						>
							Accept
						</button>
						<button
							onClick={() => {
								setIsVisible(false);
								onDecline();
							}}
							className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
						>
							Decline
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

