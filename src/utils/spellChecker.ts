import { DICTIONARIES, DictionaryLang } from './dictionaries';

// Import symspell - need to handle CommonJS module in ES module context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let SymSpellClass: any;
let symSpellLoaded = false;

async function loadSymSpell() {
	if (symSpellLoaded) return;

	// Dynamic import for CommonJS module
	const SymSpellModule = await import('symspell');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const moduleExport = (SymSpellModule as any).default || SymSpellModule;

	// Ensure we have the actual constructor function
	if (typeof moduleExport === 'function') {
		SymSpellClass = moduleExport;
	} else if (moduleExport && typeof moduleExport.default === 'function') {
		SymSpellClass = moduleExport.default;
	} else {
		throw new Error('SymSpell class not found in module export');
	}

	symSpellLoaded = true;
}

type SymSpell = InstanceType<typeof SymSpellClass>;

// Language type - maps OCR language codes to dictionary codes
type Lang = DictionaryLang;

// Separate instances for each language
const symSpellInstances: Partial<Record<Lang, SymSpell>> = {};
const dictionariesLoaded: Partial<Record<Lang, boolean>> = {};

// Language detection regexes
const CYRILLIC_RE = /[\u0400-\u04FF]/; // Russian Cyrillic
const HANGUL_RE = /[\uAC00-\uD7AF]/; // Korean Hangul syllables
const LETTER_RE = /\p{L}/u; // Any Unicode letter

// Map OCR language codes to dictionary language codes
const OCR_TO_DICT: Record<string, Lang> = {
	eng: 'en',
	// rus: 'ru',
	kor: 'ko',
	fra: 'fr',
	deu: 'de',
	spa: 'es',
	ita: 'it',
	nld: 'nl',
};

// Old dictionaries removed - now using dictionaries from ./dictionaries/index.ts
// All dictionaries are imported from separate files in ./dictionaries/

/**
 * Detect language by script (Cyrillic, Hangul) or use provided OCR language
 * For Latin script languages (en, fr, de, es), we rely on OCR language selection
 */
function detectLangByScript(token: string, ocrLanguages?: string[]): Lang {
	// Script-based detection for non-Latin scripts
	if (CYRILLIC_RE.test(token)) return 'ru';
	if (HANGUL_RE.test(token)) return 'ko';

	// For Latin script, try to use OCR language selection
	// If multiple Latin languages selected, default to first one
	if (ocrLanguages && ocrLanguages.length > 0) {
		for (const ocrLang of ocrLanguages) {
			const dictLang = OCR_TO_DICT[ocrLang];
			if (dictLang && ['en', 'fr', 'de', 'es', 'it', 'nl'].includes(dictLang)) {
				return dictLang;
			}
		}
	}

	// Default to English for Latin script
	return 'en';
}

/**
 * Normalize token for language-specific lookup
 * Russian: normalize ё→е for matching
 */
function normalizeForLang(token: string, lang: Lang): string {
	const nfkc = token.normalize('NFKC');
	if (lang === 'ru') {
		// Map ё→е for matching (but preserve original for display)
		return nfkc.replace(/ё/g, 'е').replace(/Ё/g, 'Е');
	}
	return nfkc;
}

/**
 * Preserve original casing in the corrected word
 */
function preserveCasing(original: string, replacement: string): string {
	// ALL CAPS
	if (original.toUpperCase() === original && /[A-ZА-ЯЁ가-힣]/.test(original)) {
		return replacement.toUpperCase();
	}
	// Title Case (first letter uppercase, rest lowercase)
	if (
		original[0] &&
		original[0].toUpperCase() === original[0] &&
		original.slice(1).toLowerCase() === original.slice(1)
	) {
		return replacement.charAt(0).toUpperCase() + replacement.slice(1);
	}
	return replacement;
}

/**
 * Add word to dictionary with frequency weighting
 */
function addWithFrequency(sym: SymSpell, lang: Lang, word: string, weight = 1) {
	const w = word.toLowerCase();
	for (let i = 0; i < Math.max(1, weight); i++) {
		sym.addWord(w, lang);
	}
}

/**
 * Initialize dictionary for a specific language
 */
