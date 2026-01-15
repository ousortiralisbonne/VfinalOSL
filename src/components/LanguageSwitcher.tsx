import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[1];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white/90 hover:text-white transition px-2 py-1 rounded min-w-[44px] min-h-[44px]"
        aria-label={t("common.changeLanguage", "Changer de langue")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span aria-hidden="true">{currentLanguage.flag}</span>
        <span className="sr-only">{currentLanguage.name}</span>
        <ChevronDown className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-[99999]">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-w-[140px] max-w-[180px] md:min-w-[160px] md:max-w-[200px] w-auto">
            <ul className="py-2" role="listbox" aria-label={t("common.selectLanguage", "Sélectionner une langue")}>
              {languages.map((lang) => (
                <li key={lang.code} role="option" aria-selected={i18n.language === lang.code}>
                  <button
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 min-h-[44px] ${
                      i18n.language === lang.code
                        ? 'bg-emerald-50 text-emerald-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    <span className="text-xl" aria-hidden="true">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                    {i18n.language === lang.code && (
                      <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full" aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;