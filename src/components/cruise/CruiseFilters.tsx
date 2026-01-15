import React from "react";
import { useTranslation } from "react-i18next";

const CruiseFilters = ({
  locations,
  cruiseTypes,
  selectedLocation,
  selectedType,
  onLocationChange,
  onTypeChange,
}: any) => {
  const { t } = useTranslation();
  
  const filteredTypes = cruiseTypes.filter((type: any) => {
    if (type.id === "plaisance") {
      return selectedLocation === "cascais" || selectedLocation === "setúbal";
    }
    if (type.id === "motorboat") {
      return selectedLocation === "setúbal";
    }
    return !type.onlyLisbon || selectedLocation === "lisbon" || selectedLocation === "nouvel-an";
  });

  return (
    <div className="sticky top-16 bg-white shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-3 md:py-4 border-b overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          {locations.map(
            (location: {
              id: React.Key | null | undefined;
              emoji?: string;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Iterable<React.ReactNode>
                | null
                | undefined;
            }) => (
              <button
                key={location.id}
                onClick={() => onLocationChange(location.id)}
                className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                  selectedLocation === location.id
                    ? "bg-[#37b7ab] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                }`}
              >
                {location.emoji && <span className="mr-1">{location.emoji}</span>}
                {location.name}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-2 py-3 md:py-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          {/* Bouton "Tous" pour toutes les locations */}
          <button
            onClick={() => onTypeChange("all")}
            className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
              selectedType === "all"
                ? "bg-[#37b7ab] text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
            }`}
          >
            ✨ {t("all")}
          </button>
          {filteredTypes.map(
            (type: {
              id: React.Key | null | undefined;
              emoji?:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Iterable<React.ReactNode>
                | null
                | undefined;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Iterable<React.ReactNode>
                | null
                | undefined;
            }) => (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                  selectedType === type.id
                    ? "bg-[#37b7ab] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                }`}
              >
                {type.name}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CruiseFilters;
