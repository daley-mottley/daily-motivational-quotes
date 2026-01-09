
import React, { useContext } from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { UserContext } from '../context/UserContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../lib/firebase';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const auth = getAuth(app);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      userContext?.setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('app.name')}
              </h1>
              <p className="text-xs text-gray-500 font-medium">{t('app.tagline')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {userContext?.user ? (
              <button onClick={handleSignOut} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Sign Out
              </button>
            ) : (
              <Link to="/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
