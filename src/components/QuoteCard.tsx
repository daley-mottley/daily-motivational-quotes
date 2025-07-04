
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
        "relative overflow-hidden rounded-2xl p-8 md:p-12 text-white min-h-[400px] md:min-h-[500px] flex flex-col justify-center items-center text-center shadow-2xl transition-all duration-500",
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
          imageData ? "opacity-75" : "opacity-100"
        )} 
      />
      
      {/* Additional dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <blockquote className="text-xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8 text-white drop-shadow-lg">
          "{quote.text}"
        </blockquote>
        
        <cite className="text-base md:text-lg font-medium text-white/90 not-italic drop-shadow-md">
          — {quote.author}
        </cite>
        
        {/* Category badge */}
        <div className="mt-6">
          <span className="inline-block px-4 py-2 bg-white/25 backdrop-blur-sm rounded-full text-sm font-medium capitalize border border-white/20">
            {quote.category}
          </span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 text-6xl md:text-8xl text-white/20 font-serif drop-shadow-sm">
        "
      </div>
      <div className="absolute bottom-8 right-8 text-6xl md:text-8xl text-white/20 font-serif rotate-180 drop-shadow-sm">
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
