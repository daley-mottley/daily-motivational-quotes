
import { useState, useEffect, useCallback } from 'react';
import { Quote, motivationalQuotes } from '../data/quotes';

export const useEndlessScroll = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const QUOTES_PER_PAGE = 5;

  const loadMoreQuotes = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      const startIndex = page * QUOTES_PER_PAGE;
      const endIndex = startIndex + QUOTES_PER_PAGE;
      const newQuotes = motivationalQuotes.slice(startIndex, endIndex);
      
      if (newQuotes.length === 0) {
        setHasMore(false);
      } else {
        setQuotes(prev => [...prev, ...newQuotes]);
        setPage(prev => prev + 1);
      }
      
      setLoading(false);
    }, 800);
  }, [page, loading, hasMore]);

  // Load initial quotes
  useEffect(() => {
    if (quotes.length === 0) {
      loadMoreQuotes();
    }
  }, [loadMoreQuotes, quotes.length]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMoreQuotes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreQuotes]);

  const refreshQuotes = () => {
    setQuotes([]);
    setPage(0);
    setHasMore(true);
    setLoading(false);
  };

  return {
    quotes,
    loading,
    hasMore,
    refreshQuotes
  };
};
