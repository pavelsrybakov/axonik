/**
 * Dictionary index - exports all language dictionaries
 */
import { DE_DICTIONARY } from './de';
import { EN_DICTIONARY } from './en';
import { ES_DICTIONARY } from './es';
import { FR_DICTIONARY } from './fr';
import { IT_DICTIONARY } from './it';
import { KO_DICTIONARY } from './ko';
import { NL_DICTIONARY } from './nl';
import { RU_DICTIONARY } from './ru';

export type DictionaryLang =
	| 'en'
	| 'ru'
	| 'ko'
	| 'fr'
	| 'de'
	| 'es'
	| 'it'
	| 'nl';

export const DICTIONARIES: Record<DictionaryLang, string[]> = {
	en: EN_DICTIONARY,
	ru: RU_DICTIONARY,
	ko: KO_DICTIONARY,
	fr: FR_DICTIONARY,
	de: DE_DICTIONARY,
	es: ES_DICTIONARY,
	it: IT_DICTIONARY,
	nl: NL_DICTIONARY,
};
