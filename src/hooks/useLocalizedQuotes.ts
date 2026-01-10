import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from '../data/quotes';

const modules = import.meta.glob('../data/*.ts');

export const useLocalizedQuotes = (version: 'quotes' | 'psalms'): Quote[] => {
  const { i18n } = useTranslation();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadQuotes = async () => {
      const path = `../data/${version}-${currentLanguage}.ts`;
      const fallbackPath = `../data/${version}-en.ts`;

      try {
        let dataModule;
        if (modules[path]) {
          dataModule = await modules[path]();
        } else {
          dataModule = await modules[fallbackPath]();
        }

        const data = dataModule.data || [];
        setQuotes(data);
      } catch (error) {
        console.error(`Could not load data for version=${version}`, error);
        setQuotes([]);
      }
    };

    loadQuotes();
  }, [version, currentLanguage]);

  const memoizedQuotes = useMemo(() => quotes, [quotes]);

  return memoizedQuotes;
};