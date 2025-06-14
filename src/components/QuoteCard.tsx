
import React from 'react';
import { Quote } from '../data/quotes';
import { cn } from '../lib/utils';

interface QuoteCardProps {
  quote: Quote;
  className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, className }) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 md:p-12 text-white min-h-[400px] md:min-h-[500px] flex flex-col justify-center items-center text-center shadow-2xl",
        `bg-gradient-to-br ${quote.backgroundGradient}`,
        className
      )}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <blockquote className="text-xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8 text-white/95">
          "{quote.text}"
        </blockquote>
        
        <cite className="text-base md:text-lg font-medium text-white/80 not-italic">
          — {quote.author}
        </cite>
        
        {/* Category badge */}
        <div className="mt-6">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
            {quote.category}
          </span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 text-6xl md:text-8xl text-white/10 font-serif">
        "
      </div>
      <div className="absolute bottom-8 right-8 text-6xl md:text-8xl text-white/10 font-serif rotate-180">
        "
      </div>
    </div>
  );
};
