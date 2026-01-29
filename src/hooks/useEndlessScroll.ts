
import { useState, useEffect, useCallback, useRef } from 'react';
import { Quote } from '../data/quotes';
import { throttle } from '../lib/utils';
import { useLocalizedQuotes } from './useLocalizedQuotes';
import { imageService } from '../services/imageService';

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

export const useEndlessScroll = (version: 'quotes' | 'psalms') => {
  const localizedQuotes = useLocalizedQuotes(version);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>([]);

  const QUOTES_PER_PAGE = 6;
  const PREFETCH_PAGES = 2;

  // Use refs to store state values that are used in callbacks, to avoid dependencies
  const hasMoreRef = useRef(hasMore);
  const pageRef = useRef(page);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    hasMoreRef.current = hasMore;
    pageRef.current = page;
  }, [hasMore, page]);


  // Shuffle quotes on initial load and refresh
  useEffect(() => {
    // When the language changes (and thus localizedQuotes changes), reset everything
    // to ensure a fresh start with the new set of quotes.
    if (localizedQuotes.length > 0) {
      setQuotes([]);
      setPage(0);
      setHasMore(true);
      setShuffledQuotes(shuffleArray([...localizedQuotes]));
    }
  }, [localizedQuotes]);

  const loadMoreQuotes = useCallback((showLoading = false) => {
    if (isFetchingRef.current || !hasMoreRef.current || shuffledQuotes.length === 0) return;

    isFetchingRef.current = true;
    if (showLoading) {
      setLoading(true);
    }

    const startIndex = pageRef.current * QUOTES_PER_PAGE;
    const endIndex = startIndex + QUOTES_PER_PAGE;
    const newQuotes = shuffledQuotes.slice(startIndex, endIndex);

    if (newQuotes.length === 0) {
      setHasMore(false);
    } else {
      setQuotes(prev => [...prev, ...newQuotes]);
      setPage(prev => prev + 1);
    }

    if (showLoading) {
      setLoading(false);
    }
    isFetchingRef.current = false;
  }, [shuffledQuotes]);

  // Load initial quotes
  useEffect(() => {
    if (quotes.length === 0 && shuffledQuotes.length > 0) {
      loadMoreQuotes(true);
    }
  }, [loadMoreQuotes, quotes.length, shuffledQuotes.length]);

  // Preload the next batch of images for a smoother scrolling experience
  useEffect(() => {
    if (shuffledQuotes.length > quotes.length) {
      const nextBatchStartIndex = quotes.length;
      const nextBatchEndIndex = nextBatchStartIndex + QUOTES_PER_PAGE * PREFETCH_PAGES;
      const nextBatch = shuffledQuotes.slice(nextBatchStartIndex, nextBatchEndIndex);

      if (nextBatch.length > 0) {
        Promise.all(
          nextBatch.map(quote => imageService.getImageForQuote(quote.text, quote.category))
        ).then(imageDataArray => {
          const urls = imageDataArray.map(data => data.url);
          imageService.preloadImages(urls);
        });
      }
    }
  }, [quotes, shuffledQuotes]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1600) {
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
