import { useEffect } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja'];

const LanguageHandler = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && supportedLanguages.includes(lang)) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    } else {
      navigate('/en', { replace: true });
    }
  }, [lang, i18n, navigate]);

  return (
    <HelmetProvider>
      <Helmet>
        {supportedLanguages.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={`https://example.com/${l}`} />
        ))}
      </Helmet>
      <Outlet />
    </HelmetProvider>
  );
};

export default LanguageHandler;
