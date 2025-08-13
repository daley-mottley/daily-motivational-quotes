
import { useState, useEffect } from 'react';
import { Quote } from '../data/quotes';
import { useLocalizedQuotes } from './useLocalizedQuotes';

export const useQuotes = () => {
  const localizedQuotes = useLocalizedQuotes();
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  // Get daily quote based on current date
  const getDailyQuote = (): Quote => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % localizedQuotes.length;
    return localizedQuotes[quoteIndex];
  };

  // Get quote by category
  const getQuotesByCategory = (category: string): Quote[] => {
    if (category === 'all') return localizedQuotes;
    return localizedQuotes.filter(quote => quote.category === category);
  };

  // Get random quote
  const getRandomQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * localizedQuotes.length);
    return localizedQuotes[randomIndex];
  };

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setCurrentQuote(getDailyQuote());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    currentQuote,
    loading,
    getDailyQuote,
    getQuotesByCategory,
    getRandomQuote,
    setCurrentQuote,
    allQuotes: localizedQuotes
  };
};
