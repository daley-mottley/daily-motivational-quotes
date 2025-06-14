
import React from 'react';
import { useQuotes } from '../hooks/useQuotes';
import { QuoteCard } from '../components/QuoteCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ActionButtons } from '../components/ActionButtons';
import { Header } from '../components/Header';

const Index = () => {
  const { currentQuote, loading, getRandomQuote, setCurrentQuote } = useQuotes();

  const handleNewQuote = () => {
    const newQuote = getRandomQuote();
    setCurrentQuote(newQuote);
  };

  if (loading || !currentQuote) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Quote Card */}
        <div className="mb-8">
          <QuoteCard quote={currentQuote} />
        </div>
        
        {/* Action Buttons */}
        <ActionButtons 
          quote={currentQuote} 
          onNewQuote={handleNewQuote}
        />
        
        {/* App Info */}
        <div className="text-center mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Daily Motivation
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Start each day with inspiration. Get a new motivational quote daily, 
            save your favorites, and share positivity with others.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