async function ensureDictionary(lang: Lang): Promise<SymSpell> {
	if (dictionariesLoaded[lang] && symSpellInstances[lang]) {
		return symSpellInstances[lang];
	}

	// Load SymSpell if not already loaded
	await loadSymSpell();

	// Verify SymSpellClass is a constructor
	if (typeof SymSpellClass !== 'function') {
		throw new Error('SymSpellClass is not a constructor function');
	}

	const sym = new SymSpellClass(2); // maxEditDistance = 2
	symSpellInstances[lang] = sym;

	// Load dictionary from imported dictionaries
	const dictionary = DICTIONARIES[lang];
	if (dictionary) {
		dictionary.forEach((word, index) => {
			// Higher frequency for earlier words (more common)
			const frequency = Math.max(
				1,
				Math.floor((Math.max(200, dictionary.length) - index) / 2)
			);
			addWithFrequency(sym, lang, word, frequency);
		});
	}

	dictionariesLoaded[lang] = true;
	return sym;
}

/**
 * Initialize spell checker for a specific language (optional explicit initialization)
 */
export async function initializeLang(lang: Lang): Promise<void> {
	await ensureDictionary(lang);
}

/**
 * Multi-language spell correction
 * Detects language per token and corrects accordingly
 */
export async function correctSpellingMultilang(
	text: string,
	ocrLanguages?: string[]
): Promise<string> {
	// Tokenize: split into words/numbers vs separators (Unicode-safe)
	const tokens = [...text.matchAll(/\p{L}+|\p{N}+|[^\p{L}\p{N}]+/gu)].map(
		(m) => m[0]
	);
	if (tokens.length === 0) return text;

	const corrected: string[] = [];

	for (const tok of tokens) {
		// Skip non-words (punctuation, whitespace)
		if (!LETTER_RE.test(tok)) {
			corrected.push(tok);
			continue;
		}

		// Skip numbers or very short tokens
		if (/^\p{N}+$/u.test(tok) || tok.length <= 1) {
			corrected.push(tok);
			continue;
		}

		// Detect language for this token
		const lang = detectLangByScript(tok, ocrLanguages);

		// Get dictionary for this language
		const sym = await ensureDictionary(lang);

		// Normalize for lookup
		const normalized = normalizeForLang(tok, lang);
		const lower = normalized.toLowerCase();

		// Get suggestions
		const suggestions = sym.lookup(lower, lang);

		if (!suggestions || suggestions.length === 0) {
			corrected.push(tok);
			continue;
		}

		const best = suggestions[0];

		// Only replace if confident (edit distance <= 1 or high frequency)
		const confident = best.distance <= 1 || best.count > 5;

		if (!confident) {
			corrected.push(tok);
			continue;
		}

		// Preserve casing and add corrected word
		const out = preserveCasing(tok, best.term);
		corrected.push(out);
	}

	return corrected.join('');
}

/**
 * Correct spelling in text (supports English, French, German, Spanish, Russian, and Korean)
 * @param text - Text to correct
 * @param language - Language string from OCR (e.g., 'eng', 'fra', 'deu', 'spa', 'rus', 'kor', 'eng+fra')
 */
export const correctSpelling = async (
	text: string,
	language: string
): Promise<string> => {
	try {
		// Parse OCR language string (e.g., 'eng', 'eng+kor', 'fra+deu')
		const ocrLangs = language.split('+').map((lang) => lang.trim());

		// Check if any supported languages are selected
		const supportedLangs = ocrLangs.filter((lang) => OCR_TO_DICT[lang]);

		// If no supported languages, return original text
		if (supportedLangs.length === 0) {
			return text;
		}

		// Use multi-language correction with OCR language info
		return await correctSpellingMultilang(text, ocrLangs);
	} catch (error) {
		console.error('Spell checking error:', error);
		return text; // Return original text if spell checking fails
	}
};

/**
 * Initialize spell checker (backward compatibility)
 * @deprecated Use initializeLang() for specific languages or let it auto-initialize
 */
export const initializeSpellChecker = async (): Promise<SymSpell> => {
	return await ensureDictionary('en');
};
