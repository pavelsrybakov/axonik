import { ArrowLeft, Shield, Lock, Eye, FileText, Users } from 'lucide-react';

interface PrivacyPolicyProps {
	onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
							<Shield className="text-primary" size={32} />
							<h1 className="text-4xl md:text-5xl font-bold text-text-primary">
								Privacy Policy
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
								1. Introduction
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								Welcome to Axonic.ai ("we," "our," or "us"). We are committed to
								protecting your privacy and ensuring the security of your personal
								information. This Privacy Policy explains how we collect, use,
								disclose, and safeguard your information when you use our
								AI-powered medical services.
							</p>
							<p className="text-text-secondary leading-relaxed">
								By using our website and services, you agree to the collection and
								use of information in accordance with this policy. If you do not
								agree with our policies and practices, please do not use our
								services.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
								<Lock size={24} />
								2. Information We Collect
							</h2>
							<div className="space-y-4">
								<div>
									<h3 className="text-xl font-semibold text-text-primary mb-2">
										2.1 Personal Information
									</h3>
									<p className="text-text-secondary leading-relaxed">
										We may collect personal information that you provide directly
										to us, including:
									</p>
									<ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-text-secondary">
										<li>Name and contact information</li>
										<li>Email address</li>
										<li>Medical documents and images you upload</li>
										<li>Text extracted from uploaded documents</li>
										<li>Communication preferences</li>
									</ul>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-text-primary mb-2">
										2.2 Automatically Collected Information
									</h3>
									<p className="text-text-secondary leading-relaxed">
										When you use our services, we may automatically collect
										certain information, including:
									</p>
									<ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-text-secondary">
										<li>Device information (IP address, browser type, device type)</li>
										<li>Usage data (pages visited, time spent, features used)</li>
										<li>Cookies and similar tracking technologies</li>
									</ul>
								</div>
							</div>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
								<Eye size={24} />
								3. How We Use Your Information
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								We use the information we collect for the following purposes:
							</p>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>
									<strong className="text-text-primary">Service Provision:</strong> To
									provide, maintain, and improve our AI-powered medical services,
									including OCR text extraction and medical document analysis
								</li>
								<li>
									<strong className="text-text-primary">Communication:</strong> To
									respond to your inquiries, provide customer support, and send
									important service updates
								</li>
								<li>
									<strong className="text-text-primary">Analytics:</strong> To
									analyze usage patterns, improve our services, and develop new
									features
								</li>
								<li>
									<strong className="text-text-primary">Security:</strong> To
									protect against fraud, unauthorized access, and other security
									threats
								</li>
								<li>
									<strong className="text-text-primary">Legal Compliance:</strong> To
									comply with applicable laws, regulations, and legal processes
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
								<Users size={24} />
								4. Data Sharing and Disclosure
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								We do not sell your personal information. We may share your
								information only in the following circumstances:
							</p>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>
									<strong className="text-text-primary">Service Providers:</strong> With
									trusted third-party service providers who assist us in operating
									our services, subject to confidentiality agreements
								</li>
								<li>
									<strong className="text-text-primary">Legal Requirements:</strong> When
									required by law, court order, or government regulation
								</li>
								<li>
									<strong className="text-text-primary">Business Transfers:</strong> In
									connection with a merger, acquisition, or sale of assets
								</li>
								<li>
									<strong className="text-text-primary">With Your Consent:</strong> When
									you have explicitly given us permission to share your information
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								5. Data Security
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								We implement appropriate technical and organizational security
								measures to protect your personal information against unauthorized
								access, alteration, disclosure, or destruction. These measures
								include:
							</p>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>Encryption of data in transit and at rest</li>
								<li>Regular security assessments and updates</li>
								<li>Access controls and authentication mechanisms</li>
								<li>Secure data storage and backup procedures</li>
							</ul>
							<p className="text-text-secondary leading-relaxed mt-4">
								However, no method of transmission over the Internet or electronic
								storage is 100% secure. While we strive to protect your information,
								we cannot guarantee absolute security.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								6. Your Rights and Choices
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								Depending on your location, you may have certain rights regarding
								your personal information, including:
							</p>
							<ul className="list-disc list-inside ml-4 space-y-2 text-text-secondary">
								<li>
									<strong className="text-text-primary">Access:</strong> Request access
									to your personal information
								</li>
								<li>
									<strong className="text-text-primary">Correction:</strong> Request
									correction of inaccurate or incomplete information
								</li>
								<li>
									<strong className="text-text-primary">Deletion:</strong> Request
									deletion of your personal information
								</li>
								<li>
									<strong className="text-text-primary">Portability:</strong> Request
									transfer of your data to another service
								</li>
								<li>
									<strong className="text-text-primary">Opt-Out:</strong> Opt out of
									certain data processing activities
								</li>
							</ul>
							<p className="text-text-secondary leading-relaxed mt-4">
								To exercise these rights, please contact us using the information
								provided in the "Contact Us" section below.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								7. Cookies and Tracking Technologies
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								We use cookies and similar tracking technologies to track activity on
								our service and store certain information. You can instruct your
								browser to refuse all cookies or to indicate when a cookie is being
								sent. However, if you do not accept cookies, you may not be able to
								use some portions of our service.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								8. Data Retention
							</h2>
							<p className="text-text-secondary leading-relaxed">
								We retain your personal information only for as long as necessary
								to fulfill the purposes outlined in this Privacy Policy, unless a
								longer retention period is required or permitted by law. When we no
								longer need your information, we will securely delete or
								anonymize it.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								9. Children's Privacy
							</h2>
							<p className="text-text-secondary leading-relaxed">
								Our services are not intended for individuals under the age of 18.
								We do not knowingly collect personal information from children. If
								you believe we have collected information from a child, please
								contact us immediately.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								10. International Data Transfers
							</h2>
							<p className="text-text-secondary leading-relaxed">
								Your information may be transferred to and processed in countries
								other than your country of residence. These countries may have
								different data protection laws. We ensure appropriate safeguards are
								in place to protect your information in accordance with this Privacy
								Policy.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-text-primary mb-4">
								11. Changes to This Privacy Policy
							</h2>
							<p className="text-text-secondary leading-relaxed">
								We may update this Privacy Policy from time to time. We will
								notify you of any changes by posting the new Privacy Policy on this
								page and updating the "Last updated" date. You are advised to
								review this Privacy Policy periodically for any changes.
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}

