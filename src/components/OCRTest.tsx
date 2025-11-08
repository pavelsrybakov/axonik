import {
	FileText,
	Globe,
	Image as ImageIcon,
	Loader,
	Upload,
	X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

type Language = {
	code: string;
	name: string;
	flag: string;
};

const LANGUAGES: Language[] = [
	{ code: 'eng', name: 'English', flag: '🇺🇸' },
	{ code: 'kor', name: 'Korean', flag: '🇰🇷' },
	{ code: 'rus', name: 'Russian', flag: '🇷🇺' },
];

const OCRTest = () => {
	const [image, setImage] = useState<string | null>(null);
	const [extractedText, setExtractedText] = useState<string>('');
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['eng']);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			setError('Please upload an image file');
			return;
		}

		setError(null);
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result as string);
			setExtractedText('');
		};
		reader.readAsDataURL(file);
	};

	const handleLanguageToggle = (langCode: string) => {
		setSelectedLanguages((prev) => {
			if (prev.includes(langCode)) {
				// Don't allow deselecting if it's the only language
				if (prev.length === 1) return prev;
				return prev.filter((code) => code !== langCode);
			}
			return [...prev, langCode];
		});
	};

	const handleExtractText = async () => {
		if (!image) return;
		if (selectedLanguages.length === 0) {
			setError('Please select at least one language');
			return;
		}

		setIsProcessing(true);
		setProgress(0);
		setError(null);
		setExtractedText('');

		try {
			// Combine languages: 'eng+kor+rus' or just 'eng' for single language
			const langString =
				selectedLanguages.length > 1
					? selectedLanguages.join('+')
					: selectedLanguages[0];

			const worker = await createWorker(langString, undefined, {
				logger: (m) => {
					if (m.status === 'recognizing text') {
						setProgress(Math.round(m.progress * 100));
					}
				},
			});

			const {
				data: { text },
			} = await worker.recognize(image);

			setExtractedText(text);
			await worker.terminate();
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Failed to extract text from image. Make sure the language data is loaded.'
			);
		} finally {
			setIsProcessing(false);
			setProgress(0);
		}
	};

	const handleClear = () => {
		setImage(null);
		setExtractedText('');
		setError(null);
		setProgress(0);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div className='flex-1 p-4 md:p-8 bg-background min-h-[calc(100vh-80px)]'>
			<div className='max-w-[1200px] mx-auto'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent'>
						OCR Text Extraction
					</h2>
					<p className='text-lg md:text-xl text-text-secondary mb-6'>
						Upload an image to extract text using Tesseract.js
					</p>
					<div className='bg-surface rounded-xl p-4 md:p-6 border border-border shadow-sm max-w-2xl mx-auto'>
						<div className='flex items-center justify-center gap-2 mb-4'>
							<Globe className='text-primary' size={20} />
							<h3 className='text-lg font-semibold text-text-primary'>
								Select Languages
							</h3>
						</div>
						<div className='flex flex-wrap items-center justify-center gap-3'>
							{LANGUAGES.map((lang) => {
								const isSelected = selectedLanguages.includes(lang.code);
								return (
									<button
										key={lang.code}
										onClick={() => handleLanguageToggle(lang.code)}
										disabled={isProcessing}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border-2 ${
											isSelected
												? 'bg-primary text-white border-primary shadow-md scale-105'
												: 'bg-background text-text-secondary border-border hover:border-primary/50 hover:bg-primary/5'
										} disabled:opacity-50 disabled:cursor-not-allowed`}
									>
										<span className='text-xl'>{lang.flag}</span>
										<span>{lang.name}</span>
										{isSelected && <span className='ml-1 text-xs'>✓</span>}
									</button>
								);
							})}
						</div>
						<p className='text-sm text-text-secondary mt-4'>
							{selectedLanguages.length > 1
								? `Multi-language mode: ${selectedLanguages
										.map((code) => LANGUAGES.find((l) => l.code === code)?.name)
										.join(' + ')}`
								: 'Select multiple languages for better recognition of mixed content'}
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-8'>
					<div className='bg-surface rounded-2xl p-4 md:p-8 border border-border shadow-md'>
						{!image ? (
							<div
								className='border-2 border-dashed border-border rounded-xl py-16 px-8 text-center cursor-pointer transition-all bg-background hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5'
								onClick={() => fileInputRef.current?.click()}
							>
								<Upload size={48} className='text-primary mx-auto mb-4' />
								<p className='text-lg font-semibold text-text-primary mb-2'>
									Click to upload an image or drag and drop
								</p>
								<p className='text-sm text-text-secondary'>
									Supports: JPG, PNG, GIF, WebP
								</p>
								<input
									ref={fileInputRef}
									type='file'
									accept='image/*'
									onChange={handleImageUpload}
									className='hidden'
								/>
							</div>
						) : (
							<div className='flex flex-col gap-6'>
								<div className='relative rounded-xl overflow-hidden border border-border bg-background max-h-[500px] flex items-center justify-center'>
									<img
										src={image}
										alt='Uploaded'
										className='max-w-full max-h-[500px] object-contain block'
									/>
									<button
										className='absolute top-4 right-4 bg-black/70 text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:bg-black/90 hover:scale-110'
										onClick={handleClear}
										title='Remove image'
									>
										<X size={20} />
									</button>
								</div>
								<div className='flex flex-col sm:flex-row gap-4 justify-center'>
									<button
										className='flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 border-none text-base'
										onClick={handleExtractText}
										disabled={isProcessing}
									>
										{isProcessing ? (
											<>
												<Loader className='animate-spin' size={20} />
												Processing... {progress}%
											</>
										) : (
											<>
												<FileText size={20} />
												Extract Text
											</>
										)}
									</button>
									<button
										className='flex items-center justify-center gap-2 bg-background text-primary border-2 border-primary px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed border-none text-base'
										onClick={() => fileInputRef.current?.click()}
										disabled={isProcessing}
									>
										<ImageIcon size={20} />
										Change Image
									</button>
								</div>
								<input
									ref={fileInputRef}
									type='file'
									accept='image/*'
									onChange={handleImageUpload}
									className='hidden'
								/>
							</div>
						)}
					</div>

					{error && (
						<div className='bg-red-100 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 border border-red-200'>
							<X size={20} />
							{error}
						</div>
					)}

					{extractedText && (
						<div className='bg-surface rounded-2xl p-4 md:p-8 border border-border shadow-md'>
							<div className='flex items-center gap-3 mb-6'>
								<FileText size={20} className='text-primary' />
								<h3 className='text-2xl font-bold text-text-primary'>
									Extracted Text
								</h3>
							</div>
							<div className='bg-background border border-border rounded-xl p-6 mb-4 max-h-[400px] overflow-y-auto'>
								<pre className='m-0 font-mono text-[0.9375rem] leading-relaxed text-text-primary whitespace-pre-wrap break-words'>
									{extractedText}
								</pre>
							</div>
							<button
								className='bg-secondary text-white border-none px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all w-full hover:bg-[#059669] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]'
								onClick={() => {
									navigator.clipboard.writeText(extractedText);
								}}
							>
								Copy to Clipboard
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OCRTest;
