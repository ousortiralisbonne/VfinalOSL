import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight, Home, Heart, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import FavoritesDrawer from "./FavoritesDrawer";
import { useFavorites } from "../context/FavoritesContext";
import logoSrc from "../images/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const location = useLocation();
  
  const closeMenu = () => {
    setIsOpen(false);
    setIsExploreOpen(false);
    setIsActivitiesOpen(false);
  };

  // Déterminer si on est sur la page d'accueil
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer les listes déroulantes quand le menu principal se ferme
  useEffect(() => {
    if (!isOpen) {
      setIsExploreOpen(false);
      setIsActivitiesOpen(false);
    }
  }, [isOpen]);

  const exploreMenu = [
    { label: t("nav.explore_menu.restaurants"), href: "/restaurants" },
    { label: t("nav.explore_menu.bars"), href: "/bars" },
    { label: t("nav.explore_menu.clubs"), href: "/clubs" },
    { label: t("nav.explore_menu.events"), href: "/events" },
    { label: t("nav.explore_menu.hotels"), href: "/hotels" },
    { label: t("transfers.hero.title"), href: "/transfers" },
    { label: t("nav.muchmore"), href: "/explore-more" },
  ];

  const activitiesMenu = [
    { label: t("nav.activities_menu.tours"), href: "/visites-guidees" },
    { label: t("nav.activities_menu.boat_trips"), href: "/bateaux-lisbonne" },
    { label: t("sports.hero.title"), href: "/activities/sports" },
    { label: t("nav.muchmore"), href: "/more-activities" },
  ];

  return (
    <>
      <nav className={`fixed w-full z-[9999] transition-all duration-300 ${
        (isHomePage && !isScrolled && !isOpen)
          ? 'bg-transparent'
          : 'bg-gradient-to-r from-slate-900/95 to-gray-800/95 backdrop-blur-md shadow-xl border-b-2 border-sky-400/60'
      }`} style={{ 
        backgroundColor: (isHomePage && !isScrolled && !isOpen)
          ? 'transparent'
          : 'rgba(15, 23, 42, 0.95)'
      }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <img
                  src={logoSrc}
                  alt="Logo Où sortir à Lisbonne - Un symbole festif représentant l'esprit de la ville"
                  loading="eager"
                  fetchPriority="high"
                  width="48"
                  height="48"
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Home Link */}
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  (isHomePage && !isScrolled && !isOpen)
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-white/90 hover:text-emerald-400 hover:bg-emerald-500/20'
                }`}
                title={t("nav.home")}
              >
                <Home className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{t("nav.home")}</span>
              </Link>

              {/* Explore Dropdown */}
              <div className="relative group">
                <button className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  (isHomePage && !isScrolled && !isOpen)
                    ? 'text-white/90 hover:text-white hover:bg-white/10' 
                    : 'text-white/90 hover:text-emerald-400 hover:bg-emerald-500/20'
                }`}>
                  <span className="text-sm font-medium mr-1">{t("nav.explore")}</span>
                  <ChevronDown className="h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 mt-2 w-[420px] bg-white rounded-xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left border border-gray-100 z-[99999]">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">{t("nav.explore")}</p>
                  </div>
                  {exploreMenu.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Boat Trips Link */}
              <Link
                to="/bateaux-lisbonne"
                className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                  (isHomePage && !isScrolled && !isOpen)
                    ? 'text-white/90 hover:text-white hover:bg-white/10' 
                    : 'text-white/90 hover:text-emerald-400 hover:bg-emerald-500/20'
                }`}
              >
                {t("nav.activities_menu.boat_trips")}
              </Link>

              {/* Activities Dropdown */}
              <div className="relative group">
                <button className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  (isHomePage && !isScrolled && !isOpen)
                    ? 'text-white/90 hover:text-white hover:bg-white/10' 
                    : 'text-white/90 hover:text-emerald-400 hover:bg-emerald-500/20'
                }`}>
                  <span className="text-sm font-medium mr-1">{t("nav.activities")}</span>
                  <ChevronDown className="h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 mt-2 w-[420px] bg-white rounded-xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left border border-gray-100 z-[99999]">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">{t("nav.activities")}</p>
                  </div>
                  {activitiesMenu.filter(item => item.href !== "/bateaux-lisbonne").map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/blog"
                className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                  (isHomePage && !isScrolled && !isOpen)
                    ? 'text-white/90 hover:text-white hover:bg-white/10' 
                    : 'text-white/90 hover:text-emerald-400 hover:bg-emerald-500/20'
                }`}
              >
                {t("nav.blog")}
              </Link>

              <Link
                to="/sur-mesure"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 text-sm font-semibold flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {t("nav.custom")}
              </Link>

              {/* Favorites Button */}
              <button
                onClick={() => setIsFavoritesOpen(true)}
                className={`relative p-2 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  (isHomePage && !isScrolled && !isOpen)
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-white/90 hover:text-emerald-400 hover:bg-emerald-500/20'
                }`}
                aria-label={t("common.favorites", "Favoris")}
                aria-expanded={isFavoritesOpen}
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow-lg" aria-label={`${favorites.length} ${t("common.items", "éléments")}`}>
                    {favorites.length}
                  </span>
                )}
              </button>

              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsFavoritesOpen(true)}
                className={`relative p-3 rounded-xl transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  (isHomePage && !isScrolled && !isOpen)
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-white/90 hover:text-emerald-400 hover:bg-emerald-500/20'
                }`}
                aria-label="Favoris"
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow-lg">
                    {favorites.length}
                  </span>
                )}
              </button>
              <LanguageSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-xl transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  (isHomePage && !isScrolled && !isOpen)
                    ? 'text-white hover:bg-white/10'
                    : 'text-white/90 hover:text-emerald-400 hover:bg-emerald-500/20'
                }`}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[80vh] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-b from-slate-900/98 to-gray-800/98 backdrop-blur-md border-t-2 border-sky-400/60 overflow-y-auto max-h-[calc(80vh-80px)]">
            {/* Home Link */}
            <Link
              to="/"
              className="flex items-center px-4 py-4 text-white/90 hover:text-emerald-400 active:bg-emerald-500/30 hover:bg-emerald-500/20 rounded-xl transition-colors min-h-[52px]"
              title={t("nav.home")}
              onClick={closeMenu}
            >
              <Home className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="font-medium text-base">{t("nav.home")}</span>
            </Link>

            {/* Explore Section - Collapsible */}
            <div className="space-y-1">
              <button
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="flex items-center justify-between w-full px-4 py-4 text-white/90 hover:text-emerald-400 active:bg-emerald-500/30 hover:bg-emerald-500/20 rounded-xl transition-colors min-h-[52px]"
              >
                <span className="font-medium text-base">{t("nav.explore")}</span>
                <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${isExploreOpen ? 'rotate-90' : ''}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExploreOpen ? 'max-h-96 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="space-y-1 ml-4 pl-4 border-l-2 border-emerald-500/30">
                  {exploreMenu.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-3 text-white/80 hover:text-emerald-400 active:bg-emerald-500/30 hover:bg-emerald-500/20 text-base font-medium rounded-xl transition-colors min-h-[48px] flex items-center"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Boat Trips Link */}
            <Link
              to="/bateaux-lisbonne"
              className="block px-4 py-4 text-white/90 hover:text-emerald-400 active:bg-emerald-500/30 hover:bg-emerald-500/20 rounded-xl transition-colors font-medium text-base min-h-[52px] flex items-center"
              onClick={closeMenu}
            >
              {t("nav.activities_menu.boat_trips")}
            </Link>

            {/* Activities Section - Collapsible */}
            <div className="space-y-1">
              <button
                onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                className="flex items-center justify-between w-full px-4 py-4 text-white/90 hover:text-emerald-400 active:bg-emerald-500/30 hover:bg-emerald-500/20 rounded-xl transition-colors min-h-[52px]"
              >
                <span className="font-medium text-base">{t("nav.activities")}</span>
                <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${isActivitiesOpen ? 'rotate-90' : ''}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isActivitiesOpen ? 'max-h-96 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="space-y-1 ml-4 pl-4 border-l-2 border-emerald-500/30">
                  {activitiesMenu.filter(item => item.href !== "/bateaux-lisbonne").map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-3 text-white/80 hover:text-emerald-400 active:bg-emerald-500/30 hover:bg-emerald-500/20 text-base font-medium rounded-xl transition-colors min-h-[48px] flex items-center"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/blog"
              className="block px-4 py-4 text-white/90 hover:text-emerald-400 active:bg-emerald-500/30 hover:bg-emerald-500/20 rounded-xl transition-colors font-medium text-base min-h-[52px] flex items-center"
              onClick={closeMenu}
            >
              {t("nav.blog")}
            </Link>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                to="/sur-mesure"
                className="block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4 rounded-2xl text-center hover:from-emerald-600 hover:to-teal-700 active:from-emerald-700 active:to-teal-800 transition-all duration-200 font-semibold flex items-center justify-center shadow-lg min-h-[56px]"
                onClick={closeMenu}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                <span className="text-base">{t("nav.custom")}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />
    </>
  );
};

export default Navbar;
