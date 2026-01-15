import { useState, useEffect } from 'react';
import { Cookie, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { safeLocalStorage, setStorageItem } from '../utils/storage';

const CONSENT_KEY = 'cookieConsent';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasConsent = safeLocalStorage.getItem(CONSENT_KEY);
    if (!hasConsent) {
      // Delay appearance for smooth animation
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (accepted: boolean) => {
    setIsAnimating(false);
    setTimeout(() => {
      setStorageItem(CONSENT_KEY, {
        accepted,
        timestamp: new Date().toISOString()
      });
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 transition-all duration-300 ease-out ${
        isAnimating
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a2765] via-[#2f2d69] to-[#3a3875] shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#37b7ab]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#ea3e4e]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative p-5 md:p-6">
          {/* Header with icon */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#37b7ab] to-[#2d9d93] flex items-center justify-center shadow-lg">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1 font-garage tracking-wide">
                {t("cookieConsent.title")}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t("cookieConsent.description")}
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mb-5 text-xs">
            <Shield className="w-3.5 h-3.5 text-[#37b7ab]" />
            <Link
              to="/politique-confidentialite"
              className="text-[#37b7ab] hover:text-[#41d1c5] transition-colors underline underline-offset-2"
            >
              {t("cookieConsent.privacyLink")}
            </Link>
            <span className="text-white/30">•</span>
            <Link
              to="/mentions-legales"
              className="text-[#37b7ab] hover:text-[#41d1c5] transition-colors underline underline-offset-2"
            >
              {t("cookieConsent.legalLink")}
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleClose(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 font-medium text-sm"
            >
              {t("cookieConsent.decline")}
            </button>
            <button
              onClick={() => handleClose(true)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#37b7ab] to-[#2d9d93] text-white hover:from-[#41d1c5] hover:to-[#37b7ab] transition-all duration-200 font-medium text-sm shadow-lg shadow-[#37b7ab]/25"
            >
              {t("cookieConsent.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;