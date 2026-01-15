// project/src/pages/Clubs.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Star, Clock, Phone, ChevronRight } from "lucide-react";
import BookingModal from "../components/BookingModal";
import FavoriteButton from "../components/FavoriteButton";
import { useFetch } from "../hooks/useFetch";
import Wrapper from "../components/Wrapper";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import BookingclubLuxFragil from "../components/BookingclubLuxFragil";
import BookingClubSpotLisboa from "../components/BookingClubSpotLisboa";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";

const Clubs = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('clubs', i18n.language);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedClub, setSelectedClub] = useState<any>(null);

  const {
    data: genresData,
    isLoading: isLoadingGenres,
    error: errorGenres,
  } = useFetch(`*[_type == "clubCategories"] | order(order asc)`);

  const {
    data: clubsData,
    isLoading: isLoadingClubs,
    error: errorClubs,
  } = useFetch(`*[_type == "clubs"] | order(order asc)`);
  // Debug: selectedClub
  const genres =
    genresData?.map((genre: any) => ({
      id: genre.id,
      name: genre.name[i18n.language],
    })) || [];

  const clubs =
    clubsData?.map((club: any) => ({
      id: club._id,
      name: club.name,
      genre: (genresData as any)?.find(
        (genre: any) => genre._id === club.genre._ref
      )?.id,
      priceRange: club.priceRange,
      rating: club.rating,
      reviews: club.reviews,
      address: club.address,
      openingHours: club.openingHours,
      phone: club.phone,
      image: imgUrlBuilder(club.image).url(),
      tags: club.tags[i18n.language].map((tag: any) => ({
        name: tag,
        label: tag,
      })),
    })) || [];

  const filteredClubs =
    selectedGenre === "all"
      ? clubs
      : clubs.filter((club: any) => club.genre === selectedGenre);

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <main id="main-content">
        <Wrapper
          isLoading={isLoadingGenres || isLoadingClubs}
          error={errorGenres || errorClubs}
        >
        <div className="pt-20 min-h-screen bg-gray-50">
          {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-[30vh] md:h-[40vh]"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/pw/AP1GczMsOdE1C1ISYG1xF4e-n3PP5UDQT-kPRgRqFVSlYw2bOmG6yc_WMFMmqDxBOC3sPA4rcIAAnrdmGMcUN9TcdrFAr9xxvoi24OcIw_KEJ0v5DzDV8YI0vl9Jvkxp93ihf9RV2Z3GRIj5VYNn62lBrncU=w2434-h1638-s-no-gm?authuser=0")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 font-garage">
                Clubs à{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Lisbonne
                </span>
              </h1>
              <p className="text-base md:text-xl text-white/80">{t("clubs.subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="sticky top-20 bg-white shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 py-3 md:py-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
              <button
                onClick={() => setSelectedGenre("all")}
                className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                  selectedGenre === "all"
                    ? "bg-[#37b7ab] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                }`}
              >
                ✨ {t("clubs.filters.all")}
              </button>

              {genres.map((genre: any) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                    selectedGenre === genre.id
                      ? "bg-[#37b7ab] text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club: any) => (
              <div
                key={club.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col"
              >
                <div className="relative">
                  <div
                    className="h-48 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${club.image})` }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#2a2765] font-semibold">
                    {club.priceRange}
                  </div>
                  <FavoriteButton
                    item={{
                      id: club.id.toString(),
                      name: club.name,
                      type: "Club",
                      image: club.image,
                      price: club.priceRange,
                    }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[#2a2765] mb-2 font-garage">
                      {club.name}
                    </h3>

                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-[#2a2765]">
                        {club.rating}
                      </span>
                      <span className="text-gray-500">
                        ({club.reviews} {t("clubs.reviews")})
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{club.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{club.openingHours}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{club.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {club.tags.map((tag: any, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedClub(club)}
                    className="w-full bg-[#2f2d69] text-white px-6 py-3.5 md:py-3 rounded-full hover:bg-[#252157] active:bg-[#1a1845] transition font-garage tracking-wide text-sm flex items-center justify-center group mt-auto min-h-[48px]"
                  >
                    <span>{t("clubs.book_button")}</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BookingclubLuxFragil
          item={selectedClub}
          onClose={() => setSelectedClub(null)}
          reservation={`Club ${selectedClub?.name}`}
        />
        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default Clubs;
