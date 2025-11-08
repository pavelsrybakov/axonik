/**
 * Russian to English translation
 * Uses MyMemory Translation API (free, no auth required) for hackathon use
 * Can fallback to local model using @xenova/transformers if needed
 */

// Option 1: Use free translation API (no authentication required)
const USE_API = true; // Set to false to use local model (requires @xenova/transformers)

// MyMemory Translation API - Free, no auth required, good for hackathons
// Alternative: HuggingFace (requires auth token) or Google Translate (requires API key)
const MYMEMORY_API_BASE = 'https://api.mymemory.translated.net';
// Use Vite proxy in development to avoid CORS issues
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Vite provides import.meta.env
const isDevelopment =
	import.meta.env?.DEV || import.meta.env?.MODE === 'development';
const MYMEMORY_API = isDevelopment
	? '/api/translate' // Vite proxy
	: `${MYMEMORY_API_BASE}/get`; // Direct API

// Fallback to local model if API fails
// Dynamic import to avoid bundling when USE_API is true
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let translationPipeline: any = null;
let isModelLoading = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loadingPromise: Promise<any> | null = null;

/**
 * Translate using MyMemory Translation API (free, no auth required)
 */
async function translateWithAPI(
	text: string,
	onProgress?: (progress: number) => void
): Promise<string> {
	try {
		if (onProgress) onProgress(20);

		// Split long text into chunks (MyMemory has limits)
		const MAX_CHUNK_LENGTH = 500; // Characters per chunk
		const chunks: string[] = [];

		if (text.length > MAX_CHUNK_LENGTH) {
			// Split by sentences or at word boundaries
			const sentences = text.split(/([.!?]\s+|\.\s*$)/);
			let currentChunk = '';

			for (const sentence of sentences) {
				if (
					(currentChunk + sentence).length > MAX_CHUNK_LENGTH &&
					currentChunk
				) {
					chunks.push(currentChunk.trim());
					currentChunk = sentence;
				} else {
					currentChunk += sentence;
				}
			}
			if (currentChunk.trim()) {
				chunks.push(currentChunk.trim());
			}
		} else {
			chunks.push(text);
		}

		console.log(`Translating ${chunks.length} chunk(s) via MyMemory API...`);

		// Translate each chunk
		const translatedChunks: string[] = [];
		for (let i = 0; i < chunks.length; i++) {
			const chunk = chunks[i];

			// MyMemory API: Russian (ru) to English (en)
			// Use POST for longer text to avoid URI length limits
			const params = new URLSearchParams({
				q: chunk,
				langpair: 'ru|en',
			});

			const response = await fetch(`${MYMEMORY_API}?${params.toString()}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			});

			if (onProgress) {
				const progress = 20 + Math.round((i / chunks.length) * 60);
				onProgress(progress);
			}

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Translation API error: ${response.status} ${response.statusText}. ${errorText}`
				);
			}

			const result = await response.json();
			console.log(`Chunk ${i + 1} API response:`, result);

			// MyMemory API returns: { responseData: { translatedText: "..." }, ... }
			if (result.responseData && result.responseData.translatedText) {
				const translated = result.responseData.translatedText;
				console.log(
					`Chunk ${i + 1} translated text (first 100 chars):`,
					translated.substring(0, 100)
				);

				// Check if translation actually happened
				if (translated === chunk) {
					console.warn(
						`Chunk ${
							i + 1
						} translation returned same as original - API may have failed`
					);
					// Don't use original - throw error instead
					throw new Error(
						`Translation failed for chunk ${i + 1} - API returned original text`
					);
				}

				// Use the translation even if it still has some Russian (might be mixed)
				translatedChunks.push(translated);
			} else {
				console.error(`Chunk ${i + 1} unexpected response format:`, result);
				throw new Error(
					`Translation API returned unexpected format for chunk ${i + 1}`
				);
			}
		}

		if (onProgress) onProgress(90);

		const finalTranslation = translatedChunks.join(' ').trim();
		console.log(
			'Final translation preview:',
			finalTranslation.substring(0, 200)
		);

		// Final validation - check if we got any English text
		const hasEnglish = /[a-zA-Z]/.test(finalTranslation);
		const allRussian = isRussianText(finalTranslation) && !hasEnglish;

		if (allRussian && finalTranslation === text.trim()) {
			throw new Error(
				'Translation failed - API returned original Russian text. The translation service may be unavailable or the text may be too complex.'
			);
		}

		// If it's all Russian but different from original, it might be a partial translation
		// Return it anyway with a warning
		if (allRussian && finalTranslation !== text.trim()) {
			console.warn(
				'Translation contains only Russian text - may be incomplete'
			);
		}

		if (onProgress) onProgress(100);
		return finalTranslation;
	} catch (error) {
		console.error('API translation error:', error);
		throw error;
	}
}

