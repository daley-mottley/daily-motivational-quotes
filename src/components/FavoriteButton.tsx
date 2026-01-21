import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { Quote } from '../data/quotes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface FavoriteButtonProps {
  quote: Quote;
}

export const FavoriteButton = ({ quote }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  const isFav = isFavorite(String(quote.id));
  const label = isFav ? t('buttons.unfavorite') : t('buttons.favorite');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => toggleFavorite(quote)}
            aria-label={label}
            className="absolute top-4 right-4 p-2 text-white rounded-full transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Heart className={cn('w-6 h-6', isFav && 'fill-red-500 text-red-500')} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
