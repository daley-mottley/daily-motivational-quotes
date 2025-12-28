
import { useState, useEffect } from 'react';
import { imageService, ImageData } from '../services/imageService';
import { Quote } from '../data/quotes';

export const useImageBackground = (quote: Quote | null) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!quote) return;

    const fetchImage = async () => {
      setLoading(true);
      try {
        const image = await imageService.getImageForQuote(quote.text, quote.category);
        setImageData(image);
      } catch (error) {
        console.error('Error fetching background image:', error);
        // Use a default fallback
        setImageData({
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          photographer: 'Unsplash',
          source: 'fallback',
          id: 'default'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  // PERFORMANCE OPTIMIZATION:
  // This dependency array is intentionally structured to only re-run the effect
  // when the *content* of the quote changes, not the object reference.
  // The 'quote' object is re-created on each render cycle of the parent,
  // so including 'quote' itself would cause unnecessary image fetches.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote?.id, quote?.text, quote?.category]);

  return { imageData, loading };
};
