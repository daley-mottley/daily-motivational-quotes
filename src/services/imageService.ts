
// Unsplash API service for fetching dynamic background images
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // User will need to get this
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Fallback images from our placeholder collection
const FALLBACK_IMAGES = [
  'photo-1469474968028-56623f02e42e', // mountain with sun rays
  'photo-1470071459604-3b5ec3a7fe05', // foggy mountain
  'photo-1500375592092-40eb2168fd21', // ocean wave
  'photo-1470813740244-df37b8c1edcb', // starry night
  'photo-1518495973542-4542c06a5843', // sunlight through trees
  'photo-1506744038136-46273834b3fb', // water surrounded by trees
  'photo-1501854140801-50d01698950b', // mountain view
  'photo-1509316975850-ff9c5deb0cd9', // pine trees
];

// Category-specific search terms for better image matching
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  success: ['mountain peak', 'sunrise', 'achievement', 'victory'],
  leadership: ['lighthouse', 'compass', 'path through forest', 'guiding light'],
  life: ['peaceful lake', 'tree of life', 'sunrise meadow', 'serene landscape'],
  dreams: ['starry sky', 'aurora borealis', 'dreamy clouds', 'night sky'],
  perseverance: ['rocky mountain', 'stormy ocean', 'weathered tree', 'breaking dawn'],
  action: ['flowing river', 'dynamic waves', 'wind in trees', 'active volcano'],
  mindfulness: ['zen garden', 'calm water', 'meditation stones', 'peaceful forest'],
  resilience: ['strong oak tree', 'waves against rocks', 'phoenix', 'desert bloom'],
  passion: ['burning sunset', 'vibrant flowers', 'fire', 'passionate colors'],
  change: ['butterfly', 'changing seasons', 'transformation', 'metamorphosis'],
  confidence: ['lion', 'eagle soaring', 'confident pose', 'strong stance'],
  courage: ['brave warrior', 'facing storm', 'leap of faith', 'conquering fear'],
  motivation: ['runner at sunrise', 'climbing mountain', 'reaching summit', 'breakthrough'],
  opportunity: ['open door', 'golden hour', 'new horizon', 'bridge crossing'],
  'inner strength': ['ancient tree', 'deep roots', 'inner light', 'core strength'],
  authenticity: ['mirror reflection', 'true self', 'authentic nature', 'being genuine'],
  wisdom: ['old library', 'wise owl', 'ancient wisdom', 'enlightenment'],
  potential: ['seed sprouting', 'diamond formation', 'hidden treasure', 'unlimited sky']
};

export interface ImageData {
  url: string;
  photographer: string;
  source: 'unsplash' | 'fallback';
  id: string;
}

class ImageService {
  private imageCache = new Map<string, ImageData>();

  constructor() {
    this.preloadFallbackImages();
  }

  // Preload fallback images for instant access
  private preloadFallbackImages(): void {
    if (typeof window !== 'undefined') {
      FALLBACK_IMAGES.forEach(id => {
        const img = new Image();
        img.src = `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`;
      });
    }
  }

  // Generate a cache key based on quote content and category
  private generateCacheKey(text: string, category: string): string {
    return `${category}-${text.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`;
  }

  // Get random search term for category
  private getSearchTerm(category: string): string {
    const keywords = CATEGORY_KEYWORDS[category] || ['nature', 'inspiration', 'motivation'];
    return keywords[Math.floor(Math.random() * keywords.length)];
  }

  // Fetch image from Unsplash
  private async fetchFromUnsplash(searchTerm: string): Promise<ImageData | null> {
    try {
      // For demo purposes, we'll use a placeholder approach
      // In production, user would need to add their Unsplash API key
      console.log(`Would search Unsplash for: ${searchTerm}`);
      
      // Return null to fall back to our curated images
      return null;
    } catch (error) {
      console.error('Unsplash API error:', error);
      return null;
    }
  }

  // Get fallback image
  private getFallbackImage(): ImageData {
    const randomId = FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
    return {
      url: `https://images.unsplash.com/${randomId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`,
      photographer: 'Unsplash',
      source: 'fallback',
      id: randomId
    };
  }

  // Main method to get image for quote
  async getImageForQuote(text: string, category: string): Promise<ImageData> {
    const cacheKey = this.generateCacheKey(text, category);
    
    // Check cache first
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!;
    }

    // Try to get from Unsplash
    const searchTerm = this.getSearchTerm(category);
    let imageData = await this.fetchFromUnsplash(searchTerm);

    // Fall back to curated images
    if (!imageData) {
      imageData = this.getFallbackImage();
    }

    // Cache the result
    this.imageCache.set(cacheKey, imageData);
    return imageData;
  }

  // Clear cache (useful for testing)
  clearCache(): void {
    this.imageCache.clear();
  }
}

export const imageService = new ImageService();
