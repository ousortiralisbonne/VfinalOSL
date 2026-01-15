import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Navigation, Sparkles, X, Filter, ChevronDown } from "lucide-react";

interface FilterOption {
  id: string;
  name: string;
  emoji?: string;
}

interface TourFiltersProps {
  cities: FilterOption[];
  transports: FilterOption[];
  types: FilterOption[];
  selectedCity: string;
  selectedTransport: string;
  selectedType: string;
  onCityChange: (city: string) => void;
  onTransportChange: (transport: string) => void;
  onTypeChange: (type: string) => void;
  onResetFilters: () => void;
}

const TourFilters = ({
  cities,
  transports,
  types,
  selectedCity,
  selectedTransport,
  selectedType,
  onCityChange,
  onTransportChange,
  onTypeChange,
  onResetFilters,
}: TourFiltersProps) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const hasActiveFilters = selectedCity !== "all" || selectedTransport !== "all" || selectedType !== "all";
  const activeFiltersCount = [selectedCity, selectedTransport, selectedType].filter(f => f !== "all").length;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-4 md:p-6 sticky top-20">
      {/* Mobile Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden flex items-center justify-between w-full mb-4"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <Filter className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-garage">{t("tourFilters.title")}</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <Filter className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 font-garage">{t("tourFilters.title")}</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
          >
            <X className="w-4 h-4" />
            {t("tourFilters.reset")}
          </button>
        )}
      </div>

      {/* Filters Content - Collapsible on mobile */}
      <div className={`lg:block overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'}`}>
        {/* Reset button on mobile */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="lg:hidden flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition-colors font-medium mb-4 min-h-[44px]"
          >
            <X className="w-4 h-4" />
            {t("tourFilters.reset")}
          </button>
        )}

        {/* Cities filter */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => toggleSection('city')}
            className="lg:pointer-events-none flex items-center justify-between w-full text-gray-900 mb-3 min-h-[44px] lg:min-h-0"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold">{t("tourFilters.city")}</span>
            </div>
            <ChevronDown className={`lg:hidden w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedSection === 'city' ? 'rotate-180' : ''}`} />
          </button>
          <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-200 ${expandedSection === 'city' || isDesktop ? 'max-h-[500px]' : 'max-h-0 lg:max-h-none'}`}>
            <button
              onClick={() => onCityChange("all")}
              className={`px-4 py-3 md:py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-300 min-h-[48px] md:min-h-0 ${
                selectedCity === "all"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700"
              }`}
            >
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              {t("all")}
            </button>
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => onCityChange(city.id)}
                className={`px-4 py-3 md:py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-300 min-h-[48px] md:min-h-0 ${
                  selectedCity === city.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700"
                }`}
              >
                {city.emoji && <span className="mr-2">{city.emoji}</span>}
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* Transport filter */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => toggleSection('transport')}
            className="lg:pointer-events-none flex items-center justify-between w-full text-gray-900 mb-3 min-h-[44px] lg:min-h-0"
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold">{t("tourFilters.transport")}</span>
            </div>
            <ChevronDown className={`lg:hidden w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedSection === 'transport' ? 'rotate-180' : ''}`} />
          </button>
          <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-200 ${expandedSection === 'transport' || isDesktop ? 'max-h-[500px]' : 'max-h-0 lg:max-h-none'}`}>
            <button
              onClick={() => onTransportChange("all")}
              className={`px-4 py-3 md:py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-300 min-h-[48px] md:min-h-0 ${
                selectedTransport === "all"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700"
              }`}
            >
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              {t("all")}
            </button>
            {transports.map((transport) => (
              <button
                key={transport.id}
                onClick={() => onTransportChange(transport.id)}
                className={`px-4 py-3 md:py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-300 min-h-[48px] md:min-h-0 ${
                  selectedTransport === transport.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700"
                }`}
              >
                {transport.emoji && <span className="mr-2">{transport.emoji}</span>}
                {transport.name}
              </button>
            ))}
          </div>
        </div>

        {/* Type filter */}
        <div>
          <button
            onClick={() => toggleSection('type')}
            className="lg:pointer-events-none flex items-center justify-between w-full text-gray-900 mb-3 min-h-[44px] lg:min-h-0"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold">{t("tourFilters.type")}</span>
            </div>
            <ChevronDown className={`lg:hidden w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedSection === 'type' ? 'rotate-180' : ''}`} />
          </button>
          <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-200 ${expandedSection === 'type' || isDesktop ? 'max-h-[500px]' : 'max-h-0 lg:max-h-none'}`}>
            <button
              onClick={() => onTypeChange("all")}
              className={`px-4 py-3 md:py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-300 min-h-[48px] md:min-h-0 ${
                selectedType === "all"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700"
              }`}
            >
              <Sparkles className="inline-block w-4 h-4 mr-2" />
              {t("all")}
            </button>
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={`px-4 py-3 md:py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-300 min-h-[48px] md:min-h-0 ${
                  selectedType === type.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700"
                }`}
              >
                {type.emoji && <span className="mr-2">{type.emoji}</span>}
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourFilters;
