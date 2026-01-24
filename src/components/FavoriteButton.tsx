
import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { Quote } from '../data/quotes';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface FavoriteButtonProps {
  quote: Quote;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ quote, className }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  const isQuoteFavorite = isFavorite(String(quote.id));

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click-through
    toggleFavorite(quote);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleToggleFavorite}
            aria-label={isQuoteFavorite ? t('favorites.ariaLabelRemove') : t('favorites.ariaLabelAdd')}
            className={cn(
              'absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm border border-white/20',
              className
            )}
            size="icon"
          >
            <Heart className={cn('h-6 w-6', isQuoteFavorite ? 'fill-red-500 text-red-500' : 'text-white/80')} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isQuoteFavorite ? t('favorites.remove') : t('favorites.add')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
