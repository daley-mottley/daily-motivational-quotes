
import React from 'react';
import { QuoteCard } from '../components/QuoteCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { Header } from '../components/Header';
import { useEndlessScroll } from '../hooks/useEndlessScroll';
import { RefreshCw, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { quotes, loading, hasMore, refreshQuotes } = useEndlessScroll();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
      <Header />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={refreshQuotes}
            className="flex items-center gap-3 px-8 py-4 bg-white shadow-lg rounded-full text-gray-700 hover:shadow-xl transition-all duration-300 active:scale-95 border border-gray-100"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              <RefreshCw size={20} className="text-blue-500" />
            )}
            <span className="font-semibold text-lg">{loading ? t('buttons.refreshing') : t('buttons.freshInspiration')}</span>
          </button>
        </div>

        {/* Quotes Feed */}
        <div className="space-y-8">
          {/*
            PERFORMANCE OPTIMIZATION:
            Using the stable and unique `quote.id` as the key is crucial for React's reconciliation process.
            Previously, using the array index could lead to unnecessary re-renders of the entire list
            when new quotes are loaded, as React wouldn't be able to identify which elements are stable.
            This change ensures that only new components are rendered, improving scroll performance.
          */}
          {quotes.map((quote, index) => (
            <article key={quote.id} className="w-full">
              {/* Quote Card */}
              <div className="mb-6">
                <QuoteCard quote={quote} className="quote-card" index={index} />
              </div>
              
              {/* Social Share - Enhanced Design */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
                <SocialShareButtons quote={quote} />
              </div>
            </article>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-4 text-gray-600 bg-white/80 backdrop-blur-sm rounded-full px-6 py-4 shadow-lg">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-sm font-medium">{t('loading.moreInspiration')}</span>
            </div>
          </div>
        )}

        {/* End of Feed Message */}
        {!hasMore && !loading && quotes.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100/50">
              <div className="flex justify-center mb-4">
                <Sparkles className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {t('endOfFeed.title')}
              </h3>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">
                {t('endOfFeed.description')}
              </p>
              <button
                onClick={refreshQuotes}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                {t('buttons.startOver')}
              </button>
            </div>
          </div>
        )}

        {/* App Info - Enhanced Design */}
        <div className="text-center mt-12 mb-8 p-8 bg-gradient-to-r from-gray-50 to-white backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100/50">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {t('app.name')}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            {t('app.description')}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
