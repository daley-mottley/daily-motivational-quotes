
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

export const useEndlessScroll = (version: 'quotes' | 'psalms' | 'proverbs') => {
  const localizedQuotes = useLocalizedQuotes(version);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const allQuotes = useRef<Quote[]>([]);

  const QUOTES_PER_PAGE = 5;

  const loadMoreQuotes = useCallback((isInitialLoad = false) => {
    if (loading && !isInitialLoad) return;

    setLoading(true);

    setTimeout(() => {
      const startIndex = page * QUOTES_PER_PAGE;
      const endIndex = startIndex + QUOTES_PER_PAGE;
      const newQuotes = allQuotes.current.slice(startIndex, endIndex);

      if (newQuotes.length === 0) {
        setHasMore(false);
      } else {
        setQuotes(prev => isInitialLoad ? newQuotes : [...prev, ...newQuotes]);
        setPage(prev => prev + 1);
      }
      setLoading(false);
    }, 800);
  }, [loading, page]);

  useEffect(() => {
    setQuotes([]);
    setPage(0);
    setHasMore(true);

    const processedQuotes = version === 'proverbs' ? [...localizedQuotes] : shuffleArray([...localizedQuotes]);
    allQuotes.current = processedQuotes;

    if (processedQuotes.length > 0) {
      loadMoreQuotes(true);
    }
  }, [version, localizedQuotes, loadMoreQuotes]);

  // Preload the next batch of images for a smoother scrolling experience
  useEffect(() => {
    if (allQuotes.current.length > quotes.length) {
      const nextBatchStartIndex = quotes.length;
      const nextBatchEndIndex = nextBatchStartIndex + QUOTES_PER_PAGE;
      const nextBatch = allQuotes.current.slice(nextBatchStartIndex, nextBatchEndIndex);

      if (nextBatch.length > 0) {
        Promise.all(
          nextBatch.map(quote => imageService.getImageForQuote(quote.text, quote.category))
        ).then(imageDataArray => {
          const urls = imageDataArray.map(data => data.url);
          imageService.preloadImages(urls);
        });
      }
    }
  }, [quotes]);

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
    setPage(0);
    setQuotes([]);
    setHasMore(true);
    allQuotes.current = version === 'proverbs' ? [...localizedQuotes] : shuffleArray([...localizedQuotes]);
    loadMoreQuotes(true);
  };

  return {
    quotes,
    loading,
    hasMore,
    refreshQuotes
  };
};
