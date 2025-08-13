
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">{t('loading.inspiration')}</p>
      </div>
    </div>
  );
};
