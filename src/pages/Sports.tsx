// project/src/pages/Sports.tsx
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Clock } from "lucide-react";
import BookingModal from "../components/BookingModal";
import FavoriteButton from "../components/FavoriteButton";
import { useFetch } from "../hooks/useFetch";
import Wrapper from "../components/Wrapper";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";

const Sports = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('sports', i18n.language);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const querySports = `*[_type == "sports"] | order(order asc) {
    id,
    name,
    activities[]{
      id,
      name,
      description,
      price,
      duration,
      image,
      highlights,
      order
    }
  }`;

  const { isLoading, error, data } = useFetch(querySports);

  let categories: any[] = [];

  if (data) {
    categories = data.map((item: any) => ({
      id: item.id,
      name: item.name[i18n.language],
      activities: item.activities.map((activity: any) => ({
        id: activity.id,
        name: activity.name[i18n.language],
        nameFr: activity.name["fr"],
        description: activity.description[i18n.language],
        price: activity.price,
        duration: activity.duration,
        image: imgUrlBuilder(activity.image).url(),
        highlights: activity.highlights[i18n.language],
      })),
    }));
  }

  const filteredActivities =
    selectedCategory === "all"
      ? categories.flatMap((cat) => cat.activities)
      : categories.find((cat) => cat.id === selectedCategory)?.activities || [];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <main id="main-content">
        <Wrapper isLoading={isLoading} error={error}>
          <div className="pt-20 min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div
            className="relative bg-cover bg-center h-[40vh]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
                {t("sports.hero.title")}
              </h1>
              <p className="text-xl text-white/80">
                {t("sports.hero.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="sticky top-20 bg-white shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 py-4">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-[#37b7ab] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                ✨ {t("sports.filters.all")}
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center ${
                    selectedCategory === category.id
                      ? "bg-[#37b7ab] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map(
              (activity: {
                id: Key | null | undefined;
                image: any;
                price:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Iterable<ReactNode>
                  | null
                  | undefined;
                name:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Iterable<ReactNode>
                  | null
                  | undefined;
                description:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Iterable<ReactNode>
                  | null
                  | undefined;
                duration:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Iterable<ReactNode>
                  | null
                  | undefined;
                highlights: string[];
              }) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-48">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${activity.image})` }}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#2a2765] font-semibold">
                      {t("sports.activities.pricePrefix")} {activity.price}
                    </div>
                    <FavoriteButton
                      item={{
                        id: activity.id,
                        name: activity.name,
                        type: t("sports.activities.type"),
                        image: activity.image,
                        price: `${t("sports.activities.pricePrefix")} ${
                          activity.price
                        }`,
                      }}
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2a2765] mb-4 font-garage">
                      {activity.name}
                    </h3>

                    <p className="text-gray-600 mb-4">{activity.description}</p>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Clock className="h-4 w-4 mr-2 text-[#37b7ab]" />
                      <span>
                        {t("sports.activities.duration")} {activity.duration}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {activity.highlights.map(
                        (highlight: string, index: number) => (
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

                    <button
                      onClick={() => setSelectedActivity(activity)}
                      className="w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group"
                    >
                      <span>{t("sports.activities.requestInfo")}</span>
                      <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Booking Modal */}
        <BookingModal
          item={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          reservation={`Sport ${selectedActivity?.nameFr}`}
        />
        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default Sports;