/**
 * Initialize the translation pipeline (lazy loading) - only used if USE_API is false
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function initializeTranslator(): Promise<any> {
	if (translationPipeline) {
		return translationPipeline;
	}

	if (isModelLoading && loadingPromise) {
		return loadingPromise;
	}

	isModelLoading = true;

	// Dynamic import to avoid bundling when USE_API is true
	const { pipeline } = await import('@xenova/transformers');

	const modelName = 'Helsinki-NLP/opus-mt-ru-en';
	console.log('Loading translation model locally:', modelName);

	loadingPromise = pipeline('translation', modelName, {
		quantized: true,
	})
		.then((pipeline) => {
			console.log('✅ Translation model loaded successfully');
			translationPipeline = pipeline;
			isModelLoading = false;
			loadingPromise = null;
			return pipeline;
		})
		.catch((error) => {
			console.error('❌ Failed to load translation model:', error);
			isModelLoading = false;
			loadingPromise = null;
			translationPipeline = null;
			throw error;
		});

	return loadingPromise;
}

/**
 * Detect if text contains Russian Cyrillic characters
 */
export function isRussianText(text: string): boolean {
	const CYRILLIC_RE = /[\u0400-\u04FF]/;
	return CYRILLIC_RE.test(text);
}

/**
 * Translate Russian text to English
 * @param text - Russian text to translate
 * @param onProgress - Optional callback for progress updates
 * @returns Translated English text
 */
