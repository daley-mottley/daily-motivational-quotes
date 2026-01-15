
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = React.memo(({ isFavorite, onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'absolute bottom-4 right-4 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        className
      )}
      size="icon"
    >
      <Heart
        className={cn(
          'w-6 h-6 transition-all duration-300 ease-in-out',
          isFavorite ? 'text-red-500 fill-current' : 'text-white fill-none'
        )}
      />
    </Button>
  );
});
