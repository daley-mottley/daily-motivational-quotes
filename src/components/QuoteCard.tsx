
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
        "relative overflow-hidden rounded-3xl p-8 md:p-12 text-white min-h-[400px] md:min-h-[450px] flex flex-col justify-center items-center text-center shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      style={{
        backgroundImage: imageData ? `url(${imageData.url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Enhanced gradient overlay */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          `bg-gradient-to-br ${quote.backgroundGradient}`,
          imageData ? "opacity-85" : "opacity-100"
        )} 
      />
      
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Loading state with better animation */}
      {loading && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-sm">
          <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content with improved typography */}
      <div className="relative z-10 max-w-full mx-auto px-4">
        {/* Quote marks */}
        <div className="text-6xl md:text-8xl text-white/20 font-serif mb-4 leading-none">"</div>
        
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 text-white drop-shadow-lg max-w-2xl">
          {quote.text}
        </blockquote>
        
        <cite className="text-base md:text-lg font-semibold text-white/95 not-italic drop-shadow-md block mb-6">
          — {quote.author}
        </cite>
        
        {/* Enhanced category badge */}
      <!--
        <div className="flex justify-center">
          <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium capitalize border border-white/30 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full mr-2 opacity-80"></div>
            {quote.category}
          </span>
        </div>
      </div>
      -->


      {/* Decorative corner elements */}
      <div className="absolute top-6 left-6 text-6xl md:text-8xl text-white/10 font-serif drop-shadow-sm hidden md:block">
        "
      </div>
      <div className="absolute bottom-6 right-6 text-6xl md:text-8xl text-white/10 font-serif rotate-180 drop-shadow-sm hidden md:block">
        "
      </div>
      
      
    </div>
  );
};
