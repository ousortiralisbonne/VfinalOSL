import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Star, Clock, Phone, ChevronRight } from "lucide-react";
import FavoriteButton from "../components/FavoriteButton";
import { useRestaurants } from "../hooks/useSanityData";
import Wrapper from "../components/Wrapper";
import BookingRestaurantModal from "../components/BookingRestaurantModal";
import PageBanner from "../components/PageBanner";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";
import SEOContent from "../components/SEOContent";
import { ItemListSchema, FAQSchema } from "../components/StructuredData";

const Restaurants = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('restaurants', i18n.language);

  // SEO Content
  const seoContentData = {
    title: t('seoContent.restaurants.title'),
    intro: t('seoContent.restaurants.intro'),
    sections: [
      {
        title: t('seoContent.restaurants.sections.traditional.title'),
        content: t('seoContent.restaurants.sections.traditional.content'),
        titleHighlight: 'Portugais',
        contentHighlight: 'bacalhau',
      },
      {
        title: t('seoContent.restaurants.sections.view.title'),
        content: t('seoContent.restaurants.sections.view.content'),
        titleHighlight: 'Tage',
        contentHighlight: 'Tage',
      },
      {
        title: t('seoContent.restaurants.sections.budget.title'),
        content: t('seoContent.restaurants.sections.budget.content'),
        titleHighlight: 'Lisbonne',
        contentHighlight: 'menu do dia',
      },
    ],
    faqs: [
      {
        question: t('seoContent.restaurants.faqs.best.question'),
        answer: t('seoContent.restaurants.faqs.best.answer'),
      },
      {
        question: t('seoContent.restaurants.faqs.cheap.question'),
        answer: t('seoContent.restaurants.faqs.cheap.answer'),
      },
      {
        question: t('seoContent.restaurants.faqs.neighborhood.question'),
        answer: t('seoContent.restaurants.faqs.neighborhood.answer'),
      },
      {
        question: t('seoContent.restaurants.faqs.reservation.question'),
        answer: t('seoContent.restaurants.faqs.reservation.answer'),
      },
    ],
    faqTitle: t('seoContent.restaurants.faqTitle'),
  };
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const { restaurants, cuisines, isLoading, error } = useRestaurants();


  // Dédupliquer les restaurants par ID
  const uniqueRestaurants = restaurants.filter((restaurant, index, arr) => 
    arr.findIndex(r => r.id === restaurant.id) === index
  );

  const filteredRestaurants =
    selectedCuisine === "all"
      ? uniqueRestaurants.filter((restaurant) => restaurant.cuisine) // Exclure les restaurants sans cuisine
      : uniqueRestaurants.filter(
          (restaurant) => restaurant.cuisine && restaurant.cuisine === selectedCuisine
        );

  // ItemList pour le schema SEO
  const itemListData = useMemo(() =>
    uniqueRestaurants.slice(0, 20).map((restaurant) => ({
      name: restaurant.name,
      url: `https://ousortiralisbonne.com/restaurants#${restaurant.id}`,
      image: restaurant.image,
      description: restaurant.description?.substring(0, 150)
    })), [uniqueRestaurants]
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
        listName={t('restaurants.title') || "Meilleurs restaurants à Lisbonne"}
        listUrl="https://ousortiralisbonne.com/restaurants"
      />
      <FAQSchema faqs={seoContentData.faqs} pageId="restaurants" />
      <main id="main-content">
        <Wrapper
        isLoading={isLoading}
        error={error}
      >
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <PageBanner
          pageId="restaurants"
          fallbackTitle={t("restaurants.title")}
          fallbackSubtitle={t("restaurants.subtitle")}
          fallbackImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          titleHighlight="Lisbonne"
        />

        {/* Filters Section */}
        <div className="sticky top-20 bg-white shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 py-3 md:py-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
              <button
                onClick={() => setSelectedCuisine("all")}
                className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                  selectedCuisine === "all"
                    ? "bg-[#37b7ab] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                }`}
              >
                ✨ {t("restaurants.filters.all")}
              </button>

              {cuisines.map((cuisine) => (
                <button
                  key={cuisine.id}
                  onClick={() => setSelectedCuisine(cuisine.id)}
                  className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                    selectedCuisine === cuisine.id
                      ? "bg-[#37b7ab] text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                  }`}
                >
                  {cuisine.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col"
              >
                <div className="relative">
                  <div
                    className="h-48 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${restaurant.image})` }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#2a2765] font-semibold">
                    {restaurant.priceRange}
                  </div>
                  <FavoriteButton
                    item={{
                      id: restaurant.id.toString(),
                      name: restaurant.name,
                      type: "Restaurant",
                      image: restaurant.image,
                      price: restaurant.priceRange,
                    }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[#2a2765] mb-2 font-garage">
                      {restaurant.name}
                    </h3>

                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-[#2a2765]">
                        {restaurant.rating}
                      </span>
                      <span className="text-gray-500">
                        ({restaurant.reviews} {t("restaurants.reviews")})
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{restaurant.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{restaurant.openingHours}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{restaurant.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {restaurant.specialties.map(
                        (specialty: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group mt-4"
                  >
                    <span>{t("restaurants.book_button")}</span>
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
          faqAnswerHighlights={["Alfama", "menu do dia", "réserver", "fado", "Chiado", "tascas"]}
          pageId="restaurants"
        />

        <BookingRestaurantModal
          item={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          reservation={`Restaurant ${selectedRestaurant?.name}`}
        />
      </div>
    </Wrapper>
      </main>
    </>
  );
};

export default Restaurants;
