
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
    const numericId = parseInt(quoteId, 10);
    setFavorites(prev => prev.filter(fav => fav.id !== numericId));
  };

  const isFavorite = (quoteId: string): boolean => {
    const numericId = parseInt(quoteId, 10);
    return favorites.some(fav => fav.id === numericId);
  };

  const toggleFavorite = (quote: Quote) => {
    if (isFavorite(quote.id.toString())) {
      removeFromFavorites(quote.id.toString());
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
