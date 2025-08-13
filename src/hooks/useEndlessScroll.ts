
import { useState, useEffect, useCallback, useRef } from 'react';
import { Quote } from '../data/quotes';
import { throttle } from '../lib/utils';
import { useLocalizedQuotes } from './useLocalizedQuotes';

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
  const localizedQuotes = useLocalizedQuotes();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>([]);

  const QUOTES_PER_PAGE = 5;

  // Use refs to store state values that are used in callbacks, to avoid dependencies
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const pageRef = useRef(page);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    pageRef.current = page;
  }, [loading, hasMore, page]);


  // Shuffle quotes on initial load and refresh
  useEffect(() => {
    if (localizedQuotes.length > 0) {
      setShuffledQuotes(shuffleArray([...localizedQuotes]));
    }
  }, [localizedQuotes]); // Re-shuffle when language changes

  const loadMoreQuotes = useCallback(() => {
    if (loadingRef.current || !hasMoreRef.current || shuffledQuotes.length === 0) return;

    setLoading(true);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      const startIndex = pageRef.current * QUOTES_PER_PAGE;
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
  }, [shuffledQuotes]);

  // Load initial quotes
  useEffect(() => {
    if (quotes.length === 0 && shuffledQuotes.length > 0) {
      loadMoreQuotes();
    }
  }, [loadMoreQuotes, quotes.length, shuffledQuotes.length]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMoreQuotes();
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreQuotes]);

  const refreshQuotes = () => {
    setQuotes([]);
    setPage(0);
    setHasMore(true);
    setLoading(false);
    setShuffledQuotes(shuffleArray([...localizedQuotes])); // Reshuffle on refresh
  };

  return {
    quotes,
    loading,
    hasMore,
    refreshQuotes
  };
};
