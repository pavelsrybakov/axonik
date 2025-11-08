// Use direct API call through Vite proxy to avoid CORS issues

export interface PIIToken {
	entity: string;
	word: string;
	start: number;
	end: number;
	score: number;
}

/**
 * Fallback regex-based PII detection for hackathon/demo when API is unavailable
 * Detects: emails, phone numbers, and common name patterns
 */
function detectPIIWithRegex(text: string): PIIToken[] {
	const tokens: PIIToken[] = [];

	// Email pattern
	const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
	let emailMatch: RegExpExecArray | null;
	while ((emailMatch = emailRegex.exec(text)) !== null) {
		tokens.push({
			entity: 'EMAIL',
			word: emailMatch[0],
			start: emailMatch.index,
			end: emailMatch.index + emailMatch[0].length,
			score: 0.9,
		});
	}

	// Phone number patterns (international and US formats)
	const phoneRegex =
		/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+\d{10,15}/g;
	let phoneMatch: RegExpExecArray | null;
	while ((phoneMatch = phoneRegex.exec(text)) !== null) {
		tokens.push({
			entity: 'PHONE',
			word: phoneMatch[0],
			start: phoneMatch.index,
			end: phoneMatch.index + phoneMatch[0].length,
			score: 0.85,
		});
	}

	// Common name patterns (capitalized words that look like names)
	// This is a simple heuristic - looks for "First Last" pattern
	const nameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g;
	let nameMatch: RegExpExecArray | null;
	while ((nameMatch = nameRegex.exec(text)) !== null) {
		// Skip common false positives
		const falsePositives = [
			'Full Stack',
			'React Native',
			'New York',
			'May 2025',
			'Remote Belgium',
		];
		if (!falsePositives.some((fp) => nameMatch![0].includes(fp))) {
			tokens.push({
				entity: 'PERSON',
				word: nameMatch[0],
				start: nameMatch.index,
				end: nameMatch.index + nameMatch[0].length,
				score: 0.7,
			});
		}
	}

	return tokens;
}

interface HuggingFaceTokenResult {
	entity?: string;
	label?: string;
	word?: string;
	token?: string;
	start?: number;
	end?: number;
	score?: number;
	confidence?: number;
}

/**
 * Detects personal information in text using Hugging Face model
 * @param text - Text to analyze for personal information
 * @returns Array of detected PII tokens
 */
export async function detectPersonalInformation(
	text: string
): Promise<PIIToken[]> {
	try {
		console.log(
			'🔍 Starting PII detection for text:',
			text.substring(0, 100) + '...'
		);

		// Use direct API call through Vite proxy to avoid CORS issues
		const token = import.meta.env.VITE_HF_TOKEN;
		const response = await fetch(
			'/api/hf/models/iiiorg/piiranha-v1-detect-personal-information',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: JSON.stringify({
					inputs: text,
					model: 'iiiorg/piiranha-v1-detect-personal-information',
				}),
			}
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('❌ API response error:', response.status, errorText);
			throw new Error(`API request failed: ${response.status} ${errorText}`);
		}

		const output = await response.json();

		console.log('📥 Raw API output:', JSON.stringify(output, null, 2));
		console.log('📥 Output type:', typeof output);
		console.log('📥 Is array:', Array.isArray(output));

		// The output format from Hugging Face tokenClassification:
		// Array of objects with: entity, word, start, end, score
		// Or sometimes nested in a different structure
		if (Array.isArray(output)) {
			console.log('✅ Output is array, length:', output.length);
			// Map the output to our PIIToken format
			const tokens = output.map((item: HuggingFaceTokenResult) => ({
				entity: item.entity || item.label || '',
				word: item.word || item.token || '',
				start: item.start || 0,
				end: item.end || 0,
				score: item.score || item.confidence || 0,
			}));
			console.log('🎯 Mapped PII tokens:', tokens);
			return tokens;
		}

		// If output is an object with a results array
		if (output && typeof output === 'object' && 'results' in output) {
			console.log('✅ Output has results array');
			const results = (output as { results: HuggingFaceTokenResult[] }).results;
			const tokens = results.map((item: HuggingFaceTokenResult) => ({
				entity: item.entity || item.label || '',
				word: item.word || item.token || '',
				start: item.start || 0,
				end: item.end || 0,
				score: item.score || item.confidence || 0,
			}));
			console.log('🎯 Mapped PII tokens:', tokens);
			return tokens;
		}

		// Check if output is an object with array values
		if (output && typeof output === 'object') {
			console.log('🔍 Output is object, keys:', Object.keys(output));
			// Try to find any array property
			for (const [key, value] of Object.entries(output)) {
				if (Array.isArray(value)) {
					console.log(`✅ Found array in key "${key}"`);
					const tokens = value.map((item: HuggingFaceTokenResult) => ({
						entity: item.entity || item.label || '',
						word: item.word || item.token || '',
						start: item.start || 0,
						end: item.end || 0,
						score: item.score || item.confidence || 0,
					}));
					console.log('🎯 Mapped PII tokens:', tokens);
					return tokens;
				}
			}
		}

		console.warn('⚠️ Unexpected PII detection output format:', output);
		return [];
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		console.error('❌ PII detection error:', errorMessage);
		console.error('❌ Full error:', error);

		// For hackathon/demo: fallback to regex-based detection if API fails
		console.log('🔄 Falling back to regex-based PII detection...');
		const regexTokens = detectPIIWithRegex(text);
		if (regexTokens.length > 0) {
			console.log('✅ Regex detection found', regexTokens.length, 'PII tokens');
			return regexTokens;
		}

		// Return empty array if both API and regex fail
		return [];
	}
}

/**
 * Masks personal information in text by replacing detected PII with [REDACTED]
 * @param text - Original text
 * @param piiTokens - Array of detected PII tokens
 * @returns Text with personal information masked
 */
export function maskPersonalInformation(
	text: string,
	piiTokens: PIIToken[]
): string {
	console.log('🔒 Masking PII. Tokens found:', piiTokens.length);

	if (piiTokens.length === 0) {
		console.log('⚠️ No PII tokens to mask');
		return text;
	}

	// Sort tokens by start position in reverse order to avoid index shifting issues
	const sortedTokens = [...piiTokens].sort((a, b) => b.start - a.start);
	console.log('📋 Sorted tokens:', sortedTokens);

	let maskedText = text;
	for (const token of sortedTokens) {
		console.log(
			`🔒 Masking token: "${token.word}" at position ${token.start}-${token.end}`
		);
		// Replace the detected PII with [REDACTED]
		const before = maskedText.substring(0, token.start);
		const after = maskedText.substring(token.end);
		maskedText = before + '[REDACTED]' + after;
		console.log(`✅ Masked text preview: ${maskedText.substring(0, 100)}...`);
	}

	console.log('✅ Final masked text length:', maskedText.length);
	return maskedText;
}

/**
 * Detects and masks personal information in a single function call
 * @param text - Text to process
 * @returns Text with personal information masked
 */
export async function detectAndMaskPersonalInformation(
	text: string
): Promise<string> {
	console.log('🚀 Starting detectAndMaskPersonalInformation');
	try {
		const piiTokens = await detectPersonalInformation(text);
		console.log('✅ Detection complete, tokens:', piiTokens.length);
		const masked = maskPersonalInformation(text, piiTokens);
		console.log('✅ Masking complete');
		return masked;
	} catch (error) {
		console.error('❌ Error in detectAndMaskPersonalInformation:', error);
		// Return original text if detection fails
		return text;
	}
}
