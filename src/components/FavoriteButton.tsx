
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick }) => {
  const { t } = useTranslation();

  const ariaLabel = isFavorite
    ? t('favorites.ariaLabelRemove')
    : t('favorites.ariaLabelAdd');

  const tooltipContent = isFavorite
    ? t('favorites.tooltipRemove')
    : t('favorites.tooltipAdd');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn(
            'text-white border-0 px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center justify-center min-w-[48px] h-[48px] shadow-lg hover:shadow-xl active:scale-95',
            isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
          )}
          size="icon"
        >
          <Heart className={cn('h-5 w-5 transition-all', isFavorite && 'fill-current')} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};
