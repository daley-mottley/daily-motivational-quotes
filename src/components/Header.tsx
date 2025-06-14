
import React from 'react';

export const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Daily Inspiration
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            {today}
          </p>
        </div>
      </div>
    </header>
  );
};
