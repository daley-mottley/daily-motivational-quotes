
import React from 'react';
import { Button } from './ui/button';
import { Quote } from '../data/quotes';
import { useFavorites } from '../hooks/useFavorites';
import { ArrowUp, Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface ActionButtonsProps {
  quote: Quote;
  onNewQuote: () => void;
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  quote, 
  onNewQuote, 
  className 
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className={cn("flex gap-4 justify-center p-6", className)}>
      <Button
        onClick={() => toggleFavorite(quote)}
        variant={isFavorite(quote.id.toString()) ? "default" : "outline"}
        size="lg"
        className={cn(
          "flex-1 max-w-[140px] h-12 rounded-xl font-medium transition-all duration-200",
          isFavorite(quote.id.toString()) 
            ? "bg-red-500 hover:bg-red-600 text-white" 
            : "border-2 border-gray-300 hover:border-red-500 hover:text-red-500"
        )}
      >
        {isFavorite(quote.id.toString()) ? (
          <>
            <X className="mr-2 h-4 w-4" />
            Unfavorite
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Favorite
          </>
        )}
      </Button>
      
      <Button
        onClick={onNewQuote}
        size="lg"
        className="flex-1 max-w-[140px] h-12 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-white border-0"
      >
        <ArrowUp className="mr-2 h-4 w-4" />
        New Quote
      </Button>
    </div>
  );
};
