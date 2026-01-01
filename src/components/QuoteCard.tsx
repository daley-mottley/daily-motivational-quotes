
import React, { useState, useEffect, useRef } from 'react';
import { Quote } from '../data/quotes';
import { cn } from '../lib/utils';
import { useImageBackground } from '../hooks/useImageBackground';

interface QuoteCardProps {
  quote: Quote;
  className?: string;
}

// PERFORMANCE OPTIMIZATION:
// Wrapped QuoteCard with React.memo to prevent unnecessary re-renders when its props
// have not changed. This is crucial for performance, especially if the parent component
// re-renders frequently, as it avoids re-calculating animations and styles for visible cards.
export const QuoteCard: React.FC<QuoteCardProps> = React.memo(({ quote, className }) => {
  const { imageData, loading } = useImageBackground(quote);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    const node = cardRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <figure
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-3xl p-8 md:p-12 text-white min-h-[400px] md:min-h-[450px] flex flex-col justify-center items-center text-center shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      style={{
        backgroundImage: imageData ? `url(${imageData.url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Enhanced gradient overlay */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          `bg-gradient-to-br ${quote.backgroundGradient}`,
          imageData ? 'opacity-85' : 'opacity-100'
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
        <div className="text-6xl md:text-8xl text-white/20 font-serif mb-4 leading-none">
          "
        </div>

        <blockquote
          className={cn(
            'text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 text-white drop-shadow-lg max-w-2xl'
          )}
        >
          {quote.text.split(' ').map((word, index) => (
            <span
              key={index}
              className={cn(
                'inline-block transition-opacity duration-300 ease-in',
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {word}
            </span>
          )).reduce((prev, curr) => <>{prev} {curr}</>)}
        </blockquote>

        <figcaption
          className={cn(
            'text-base md:text-lg font-semibold text-white/95 not-italic drop-shadow-md block mb-6',
            'transition-opacity duration-500 ease-out',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            transitionDelay: `${quote.text.split(' ').length * 150 + 200}ms`,
          }}
        >
          — {quote.author}
        </figcaption>

        {/* Enhanced category badge */}
        <div
          className="flex justify-center"
          style={{ display: 'none' }}
        >
          <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium capitalize border border-white/30 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full mr-2 opacity-80"></div>
            {quote.category}
          </span>
        </div>
      </div>
      


    </figure>
  );
});