export async function translateRussianToEnglish(
	text: string,
	onProgress?: (progress: number) => void
): Promise<string> {
	try {
		// Check if text contains Russian characters
		if (!isRussianText(text)) {
			console.warn('Text does not appear to contain Russian characters');
			return text;
		}

		// Use API or local model
		if (USE_API) {
			// Translate using HuggingFace API (more reliable, no model download)
			const translated = await translateWithAPI(text, onProgress);
			return translated;
		}

		// Initialize translator if needed (local model)
		if (onProgress) onProgress(10);
		const translator = await initializeTranslator();

		if (onProgress) onProgress(30);

		if (onProgress) onProgress(50);

		// Split text into sentences for chunking if needed
		const sentences = text
			.split(/([.!?]\s+|\.\s*$)/)
			.filter((s) => s.trim().length > 0);

		// Translate text (the model handles sentence splitting internally)
		// For better performance, translate in chunks if text is very long
		const maxChunkLength = 500; // Characters per chunk
		const chunks: string[] = [];

		if (text.length > maxChunkLength) {
			// Split into chunks at sentence boundaries
			let currentChunk = '';
			for (const sentence of sentences) {
				if ((currentChunk + sentence).length > maxChunkLength && currentChunk) {
					chunks.push(currentChunk.trim());
					currentChunk = sentence;
				} else {
					currentChunk += sentence;
				}
			}
			if (currentChunk.trim()) {
				chunks.push(currentChunk.trim());
			}
		} else {
			chunks.push(text);
		}

		// Translate each chunk
		const translatedChunks: string[] = [];
		for (let i = 0; i < chunks.length; i++) {
			const chunk = chunks[i];
			if (!chunk || !isRussianText(chunk)) {
				translatedChunks.push(chunk);
				continue;
			}

			const result = await translator(chunk);

			// Debug: log the result to see its structure
			console.log('Translation result:', JSON.stringify(result, null, 2));
			console.log('Result type:', typeof result);
			console.log('Is array:', Array.isArray(result));
			console.log('Original chunk:', chunk);

			// Extract translated text from result
			// @xenova/transformers returns: [{ translation_text: "..." }] or just the text string
			let translatedText = chunk; // Fallback to original if extraction fails

			try {
				// Handle different result formats
				if (Array.isArray(result) && result.length > 0) {
					const firstResult = result[0];

					// Check if it's an object with translation_text
					if (firstResult && typeof firstResult === 'object') {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						const resultObj = firstResult as any;

						// Try different possible property names
						if (resultObj.translation_text) {
							translatedText = resultObj.translation_text;
						} else if (resultObj.text) {
							translatedText = resultObj.text;
						} else if (resultObj.generated_text) {
							translatedText = resultObj.generated_text;
						} else {
							// Log the full structure to debug
							console.warn('Unexpected result object structure:', resultObj);
							console.warn('All keys:', Object.keys(resultObj));

							// Try to find any string value
							for (const value of Object.values(resultObj)) {
								if (
									typeof value === 'string' &&
									value !== chunk &&
									!isRussianText(value)
								) {
									translatedText = value;
									break;
								}
							}
						}
					} else if (typeof firstResult === 'string') {
						// Direct string result
						translatedText = firstResult;
					}
				} else if (
					result &&
					typeof result === 'object' &&
					!Array.isArray(result)
				) {
					// Single object result
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const resultObj = result as any;
					if (resultObj.translation_text) {
						translatedText = resultObj.translation_text;
					} else if (resultObj.text) {
						translatedText = resultObj.text;
					} else if (resultObj.generated_text) {
						translatedText = resultObj.generated_text;
					}
				} else if (typeof result === 'string') {
					// Direct string result
					translatedText = result;
				}

				// Validate that we got a translation (not the original Russian)
				if (translatedText === chunk && isRussianText(chunk)) {
					console.error('❌ Translation failed - returned original text');
					console.error('Result structure:', result);
					console.error('This indicates the model translation did not work');
					// Throw error to prevent using original text
					throw new Error(
						'Translation returned original Russian text - model may not be working'
					);
				}

				console.log('✅ Extracted translation:', translatedText);
				console.log('Translation successful:', translatedText !== chunk);
			} catch (extractError) {
				console.error('❌ Error extracting translation:', extractError);
				// Re-throw to prevent using original text as "translation"
				throw extractError;
			}

			translatedChunks.push(translatedText);

			// Update progress
			if (onProgress) {
				const progress = 50 + Math.round((i / chunks.length) * 40);
				onProgress(progress);
			}
		}

		if (onProgress) onProgress(100);

		// Join translated chunks
		const finalTranslation = translatedChunks.join(' ').trim();

		// Final validation - if we still have Russian text, something went wrong
		if (isRussianText(finalTranslation) && finalTranslation === text.trim()) {
			console.error(
				'❌ Final validation failed - translation is still Russian'
			);
			throw new Error(
				'Translation failed - model did not produce English translation'
			);
		}

		return finalTranslation;
	} catch (error) {
		console.error('❌ Translation error:', error);
		// Don't return original text - throw so caller knows translation failed
		throw error;
	}
}

/**
 * Translate text if it's Russian, otherwise return as-is
 * @param text - Text to translate
 * @param force - Force translation even if text doesn't appear Russian
 * @param onProgress - Optional callback for progress updates
 */
export async function translateIfRussian(
	text: string,
	force: boolean = false,
	onProgress?: (progress: number) => void
): Promise<string> {
	if (!force && !isRussianText(text)) {
		return text;
	}
	return translateRussianToEnglish(text, onProgress);
}
