import { ArrowRight, Sparkles, Compass, UtensilsCrossed, Hotel, Car, Map, Ship, PartyPopper, Wine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import heroImgSrc from "../images/bridge-portugal-beautiful-sunset.jpg";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[100svh] md:h-screen overflow-hidden w-full scrollbar-hide z-0 pt-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: `url(${heroImgSrc})`,
        }}
        role="img"
        aria-label="Vue panoramique de Lisbonne au coucher du soleil, montrant les toits traditionnels et le Tage"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative min-h-[calc(100svh-80px)] md:h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white py-8 sm:py-8 md:py-0 w-full overflow-x-hidden gap-8 lg:gap-16">
        <div className="max-w-4xl lg:max-w-2xl xl:max-w-3xl w-full">
          {/* Tagline badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-6 py-1.5 sm:py-3 mb-4 sm:mb-4 md:mb-8 border border-white/20">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400 mr-1.5 sm:mr-2 flex-shrink-0" />
            <span className="text-emerald-400 font-medium text-[11px] sm:text-sm tracking-wide uppercase">
              {t("hero.tagline")}
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-[2rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-5 sm:mb-4 md:mb-6 font-garage leading-[1.15] sm:leading-[0.9] tracking-tight">
            {/* Mobile: "Découvrez les Meilleures" on same line */}
            <span className="block sm:hidden">
              <span className="transform hover:translate-x-2 transition-transform duration-500 ease-out">
                {t("hero.title.discover")}{" "}
              </span>
              <span className="transform hover:translate-x-2 transition-transform duration-500 ease-out delay-100">
                {t("hero.title.bestWord")}
              </span>
            </span>
            {/* Mobile: "Expériences à Lisbonne" on same line */}
            <span className="block sm:hidden transform hover:translate-x-2 transition-transform duration-500 ease-out delay-100">
              <span>{t("hero.title.experiences")} </span>
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                {t("hero.title.in")}
              </span>
            </span>
            {/* Desktop: original layout */}
            <span className="hidden sm:block transform hover:translate-x-2 transition-transform duration-500 ease-out">
              {t("hero.title.discover")}
            </span>
            <span className="hidden sm:block transform hover:translate-x-2 transition-transform duration-500 ease-out delay-100">
              {t("hero.title.best")}
            </span>
            <span className="hidden sm:block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent transform hover:translate-x-2 transition-transform duration-500 ease-out delay-200">
              {t("hero.title.in")}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-6 md:mb-10 max-w-3xl font-light leading-relaxed">
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 md:gap-6 w-full">
            <Link
              to="/sur-mesure"
              className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl hover:from-emerald-600 hover:to-teal-700 active:from-emerald-700 active:to-teal-800 transition-all duration-300 font-semibold flex items-center justify-center shadow-2xl hover:shadow-emerald-500/25 min-h-[48px] sm:min-h-[56px] text-sm sm:text-base md:text-lg w-full sm:w-auto touch-manipulation"
            >
              <Sparkles className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="whitespace-nowrap">{t("hero.customlabel")}</span>
              <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Secondary CTA - Desktop only */}
            <Link
              to="/blog"
              className="hidden md:flex group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 font-semibold items-center justify-center min-h-[56px] text-lg"
            >
              <Compass className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="whitespace-nowrap">{t("hero.explorelabel", "Explorer")}</span>
              <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-8 md:mt-12 lg:mt-16 grid grid-cols-3 gap-4 sm:gap-4 md:gap-6 lg:gap-8 max-w-2xl w-full">
            <div className="text-center">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-2">500+</div>
              <div className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-tight">{t("hero.stats.places")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-2">10k+</div>
              <div className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-tight">{t("hero.stats.visitors")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-2">24/7</div>
              <div className="text-white/70 text-[10px] sm:text-xs md:text-sm leading-tight">{t("hero.stats.support")}</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation - Desktop only */}
        <div className="hidden lg:flex flex-col gap-3 w-auto">
          <div className="text-white/60 text-xs uppercase tracking-wider mb-2 text-center font-medium">
            {t("hero.quickAccess", "Accès rapide")}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/restaurants"
              className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 min-w-[120px]"
            >
              <UtensilsCrossed className="h-6 w-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">{t("categories.restaurants.name", "Restaurants")}</span>
            </Link>
            <Link
              to="/hotels"
              className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 min-w-[120px]"
            >
              <Hotel className="h-6 w-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">{t("categories.hotels.name", "Hôtels")}</span>
            </Link>
            <Link
              to="/bars"
              className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 min-w-[120px]"
            >
              <Wine className="h-6 w-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">{t("categories.bars.name", "Bars")}</span>
            </Link>
            <Link
              to="/events"
              className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 min-w-[120px]"
            >
              <PartyPopper className="h-6 w-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">{t("categories.events.name", "Événements")}</span>
            </Link>
            <Link
              to="/visites-guidees"
              className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 min-w-[120px]"
            >
              <Map className="h-6 w-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">{t("nav.activities_menu.tours", "Visites")}</span>
            </Link>
            <Link
              to="/bateaux-lisbonne"
              className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 min-w-[120px]"
            >
              <Ship className="h-6 w-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">{t("nav.activities_menu.boat_trips", "Croisières")}</span>
            </Link>
            <Link
              to="/transfers"
              className="group flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 min-w-[120px] col-span-2"
            >
              <Car className="h-6 w-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">{t("transfers.hero.title", "Transferts")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
