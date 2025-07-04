
import React from 'react';
import { Quote } from '../data/quotes';
import { cn } from '../lib/utils';
import { useImageBackground } from '../hooks/useImageBackground';

interface QuoteCardProps {
  quote: Quote;
  className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, className }) => {
  const { imageData, loading } = useImageBackground(quote);

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 text-white min-h-[350px] sm:min-h-[400px] md:min-h-[450px] flex flex-col justify-center items-center text-center shadow-2xl transition-all duration-500 touch-manipulation",
        className
      )}
      style={{
        backgroundImage: imageData ? `url(${imageData.url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          `bg-gradient-to-br ${quote.backgroundGradient}`,
          imageData ? "opacity-80" : "opacity-100"
        )} 
      />
      
      {/* Additional dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/25" />
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 max-w-full mx-auto px-2">
        <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-6 sm:mb-8 text-white drop-shadow-lg">
          "{quote.text}"
        </blockquote>
        
        <cite className="text-sm sm:text-base md:text-lg font-medium text-white/90 not-italic drop-shadow-md">
          — {quote.author}
        </cite>
        
        {/* Category badge */}
        <div className="mt-4 sm:mt-6">
          <span className="inline-block px-3 sm:px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium capitalize border border-white/20">
            {quote.category}
          </span>
        </div>
      </div>
      
      {/* Decorative elements - Hidden on small screens */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 text-4xl sm:text-6xl md:text-8xl text-white/15 font-serif drop-shadow-sm hidden sm:block">
        "
      </div>
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 text-4xl sm:text-6xl md:text-8xl text-white/15 font-serif rotate-180 drop-shadow-sm hidden sm:block">
        "
      </div>
      
      {/* Image credit */}
      {imageData && (
        <div className="absolute bottom-2 right-2 text-xs text-white/60 backdrop-blur-sm bg-black/20 px-2 py-1 rounded">
          Photo by {imageData.photographer}
        </div>
      )}
    </div>
  );
};
