/**
 * Dictionary index - exports all language dictionaries
 */
import { DE_DICTIONARY } from './de';
import { EN_DICTIONARY } from './en';
import { ES_DICTIONARY } from './es';
import { FR_DICTIONARY } from './fr';
import { KO_DICTIONARY } from './ko';
import { RU_DICTIONARY } from './ru';

export type DictionaryLang = 'en' | 'ru' | 'ko' | 'fr' | 'de' | 'es';

export const DICTIONARIES: Record<DictionaryLang, string[]> = {
	en: EN_DICTIONARY,
	ru: RU_DICTIONARY,
	ko: KO_DICTIONARY,
	fr: FR_DICTIONARY,
	de: DE_DICTIONARY,
	es: ES_DICTIONARY,
};
