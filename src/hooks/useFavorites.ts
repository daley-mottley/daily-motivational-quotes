
import { useState, useEffect } from 'react';
import { Quote } from '../data/quotes';

const FAVORITES_KEY = 'motivational-app-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (quote: Quote) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === quote.id)) {
        return prev; // Already in favorites
      }
      return [...prev, quote];
    });
  };

  const removeFromFavorites = (quoteId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== quoteId));
  };

  const isFavorite = (quoteId: string): boolean => {
    return favorites.some(fav => fav.id === quoteId);
  };

  const toggleFavorite = (quote: Quote) => {
    if (isFavorite(quote.id)) {
      removeFromFavorites(quote.id);
    } else {
      addToFavorites(quote);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};
