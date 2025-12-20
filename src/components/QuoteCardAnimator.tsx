
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QuoteCard } from './QuoteCard';
import { Quote } from '../data/quotes';

gsap.registerPlugin(ScrollTrigger);

interface QuoteCardAnimatorProps {
  quote: Quote;
  className?: string;
}

export const QuoteCardAnimator: React.FC<QuoteCardAnimatorProps> = ({ quote, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      const quoteText = cardElement.querySelector('blockquote');
      const quoteAuthor = cardElement.querySelector('cite');

      if (quoteText && quoteAuthor) {
        gsap.set([quoteText, quoteAuthor], { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.to(quoteText, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          .to(quoteAuthor, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    }
  }, []);

  return (
    <div ref={cardRef}>
      <QuoteCard quote={quote} className={className} />
    </div>
  );
};
