import { AlertCircle, Home } from 'lucide-react';

export default function ConsentDeclined() {
	const handleStartOver = () => {
		localStorage.removeItem('isAccepted');
		window.location.href = '/';
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="max-w-2xl w-full bg-surface rounded-2xl shadow-xl border border-border p-8 md:p-12">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
						<AlertCircle className="text-red-600" size={40} />
					</div>
					<h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
						Consent Required
					</h1>
					<p className="text-lg text-text-secondary">
						We understand your privacy concerns, but consent is required to use
						our services.
					</p>
				</div>

				<div className="bg-background rounded-xl p-6 mb-8 border border-border">
					<h2 className="text-xl font-semibold text-text-primary mb-4">
						Why is consent important?
					</h2>
					<div className="space-y-4 text-text-secondary">
						<p>
							To provide you with our AI-powered medical services, we need to
							process and analyze the data you provide, including images you
							upload. This allows us to:
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li>
								Extract and analyze text from medical documents and images
							</li>
							<li>
								Provide accurate AI-powered medical insights and assistance
							</li>
							<li>
								Ensure the security and proper handling of your medical
								information
							</li>
							<li>Improve our services based on usage patterns</li>
						</ul>
						<p className="mt-4">
							Your privacy is important to us. We handle all data in accordance
							with our Privacy Policy and Terms of Service, which comply with
							GDPR, CCPA, and other privacy regulations.
						</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						onClick={handleStartOver}
						className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-base shadow-md hover:shadow-lg"
					>
						<Home size={20} />
						Start Over
					</button>
				</div>

				<p className="text-sm text-text-secondary text-center mt-6">
					Clicking "Start Over" will clear your previous choice and return you
					to the homepage where you can review and accept our terms.
				</p>
			</div>
		</div>
	);
}

