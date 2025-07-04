
import React from 'react';
import { QuoteCard } from '../components/QuoteCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { Header } from '../components/Header';
import { useEndlessScroll } from '../hooks/useEndlessScroll';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const { quotes, loading, hasMore, refreshQuotes } = useEndlessScroll();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Refresh Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={refreshQuotes}
            className="flex items-center gap-2 px-6 py-3 bg-white shadow-md rounded-full text-gray-700 hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            <RefreshCw size={18} />
            <span className="font-medium">Refresh Feed</span>
          </button>
        </div>

        {/* Quotes Feed */}
        <div className="space-y-6 sm:space-y-8">
          {quotes.map((quote, index) => (
            <div key={`${quote.id}-${index}`} className="w-full">
              {/* Quote Card */}
              <QuoteCard quote={quote} className="mb-4" />
              
              {/* Social Share - Mobile Optimized */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <SocialShareButtons quote={quote} />
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading more inspiration...</span>
            </div>
          </div>
        )}

        {/* End of Feed Message */}
        {!hasMore && !loading && quotes.length > 0 && (
          <div className="text-center py-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                You've reached the end! 🎉
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                You've seen all our inspirational quotes. Come back tomorrow for fresh motivation!
              </p>
              <button
                onClick={refreshQuotes}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* App Info - Mobile Optimized */}
        <div className="text-center mt-8 mb-6 p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Daily Motivation
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Endless inspiration at your fingertips. Swipe through motivational quotes and share positivity with the world.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
