// project/src/pages/BoatTrips.tsx
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import BookingModal from "../components/BookingModal";
import CruiseCard from "../components/cruise/CruiseCard";
import CruiseFilters from "../components/cruise/CruiseFilters";
import { getCruisesByType, getCruisesByLocation } from "../utils/cruiseUtils";
import { locations as staticLocations, cruiseData as staticCruiseData } from "../data/cruises";
import { useFetch } from "../hooks/useFetch";
import Wrapper from "../components/Wrapper";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import RomanticModal from "../components/RomanticModal";
import SetubalModal from "../components/SetubalModal";
import Cruise14To220Modal from "../components/Cruise14To220Modal";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";

const BoatTrips = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('boatTrips', i18n.language);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBoat, setSelectedBoat] = useState<any>(null);
  const [isLocationInitialized, setIsLocationInitialized] = useState(false);

  function getCruiseDescription(location: any, language: any): string {
    const data: any = {
      lisbonne: {
        fr: "Embarquez pour une croisière inoubliable à Lisbonne et découvrez la ville sous un autre angle, entre ciel et océan.",
        en: "Set sail on an unforgettable cruise in Lisbon and discover the city from a new perspective, between sky and sea.",
        pt: "Embarque num cruzeiro inesquecível em Lisboa e descubra a cidade de uma nova perspetiva, entre o céu e o mar.",
      },
      cascais: {
        fr: "À Cascais, laissez-vous porter par les flots lors d'une croisière entre plages dorées, falaises majestueuses et charme pittoresque.",
        en: "In Cascais, let yourself be carried by the waves on a cruise through golden beaches, majestic cliffs, and picturesque charm.",
        pt: "Em Cascais, deixe-se levar pelas ondas num cruzeiro entre praias douradas, falésias majestosas e um charme pitoresco.",
      },
      "Nouvel an": {
        fr: "Célébrez le Nouvel An en grand style à bord d'un bateau avec vue imprenable sur les feux d'artifice de Lisbonne.",
        en: "Celebrate New Year's Eve in grand style aboard a boat with breathtaking views of Lisbon's fireworks.",
        pt: "Celebre o Ano Novo em grande estilo a bordo de um barco com vista deslumbrante para os fogos de artifício de Lisboa.",
      },
    };

    const loc = location;

    if (data[loc] && data[loc][language]) {
      return data[loc][language];
    } else {
      return "";
    }
  }

  const {
    data: boatLocations,
    isLoading: isLoadingLocations,
    error: errorLocations,
  } = useFetch(`*[_type == "boatTriplocation"] | order(order asc)`);

  const {
    data: boatTypes,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useFetch(`*[_type == "boatTripCruiseType"]| order(order asc)`);

  const {
    data: boatCruises,
    isLoading: isLoadingCruises,
    error: errorCruises,
  } = useFetch(`*[_type == "boatCruises"] | order(order asc) {
    _id,
    id,
    name,
    type,
    description,
    price,
    image,
    duration,
    capacity,
    departures,
    highlights,
    features,
    location,
    bookingUrl,
    schedule,
    food,
    drinks,
    embarkation
  }`);

  // Utiliser uniquement les locations de Sanity (incluant Nouvel An)
  const locations = boatLocations?.map((location: any) => ({
    id: location.id,
    name: location.name[i18n.language],
  })) || [];

  // Types de croisières selon la localisation sélectionnée
  let cruiseTypes = [];

  // Normaliser la comparaison en minuscules et sans espaces/tirets
  const normalizeLocationId = (id: string) => id?.toLowerCase().replace(/[\s-]/g, '');
  const normalizedLocation = normalizeLocationId(selectedLocation);

  if (normalizedLocation === "nouvelan") {
    // Utiliser les types spécifiques pour Nouvel An (sans "Tous" car géré par CruiseFilters)
    cruiseTypes = [
      { id: "private", name: "⭐ Croisière privée" },
      { id: "group", name: "👥 Croisière groupe" },
    ];
  } else {
    // Utiliser les types Sanity pour les autres locations
    cruiseTypes = boatTypes
      ?.map((type: any) => ({
        id: type.id,
        name: type.name[i18n.language],
      }))
      .filter((type) => {
        if (selectedLocation === "lisbonne") {
          return type.id === "private" || type.id === "group" ? true : false;
        }
        if (selectedLocation === "setúbal") {
          return type.id === "plaisance" || type.id === "motorboat"
            ? true
            : false;
        }
        if (selectedLocation === "cascais") {
          return type.id === "private" || type.id === "session-peche"
            ? true
            : false;
        }
        return true;
      }) || [];
  }
  
  const cruiseData = useMemo(() => {
    if (!boatCruises || !boatTypes || !boatLocations) return [];

    // Filter duplicates by ID (keep only first occurrence)
    const seenIds = new Set<string>();
    const uniqueCruises = boatCruises.filter((cruise: any) => {
      if (seenIds.has(cruise.id)) {
        return false;
      }
      seenIds.add(cruise.id);
      return true;
    });

    return uniqueCruises
      .map((cruise: any) => {
        const mappedCruise = {
          id: cruise.id,
          name: cruise.name[i18n.language],
          url: cruise?.bookingUrl || "",
          nameFr: cruise.name["fr"],
          description: cruise?.description ? cruise.description[i18n.language] : "",
          price: cruise.price == "0" ? t("onquote") : cruise.price,
          image: imgUrlBuilder(cruise.image).url(),
          duration: cruise?.duration,
          capacity: cruise?.capacity,
          highlights: cruise?.highlights ? cruise?.highlights[i18n.language] : [],
          features: cruise?.features?.map((feature: any) => ({
            text: feature?.text[i18n.language],
          })),
          departures: cruise?.departures ? cruise.departures[i18n.language] : [],
          type: (boatTypes as any)?.find(
            (type: any) => type?._id === cruise?.type?._ref
          )?.id,
          location: (boatLocations as any)?.find(
            (loc: any) => loc?._id === cruise?.location?._ref
          )?.id,
          // Nouveaux champs pour Nouvel An
          schedule: cruise?.schedule,
          food: cruise?.food ? cruise.food[i18n.language] : null,
          drinks: cruise?.drinks ? cruise.drinks[i18n.language] : null,
          embarkation: cruise?.embarkation ? cruise.embarkation[i18n.language] : null,
        };

        return mappedCruise;
      })
      .filter((cruise: any) => cruise.location != null);
  }, [boatCruises, boatTypes, boatLocations, i18n.language, t]);

  // Obtenir les croisières selon la localisation sélectionnée
  const filteredCruises = useMemo(() => {
    return getCruisesByType(
      selectedType,
      selectedLocation,
      cruiseData
    )?.filter((cruise) => cruise?.id !== "Sunset cruises") || [];
  }, [selectedType, selectedLocation, cruiseData]);

  useEffect(() => {
    if (locations.length > 0 && !isLocationInitialized) {
      setSelectedLocation(locations[0].id);
      setIsLocationInitialized(true);
    }
  }, [locations, isLocationInitialized]);

  // Réinitialiser le type quand on change de localisation
  useEffect(() => {
    setSelectedType("all");
  }, [selectedLocation]);

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <main id="main-content">
        <Wrapper
          isLoading={isLoadingLocations || isLoadingTypes || isLoadingCruises}
          error={errorLocations || errorTypes || errorCruises}
        >
        <div className="pt-20 min-h-screen bg-gray-50">
          {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-[50vh]"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/pw/AP1GczOFLRR8UjaDC55ujHGvfrFAV_iu4ySfiH30RG_bMu7Xbu2VvAIpMLUx36VK-IEZFbut9LR84g38uup0jb4DiS2wA7Eo3MXmMZkrdq2pE8M-tYshhpLBf8Qhi6SfO-xSuvzV-wV6CYopw3mlESlld1rZ=w2495-h1661-s-no-gm?authuser=0")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center text-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
                Sorties en{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Bateau
                </span>
              </h1>
              <p className="text-xl text-white/80">
                {getCruiseDescription(selectedLocation, i18n.language) ||
                  t("boatTrips.hero.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <CruiseFilters
          locations={locations}
          cruiseTypes={cruiseTypes}
          selectedLocation={selectedLocation}
          selectedType={selectedType}
          onLocationChange={setSelectedLocation}
          onTypeChange={setSelectedType}
        />

        {/* Cruises Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCruises.map((cruise: any) => (
              <CruiseCard
                key={cruise.id}
                cruise={cruise}
                onSelect={setSelectedBoat}
                actionLabel={t("boatTrips.cruiseCard.actionLabel")}
              />
            ))}
          </div>
          {filteredCruises.length === 0 || !filteredCruises.length ? (
            <p className="text-[17px] font-semibold my-5">
              &#128269; {t("emptyfilteredlist")}
            </p>
          ) : null}
        </div>

        {selectedBoat?.id === "private-location-19-220" ||
        selectedBoat?.id === "private-location-4-18" ||
        selectedBoat?.id === "bateau-plaisance-75p" ? (
          <Cruise14To220Modal
            item={selectedBoat}
            onClose={() => setSelectedBoat(null)}
            reservation={`Sortie en bâteau, ${selectedBoat?.nameFr} (${selectedLocation})`}
            fromSetubal={selectedLocation === "setúbal"}
          />
        ) : selectedLocation === "setúbal" ? (
          <SetubalModal
            item={selectedBoat}
            onClose={() => setSelectedBoat(null)}
            source={
              selectedBoat?.id === "sunset-cruise"
                ? "sunset-cruise"
                : selectedBoat?.id === "romantic"
                ? "romantic"
                : "boatTrip"
            }
            reservation={`Sortie en bâteau, ${selectedBoat?.nameFr} (${selectedLocation})`}
            fromSetubal={selectedLocation === "setúbal"}
          />
        ) : selectedBoat?.id === "romantic" ? (
          <RomanticModal
            item={selectedBoat}
            onClose={() => setSelectedBoat(null)}
            source="romantic"
            reservation={`Sortie en bâteau, ${selectedBoat?.nameFr} (${selectedLocation})`}
            fromSetubal={selectedLocation === "setúbal"}
          />
        ) : (
          <BookingModal
            item={selectedBoat}
            onClose={() => setSelectedBoat(null)}
            source={
              selectedBoat?.id === "sunset-cruise"
                ? "sunset-cruise"
                : selectedBoat?.id === "romantic"
                ? "romantic"
                : "boatTrip"
            }
            reservation={`Sortie en bâteau, ${selectedBoat?.nameFr} (${selectedLocation})`}
            fromSetubal={selectedLocation === "setúbal"}
          />
        )}
        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default BoatTrips;
