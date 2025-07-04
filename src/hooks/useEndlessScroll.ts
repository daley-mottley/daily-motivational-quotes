
import { useState, useEffect, useCallback } from 'react';
import { Quote, motivationalQuotes } from '../data/quotes';

// Fisher-Yates (Knuth) Shuffle Algorithm
const shuffleArray = (array: Quote[]) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const useEndlessScroll = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>([]);

  const QUOTES_PER_PAGE = 5;

  // Shuffle quotes on initial load and refresh
  useEffect(() => {
    setShuffledQuotes(shuffleArray([...motivationalQuotes]));
  }, []); // Empty dependency array means this runs once on mount

  const loadMoreQuotes = useCallback(() => {
    if (loading || !hasMore || shuffledQuotes.length === 0) return;

    setLoading(true);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      const startIndex = page * QUOTES_PER_PAGE;
      const endIndex = startIndex + QUOTES_PER_PAGE;
      const newQuotes = shuffledQuotes.slice(startIndex, endIndex);
      
      if (newQuotes.length === 0) {
        setHasMore(false);
      } else {
        setQuotes(prev => [...prev, ...newQuotes]);
        setPage(prev => prev + 1);
      }
      
      setLoading(false);
    }, 800);
  }, [page, loading, hasMore, shuffledQuotes]);

  // Load initial quotes
  useEffect(() => {
    if (quotes.length === 0 && shuffledQuotes.length > 0) {
      loadMoreQuotes();
    }
  }, [loadMoreQuotes, quotes.length, shuffledQuotes.length]);

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
    setShuffledQuotes(shuffleArray([...motivationalQuotes])); // Reshuffle on refresh
  };

  return {
    quotes,
    loading,
    hasMore,
    refreshQuotes
  };
};
