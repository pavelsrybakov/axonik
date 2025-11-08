declare module 'symspell' {
	export interface Suggestion {
		term: string;
		distance: number;
		count: number;
	}

	export default class SymSpell {
		constructor(maxEditDistance?: number, mode?: number);
		addWord(word: string, language?: string): void;
		addWords(corpus: string, language?: string, tokenizer?: Function): void;
		lookup(word: string, language?: string): Suggestion[];
	}
}
