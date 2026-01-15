// project/src/pages/Hotels.tsx
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Star, Wifi, ChevronRight } from "lucide-react";
import BookingModal from "../components/BookingModal";
import FavoriteButton from "../components/FavoriteButton";
import { useHotels } from "../hooks/useSanityData";
import Wrapper from "../components/Wrapper";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";
import SEOContent from "../components/SEOContent";
import { ItemListSchema, FAQSchema } from "../components/StructuredData";
import Breadcrumbs from "../components/Breadcrumbs";

const Hotels = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('hotels', i18n.language);

  // SEO Content
  const seoContentData = {
    title: t('seoContent.hotels.title'),
    intro: t('seoContent.hotels.intro'),
    sections: [
      {
        title: t('seoContent.hotels.sections.luxury.title'),
        content: t('seoContent.hotels.sections.luxury.content'),
        titleHighlight: 'Luxe',
        contentHighlight: '5 étoiles',
      },
      {
        title: t('seoContent.hotels.sections.boutique.title'),
        content: t('seoContent.hotels.sections.boutique.content'),
        titleHighlight: 'Alfama',
        contentHighlight: 'Tage',
      },
      {
        title: t('seoContent.hotels.sections.budget.title'),
        content: t('seoContent.hotels.sections.budget.content'),
        titleHighlight: 'Bien Situés',
        contentHighlight: 'métro',
      },
    ],
    faqs: [
      {
        question: t('seoContent.hotels.faqs.neighborhood.question'),
        answer: t('seoContent.hotels.faqs.neighborhood.answer'),
      },
      {
        question: t('seoContent.hotels.faqs.budget.question'),
        answer: t('seoContent.hotels.faqs.budget.answer'),
      },
      {
        question: t('seoContent.hotels.faqs.when.question'),
        answer: t('seoContent.hotels.faqs.when.answer'),
      },
      {
        question: t('seoContent.hotels.faqs.transport.question'),
        answer: t('seoContent.hotels.faqs.transport.answer'),
      },
    ],
    faqTitle: t('seoContent.hotels.faqTitle'),
  };

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  const { hotels, categories, isLoading, error } = useHotels();

  const filteredHotels =
    selectedCategory === "all"
      ? hotels
      : hotels.filter((hotel: any) => hotel.category === selectedCategory);

  // ItemList pour le schema SEO
  const itemListData = useMemo(() =>
    hotels.slice(0, 20).map((hotel: any) => ({
      name: hotel.name,
      url: `https://ousortiralisbonne.com/hotels#${hotel.id}`,
      image: hotel.image,
      description: hotel.description?.substring(0, 150)
    })), [hotels]
  );

  const handleBookNow = (hotel: any) => {
    window.open(hotel.bookingUrl, "_blank");
  };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <ItemListSchema
        items={itemListData}
        listName={t('hotels.title') || "Meilleurs hôtels à Lisbonne"}
        listUrl="https://ousortiralisbonne.com/hotels"
      />
      <FAQSchema faqs={seoContentData.faqs} pageId="hotels" />
      <main id="main-content">
        <Breadcrumbs />
        <Wrapper
          isLoading={isLoading}
          error={error}
        >
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-[30vh] md:h-[40vh]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 font-garage">
                Hôtels à{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Lisbonne
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/80">{t("hotels.subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="sticky top-20 bg-white shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 py-3 md:py-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                  selectedCategory === "all"
                    ? "bg-[#37b7ab] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                }`}
              >
                ✨ {t("hotels.filters.all")}
              </button>

              {categories.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                    selectedCategory === category.id
                      ? "bg-[#37b7ab] text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel: any) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col"
              >
                <div className="relative">
                  <div
                    className="h-48 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${hotel.image})` }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#2a2765] font-semibold">
                    {hotel.priceRange}
                  </div>
                  <FavoriteButton
                    item={{
                      id: hotel.id.toString(),
                      name: hotel.name,
                      type: "Hôtel",
                      image: hotel.image,
                      price: hotel.priceRange,
                    }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#2a2765] mb-2 font-garage">
                      {hotel.name}
                    </h3>

                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-[#2a2765]">
                        {hotel.rating}
                      </span>
                      <span className="text-gray-500">
                        ({hotel.reviews} {t("restaurants.reviews")})
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{hotel.address}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.amenities.map((amenity: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center"
                        >
                          <Wifi className="h-3 w-3 mr-1" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(hotel)}
                    className="w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group mt-auto"
                  >
                    <span>{t("nav.book")}</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
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
          faqAnswerHighlights={["Baixa", "Alfama", "métro", "tramways", "transferts", "3 étoiles", "4 étoiles"]}
          pageId="hotels"
        />

        <BookingModal
          item={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default Hotels;
