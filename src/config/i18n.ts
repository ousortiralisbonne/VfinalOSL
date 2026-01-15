import { Language } from '../types';

export const defaultLanguage: Language = 'en';

export const languages: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch'
};

export const dateFormats: Record<Language, string> = {
  en: 'MM/DD/YYYY',
  fr: 'DD/MM/YYYY',
  de: 'DD.MM.YYYY'
};

export const numberFormats: Record<Language, {
  currency: string;
  decimal: string;
  thousand: string;
}> = {
  en: { currency: 'EUR', decimal: '.', thousand: ',' },
  fr: { currency: 'EUR', decimal: ',', thousand: ' ' },
  de: { currency: 'EUR', decimal: ',', thousand: '.' }
};