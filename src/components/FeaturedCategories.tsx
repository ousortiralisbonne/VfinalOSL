import {
  Calendar,
  Utensils,
  Beer,
  Music,
  Sailboat,
  Activity,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const { t } = useTranslation();

  const categories = [
    {
      icon: Calendar,
      key: "events",
      color: "#FF6B6B",
      bgColor: "#FFF0F0",
      link: "/events",
    },
    {
      icon: Utensils,
      key: "restaurants",
      color: "#37B7AB",
      bgColor: "#F0F9F8",
      link: "/restaurants",
    },
    {
      icon: Beer,
      key: "bars",
      color: "#4A90E2",
      bgColor: "#F0F4FA",
      link: "/bars",
    },
    {
      icon: Music,
      key: "clubs",
      color: "#37B7AB",
      bgColor: "#F0F9F8",
      link: "/clubs",
    },
    {
      icon: Sailboat,
      key: "boats",
      color: "#37B7AB",
      bgColor: "#F0F9F8",
      link: "/bateaux-lisbonne",
    },
    {
      icon: Activity,
      key: "activities",
      color: "#2F2D69",
      bgColor: "#F0F0F5",
      link: "/bateaux-lisbonne",
    },
    {
      icon: BookOpen,
      key: "tours",
      color: "#FF6B6B",
      bgColor: "#FFF0F0",
      link: "/visites-guidees",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50/50 overflow-x-visible">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            {t("categories.badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-garage tracking-tight">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t("categories.titleHighlight")}
            </span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            {t("categories.description")}
          </p>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden mb-8 relative">
          {/* Fade indicator right */}
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            className="flex overflow-x-scroll scrollbar-hide gap-3 pb-4 -mx-4 px-4 snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((category) => (
              <Link
                key={category.key}
                to={category.link}
                className="group bg-white rounded-2xl p-4 text-center active:scale-95 transition-all duration-300 relative overflow-hidden border border-gray-200 shadow-sm active:shadow-md flex-shrink-0 w-[100px] min-w-[100px] snap-start touch-manipulation"
              >
                <div className="relative z-10">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-2 mx-auto"
                    style={{
                      backgroundColor: category.bgColor,
                    }}
                  >
                    <category.icon
                      className="h-6 w-6"
                      style={{ color: category.color }}
                    />
                  </div>

                  <h3 className="font-bold text-gray-900 text-xs font-garage tracking-wide leading-tight">
                    {t(`categories.${category.key}.name`)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.key}
              to={category.link}
              className="group bg-white rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 relative overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon container with enhanced styling */}
              <div className="relative z-10">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    backgroundColor: category.bgColor,
                    boxShadow: `0 8px 32px ${category.color}20`,
                  }}
                >
                  <category.icon
                    className="h-10 w-10 transition-all duration-500 group-hover:scale-110"
                    style={{ color: category.color }}
                  />
                </div>
                
                <h3 className="font-bold text-gray-900 text-lg mb-3 font-garage tracking-wide group-hover:text-emerald-600 transition-colors duration-300">
                  {t(`categories.${category.key}.name`)}
                </h3>
                
                <p className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300">
                  {t(`categories.${category.key}.count`)}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-10 md:mt-16 px-2 md:px-0">
          <Link
            to="/explore-more"
            className="w-full md:w-auto inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-700 active:from-emerald-700 active:to-teal-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[52px]"
          >
            <Sparkles className="h-5 w-5 mr-3" />
            {t("categories.viewAll")}
            <ArrowRight className="h-5 w-5 ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
