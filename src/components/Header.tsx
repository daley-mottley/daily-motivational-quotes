
import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Daily Spark
            </h1>
            <p className="text-xs text-gray-500 font-medium">Inspire • Share • Grow</p>
          </div>
        </div>
      </div>
    </header>
  );
};
