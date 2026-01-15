// src/pages/GuidedTours.tsx
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { Clock, Users, ChevronRight } from "lucide-react";
import BookingModal from "../components/BookingModal";
import FavoriteButton from "../components/FavoriteButton";
import { useFetch } from "../hooks/useFetch";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import Wrapper from "../components/Wrapper";
import SintraTripBookingModal from "../components/SintraTripBookingModal";
import TourFilters from "../components/tours/TourFilters";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";
import SEOContent from "../components/SEOContent";
import { ItemListSchema, FAQSchema } from "../components/StructuredData";
import Breadcrumbs from "../components/Breadcrumbs";

const GuidedTours = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('guidedTours', i18n.language);

  // SEO Content
  const seoContentData = {
    title: t('seoContent.guidedTours.title'),
    intro: t('seoContent.guidedTours.intro'),
    sections: [
      {
        title: t('seoContent.guidedTours.sections.private.title'),
        content: t('seoContent.guidedTours.sections.private.content'),
        titleHighlight: 'Personnalisées',
        contentHighlight: 'sur mesure',
      },
      {
        title: t('seoContent.guidedTours.sections.group.title'),
        content: t('seoContent.guidedTours.sections.group.content'),
        titleHighlight: 'Petit Groupe',
        contentHighlight: 'francophones',
      },
      {
        title: t('seoContent.guidedTours.sections.dayTrips.title'),
        content: t('seoContent.guidedTours.sections.dayTrips.content'),
        titleHighlight: 'Lisbonne',
        contentHighlight: 'Sintra',
      },
    ],
    faqs: [
      {
        question: t('seoContent.guidedTours.faqs.french.question'),
        answer: t('seoContent.guidedTours.faqs.french.answer'),
      },
      {
        question: t('seoContent.guidedTours.faqs.sintra.question'),
        answer: t('seoContent.guidedTours.faqs.sintra.answer'),
      },
      {
        question: t('seoContent.guidedTours.faqs.duration.question'),
        answer: t('seoContent.guidedTours.faqs.duration.answer'),
      },
      {
        question: t('seoContent.guidedTours.faqs.booking.question'),
        answer: t('seoContent.guidedTours.faqs.booking.answer'),
      },
    ],
    faqTitle: t('seoContent.guidedTours.faqTitle'),
  };

  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedTransport, setSelectedTransport] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const queryGuidedTours = `*[_type == "guidedTours"]| order(order asc) {
    id,
    title,
    duration,
    maxParticipants,
    price,
    image,
    description,
    highlights,
    order,
    city,
    transport,
    tourType
  }`;

  // Données des filtres
  const cities = [
    { id: "lisbon", name: t("tourFilters.cities.lisbon"), emoji: "🏛️" },
    { id: "cascais", name: t("tourFilters.cities.cascais"), emoji: "🏖️" },
    { id: "sintra", name: t("tourFilters.cities.sintra"), emoji: "🏰" },
    { id: "arrabida", name: t("tourFilters.cities.arrabida"), emoji: "🌊" },
    { id: "other", name: t("tourFilters.cities.other"), emoji: "📍" },
  ];

  const transports = [
    { id: "foot", name: t("tourFilters.transports.foot"), emoji: "🚶" },
    { id: "bike", name: t("tourFilters.transports.bike"), emoji: "🚲" },
    { id: "tuktuk", name: t("tourFilters.transports.tuktuk"), emoji: "🛺" },
    { id: "sidecar", name: t("tourFilters.transports.sidecar"), emoji: "🏍️" },
    { id: "vehicle", name: t("tourFilters.transports.vehicle"), emoji: "🚐" },
    { id: "boat", name: t("tourFilters.transports.boat"), emoji: "⛵" },
    { id: "helicopter", name: t("tourFilters.transports.helicopter"), emoji: "🚁" },
  ];

  const types = [
    { id: "cultural", name: t("tourFilters.types.cultural"), emoji: "🎭" },
    { id: "historical", name: t("tourFilters.types.historical"), emoji: "📜" },
    { id: "streetart", name: t("tourFilters.types.streetart"), emoji: "🎨" },
    { id: "gastronomic", name: t("tourFilters.types.gastronomic"), emoji: "🍷" },
    { id: "other", name: t("tourFilters.types.other"), emoji: "✨" },
  ];

  const handleResetFilters = () => {
    setSelectedCity("all");
    setSelectedTransport("all");
    setSelectedType("all");
  };

  const { isLoading, error, data } = useFetch(queryGuidedTours);

  let tours: any[] = [];

  if (data) {
    tours = data.map((item: any) => ({
      id: item.id,
      title: item.title[i18n.language],
      duration: item.duration,
      maxParticipants: item.maxParticipants,
      price: item.price,
      image: imgUrlBuilder(item.image).url(),
      description: item.description[i18n.language],
      highlights: item.highlights[i18n.language].map(
        (highlight: any) => highlight
      ),
      titleFr: item.title["fr"],
      city: item.city || "other",
      transport: item.transport || "other",
      tourType: item.tourType || "other",
    }));
  }

  // Filtrage des tours
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const cityMatch = selectedCity === "all" || tour.city === selectedCity;
      const transportMatch = selectedTransport === "all" || tour.transport === selectedTransport;
      const typeMatch = selectedType === "all" || tour.tourType === selectedType;
      return cityMatch && transportMatch && typeMatch;
    });
  }, [tours, selectedCity, selectedTransport, selectedType]);

  // ItemList pour le schema SEO
  const itemListData = useMemo(() =>
    tours.slice(0, 20).map((tour: any) => ({
      name: tour.title,
      url: `https://ousortiralisbonne.com/visites-guidees#${tour.id}`,
      image: tour.image,
      description: tour.description?.substring(0, 150)
    })), [tours]
  );

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <ItemListSchema
        items={itemListData}
        listName={t('guidedTours.hero.title') || "Visites guidées à Lisbonne"}
        listUrl="https://ousortiralisbonne.com/visites-guidees"
      />
      <FAQSchema faqs={seoContentData.faqs} pageId="guidedTours" />
      <main id="main-content">
        <Breadcrumbs />
        <Wrapper isLoading={isLoading} error={error}>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-[30vh] md:h-[50vh]"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/pw/AP1GczNRmzfCNVzDrVq30taPuurqRkkKhAd1gD5tx2bG7BExskKw3FmHMUMkmJIp-34cpw_DlJeOWN2zT9Tq5yNrjBBxrqAMswDoSiG3dtS13z8eH-a_7vQEYUe0iK-c-OpIZ0D_vaI7w8WlAiZub9IDhrAa=w2490-h1078-s-no-gm?authuser=0")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 font-garage">
                Visites Guidées à{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Lisbonne
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/80 max-w-2xl">
                {t("guidedTours.hero.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Filters + Tours Grid */}
        <div className="max-w-[1600px] mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <TourFilters
                cities={cities}
                transports={transports}
                types={types}
                selectedCity={selectedCity}
                selectedTransport={selectedTransport}
                selectedType={selectedType}
                onCityChange={setSelectedCity}
                onTransportChange={setSelectedTransport}
                onTypeChange={setSelectedType}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Tours Grid */}
            <div className="flex-1">
              {filteredTours.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-500 text-lg">{t("tourFilters.noResults")}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col"
                    >
                      <div className="relative">
                        <div
                          className="h-48 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url(${tour.image})` }}
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#2a2765] font-semibold">
                          {t("guidedTours.tours.pricePrefix")} {tour.price}{" "}
                          {t("guidedTours.tours.priceSuffix")}
                        </div>
                        <FavoriteButton
                          item={{
                            id: tour.id.toString(),
                            name: tour.title,
                            type: t("guidedTours.tours.type"),
                            image: tour.image,
                            price: `${t("guidedTours.tours.pricePrefix")} ${
                              tour.price
                            }/${t("guidedTours.tours.priceSuffix")}`,
                          }}
                          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#2a2765] mb-4 font-garage">
                            {tour.title}
                          </h3>

                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <Clock className="h-4 w-4 mr-2 text-[#37b7ab]" />
                            <span>
                              {t("guidedTours.tours.durationPrefix")} {tour.duration}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <Users className="h-4 w-4 mr-2 text-[#37b7ab]" />
                            <span>
                              {t("guidedTours.tours.maxParticipantsPrefix")}{" "}
                              {tour.maxParticipants}{" "}
                              {t("guidedTours.tours.maxParticipantsSuffix")}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-6">{tour.description}</p>

                          <div className="space-y-2 mb-6">
                            {tour.highlights.map(
                              (
                                highlight:
                                  | string
                                  | number
                                  | boolean
                                  | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | Iterable<ReactNode>
                                  | null
                                  | undefined,
                                index: Key | null | undefined
                              ) => (
                                <div
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-[#37b7ab] mr-2" />
                                  {highlight}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedTour(tour)}
                          className="w-full bg-[#2f2d69] text-white px-6 py-3.5 md:py-3 rounded-full hover:bg-[#252157] active:bg-[#1a1845] transition font-garage tracking-wide text-sm flex items-center justify-center group mt-auto min-h-[48px]"
                        >
                          <span>{t("guidedTours.tours.reserveButton")}</span>
                          <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO Content Section - Bottom of page for SEO */}
        <SEOContent
          title={seoContentData.title}
          titleHighlight="Lisbonne"
          intro={seoContentData.intro}
          introHighlight="Lisbonne"
          sections={seoContentData.sections}
          faqs={seoContentData.faqs}
          faqTitle={seoContentData.faqTitle}
          faqAnswerHighlights={["français", "Sintra", "journée complète", "personnalisé", "francophones", "Cabo da Roca"]}
          pageId="guidedTours"
        />

        {/* Booking Modal */}
        {selectedTour?.id == 5 ? (
          <SintraTripBookingModal
            item={selectedTour}
            onClose={() => setSelectedTour(null)}
            reservation={`Tour guidé ${selectedTour?.titleFr}`}
            source="guidedTour"
          />
        ) : (
          <BookingModal
            item={selectedTour}
            onClose={() => setSelectedTour(null)}
            reservation={`Tour guidé ${selectedTour?.titleFr}`}
            source="guidedTour"
          />
        )}
        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default GuidedTours;
