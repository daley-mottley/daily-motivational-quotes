import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from '../data/quotes';
import { quotesEn } from '../data/quotes-en';
import { quotesEs } from '../data/quotes-es';
import { quotesFr } from '../data/quotes-fr';
import { quotesDe } from '../data/quotes-de';
import { quotesIt } from '../data/quotes-it';
import { quotesPt } from '../data/quotes-pt';
import { quotesZh } from '../data/quotes-zh';
import { quotesJa } from '../data/quotes-ja';

const quotesMap = {
  en: quotesEn,
  es: quotesEs,
  fr: quotesFr,
  de: quotesDe,
  it: quotesIt,
  pt: quotesPt,
  zh: quotesZh,
  ja: quotesJa,
};

export const useLocalizedQuotes = (): Quote[] => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as keyof typeof quotesMap;
  
  // Memoize the result to ensure a stable reference is returned unless the language changes.
  const quotes = useMemo(() => {
    return quotesMap[currentLanguage] || quotesMap.en;
  }, [currentLanguage]);

  return quotes;
};