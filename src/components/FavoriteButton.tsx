
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className,
}) => {
  const label = isFavorite ? 'Remove from favorites' : 'Add to favorites';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'group rounded-full transition-colors duration-300',
              'hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/50',
              className
            )}
            aria-label={label}
            onClick={onClick}
          >
            <Heart
              className={cn(
                'w-6 h-6 transition-all duration-300 ease-in-out',
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'fill-transparent text-white/80 group-hover:text-white',
                'group-hover:scale-110'
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
