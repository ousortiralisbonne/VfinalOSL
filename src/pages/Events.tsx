// project/src/pages/Events.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import BookingModal from "../components/BookingModal";
import BookingEventFadoAlfama from "../components/BookingEventFadoAlfama";
import FavoriteButton from "../components/FavoriteButton";
import { useFetch } from "../hooks/useFetch";
import Wrapper from "../components/Wrapper";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";

const Events = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('events', i18n.language);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useFetch(`*[_type == "eventCategories"] | order(order asc)`);

  const {
    data: eventsData,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useFetch(`*[_type == "events"] | order(order asc)`);
  // Debug: selectedEvent
  const categories =
    categoriesData?.map((category: any) => ({
      id: category.id,
      name: category.name[i18n.language],
    })) || [];

  const events =
    eventsData?.map((event: any) => ({
      id: event._id,
      title: event.title[i18n.language],
      category: (categoriesData as any)?.find(
        (cat: any) => cat._id === event.category._ref
      )?.id,
      date: event.date,
      time: event.time,
      location: event.location,
      image: imgUrlBuilder(event.image).url(),
      price: event.price,
      nameFr: event.title["fr"] || "",
    })) || [];

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event: any) => event.category === selectedCategory);

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <main id="main-content">
        <Wrapper
          isLoading={isLoadingCategories || isLoadingEvents}
          error={errorCategories || errorEvents}
        >
        <div className="pt-20 min-h-screen bg-gray-50">
          {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-[30vh] md:h-[40vh]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 font-garage">
                Événements à{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Lisbonne
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/80">{t("events.subtitle")}</p>
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
                ✨ {t("events.filters.all")}
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

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event: any) => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative">
                  <div
                    className="h-48 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#2a2765] font-semibold">
                    {event.price}
                  </div>
                  <FavoriteButton
                    item={{
                      id: event.id.toString(),
                      name: event.title,
                      type: "Événement",
                      image: event.image,
                      price: event.price,
                    }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2a2765] mb-4 font-garage">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full bg-[#2f2d69] text-white px-6 py-3.5 md:py-3 rounded-full hover:bg-[#252157] active:bg-[#1a1845] transition font-garage tracking-wide text-sm flex items-center justify-center group min-h-[48px]"
                  >
                    <span>{t("featuredEvent.button")}</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedEvent?.nameFr?.toLowerCase()?.includes("fado") &&
        selectedEvent?.nameFr?.toLowerCase()?.includes("alfama") ? (
          <BookingEventFadoAlfama
            item={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            reservation={`Événement ${selectedEvent?.nameFr}`}
          />
        ) : (
          <BookingModal
            item={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            reservation={`Événement ${selectedEvent?.nameFr}`}
          />
        )}
        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default Events;
