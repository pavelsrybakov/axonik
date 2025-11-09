import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface TermsOfServiceProps {
	onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
				<button
					onClick={onBack}
					className="flex items-center gap-2 text-text-secondary hover:text-primary mb-6 transition-colors bg-transparent border-none cursor-pointer"
				>
					<ArrowLeft size={20} />
					<span>Back</span>
				</button>

				<div className="bg-surface rounded-2xl shadow-lg border border-border p-8 md:p-12">
					<div className="mb-8">
						<div className="flex items-center gap-3 mb-4">
							<Scale className="text-primary" size={32} />
							<h1 className="text-4xl md:text-5xl font-bold text-text-primary">
								Terms of Service
							</h1>
						</div>
						<p className="text-text-secondary text-sm">
							Last updated: {new Date().toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
					</div>

					<div className="prose prose-lg max-w-none space-y-8">
						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
								<FileText size={24} />
								1. Acceptance of Terms
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								By accessing and using Axonic.ai ("the Service"), you accept and
								agree to be bound by the terms and provision of this agreement. If
								you do not agree to abide by the above, please do not use this
								service.
							</p>
							<p className="text-text-secondary leading-relaxed">
								These Terms of Service ("Terms") govern your access to and use of
								our AI-powered medical services, including but not limited to OCR
								text extraction, medical document analysis, and AI chat assistance.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
								<CheckCircle size={24} />
								2. Description of Service
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								Axonic.ai provides AI-powered medical services designed to assist
								with:
							</p>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>Optical Character Recognition (OCR) for medical documents</li>
								<li>Text extraction from medical images and documents</li>
								<li>AI-powered medical information assistance</li>
								<li>Document analysis and processing</li>
							</ul>
							<p className="text-text-secondary leading-relaxed mt-4">
								<strong className="text-text-primary">Important:</strong> Our
								services are designed to assist and provide information only. They
								do not replace professional medical advice, diagnosis, or
								treatment.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
								<AlertTriangle size={24} />
								3. Medical Disclaimer
							</h2>
							<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
								<p className="text-text-primary font-semibold mb-2">
									⚠️ Important Medical Disclaimer
								</p>
								<p className="text-text-secondary leading-relaxed">
									The information provided by Axonic.ai is for informational
									purposes only and is not intended as a substitute for
									professional medical advice, diagnosis, or treatment. Always
									seek the advice of your physician or other qualified health
									provider with any questions you may have regarding a medical
									condition.
								</p>
							</div>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>
									Never disregard professional medical advice or delay in seeking
									it because of something you have read or received through our
									service
								</li>
								<li>
									Our AI responses are not medical diagnoses and should not be
									treated as such
								</li>
								<li>
									In case of a medical emergency, contact your local emergency
									services immediately
								</li>
								<li>
									We do not guarantee the accuracy, completeness, or usefulness
									of any information provided
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								4. User Accounts and Responsibilities
							</h2>
							<div className="space-y-4">
								<div>
									<h3 className="text-xl font-semibold text-text-primary mb-2">
										4.1 Account Creation
									</h3>
									<p className="text-text-secondary leading-relaxed">
										You may be required to create an account to access certain
										features. You are responsible for maintaining the
										confidentiality of your account credentials and for all
										activities that occur under your account.
									</p>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-text-primary mb-2">
										4.2 User Conduct
									</h3>
									<p className="text-text-secondary leading-relaxed mb-2">
										You agree to use the Service only for lawful purposes and in
										accordance with these Terms. You agree not to:
									</p>
									<ul className="list-disc list-inside ml-4 space-y-1 text-text-secondary">
										<li>Upload malicious code, viruses, or harmful content</li>
										<li>Attempt to gain unauthorized access to the Service</li>
										<li>Use the Service to violate any applicable laws</li>
										<li>Interfere with or disrupt the Service or servers</li>
										<li>Impersonate any person or entity</li>
										<li>Collect or harvest information about other users</li>
									</ul>
								</div>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
								<XCircle size={24} />
								5. Prohibited Uses
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								You may not use our Service:
							</p>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>
									For any illegal purpose or to solicit others to perform illegal
									acts
								</li>
								<li>
									To violate any international, federal, provincial, or state
									regulations, rules, laws, or local ordinances
								</li>
								<li>
									To infringe upon or violate our intellectual property rights or
									the intellectual property rights of others
								</li>
								<li>
									To harass, abuse, insult, harm, defame, slander, disparage,
									intimidate, or discriminate
								</li>
								<li>
									To submit false or misleading information or impersonate
									another person
								</li>
								<li>
									To upload or transmit viruses or any other type of malicious code
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								6. Intellectual Property Rights
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								The Service and its original content, features, and functionality
								are and will remain the exclusive property of Axonic.ai and its
								licensors. The Service is protected by copyright, trademark, and
								other laws.
							</p>
							<p className="text-text-secondary leading-relaxed">
								You retain ownership of any content you upload to the Service.
								However, by uploading content, you grant us a license to use,
								reproduce, modify, and process your content solely for the purpose
								of providing the Service to you.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								7. Service Availability and Modifications
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								We reserve the right to:
							</p>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>
									Modify, suspend, or discontinue the Service at any time without
									prior notice
								</li>
								<li>
									Update, change, or remove features or functionality of the
									Service
								</li>
								<li>
									Impose limits on certain features or restrict access to parts
									or all of the Service
								</li>
							</ul>
							<p className="text-text-secondary leading-relaxed mt-4">
								We do not guarantee that the Service will be available at all
								times or that it will be error-free.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								8. Limitation of Liability
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								To the fullest extent permitted by law, Axonic.ai shall not be
								liable for any indirect, incidental, special, consequential, or
								punitive damages, or any loss of profits or revenues, whether
								incurred directly or indirectly, or any loss of data, use, goodwill,
								or other intangible losses resulting from:
							</p>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>Your use or inability to use the Service</li>
								<li>Any unauthorized access to or use of our servers</li>
								<li>Any interruption or cessation of transmission to or from the
									Service</li>
								<li>Any bugs, viruses, or other harmful code transmitted through
									the Service</li>
								<li>Any errors or omissions in any content or for any loss or
									damage incurred as a result of the use of any content</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								9. Indemnification
							</h2>
							<p className="text-text-secondary leading-relaxed">
								You agree to defend, indemnify, and hold harmless Axonic.ai and
								its officers, directors, employees, and agents from and against any
								claims, actions, or demands, including without limitation
								reasonable legal and accounting fees, arising or resulting from
								your breach of these Terms or your use or misuse of the Service.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								10. Termination
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								We may terminate or suspend your account and access to the Service
								immediately, without prior notice or liability, for any reason,
								including if you breach these Terms.
							</p>
							<p className="text-text-secondary leading-relaxed">
								Upon termination, your right to use the Service will cease
								immediately. All provisions of these Terms that by their nature
								should survive termination shall survive, including ownership
								provisions, warranty disclaimers, indemnity, and limitations of
								liability.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								11. Governing Law
							</h2>
							<p className="text-text-secondary leading-relaxed">
								These Terms shall be interpreted and governed by the laws of the
								jurisdiction in which Axonic.ai operates, without regard to its
								conflict of law provisions. Any disputes arising from these Terms
								shall be subject to the exclusive jurisdiction of the courts in that
								jurisdiction.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								12. Changes to Terms
							</h2>
							<p className="text-text-secondary leading-relaxed">
								We reserve the right to modify or replace these Terms at any time. If
								a revision is material, we will provide at least 30 days notice
								prior to any new terms taking effect. What constitutes a material
								change will be determined at our sole discretion.
							</p>
							<p className="text-text-secondary leading-relaxed mt-4">
								By continuing to access or use our Service after any revisions
								become effective, you agree to be bound by the revised terms.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								13. Severability
							</h2>
							<p className="text-text-secondary leading-relaxed">
								If any provision of these Terms is found to be unenforceable or
								invalid, that provision will be limited or eliminated to the minimum
								extent necessary, and the remaining provisions will remain in full
								force and effect.
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}

