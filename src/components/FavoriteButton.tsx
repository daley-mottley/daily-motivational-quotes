
import React from 'react';
import { Quote } from '../data/quotes';
import { useFavorites } from '../hooks/useFavorites';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '../lib/utils';

interface FavoriteButtonProps {
  quote: Quote;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ quote, className }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(quote.id.toString());

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => toggleFavorite(quote)}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className={cn(
              'absolute bottom-4 right-4 p-2 rounded-full transition-colors duration-200',
              'text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50',
              className
            )}
            variant="ghost"
          >
            <Heart
              className={cn(
                'w-6 h-6 transition-all duration-300',
                favorited ? 'fill-red-500 stroke-red-500' : 'stroke-white'
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{favorited ? 'Unfavorite' : 'Favorite'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
