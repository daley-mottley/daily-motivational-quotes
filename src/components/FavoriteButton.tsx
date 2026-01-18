
import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { Quote } from '../data/quotes';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface FavoriteButtonProps {
  quote: Quote;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ quote, className }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();
  const isQuoteFavorite = isFavorite(String(quote.id));

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click/animations
    toggleFavorite(quote);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            aria-label={isQuoteFavorite ? t('favorites.removeAriaLabel') : t('favorites.addAriaLabel')}
            aria-pressed={isQuoteFavorite}
            className={cn(
              'absolute bottom-4 right-4 text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-white/50',
              'h-12 w-12 p-0 flex items-center justify-center bg-black/20 hover:bg-black/30',
              className
            )}
          >
            <Heart
              className={cn(
                'h-6 w-6 transition-all duration-300 ease-in-out',
                isQuoteFavorite ? 'text-red-500 fill-current' : 'text-white/80'
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isQuoteFavorite ? t('favorites.removeTooltip') : t('favorites.addTooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
