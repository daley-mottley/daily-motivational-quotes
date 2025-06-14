
import { useState, useEffect } from 'react';
import { Quote, motivationalQuotes } from '../data/quotes';

export const useQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  // Get daily quote based on current date
  const getDailyQuote = (): Quote => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % motivationalQuotes.length;
    return motivationalQuotes[quoteIndex];
  };

  // Get quote by category
  const getQuotesByCategory = (category: string): Quote[] => {
    if (category === 'all') return motivationalQuotes;
    return motivationalQuotes.filter(quote => quote.category === category);
  };

  // Get random quote
  const getRandomQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
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
    allQuotes: motivationalQuotes
  };
};
