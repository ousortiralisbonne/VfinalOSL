// project/src/pages/MoreActivities.tsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import ActivityModal from "../components/ActivityModal";
import { useFetch } from "../hooks/useFetch";
import Wrapper from "../components/Wrapper";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";

const MoreActivities = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('moreActivities', i18n.language);

  const queryMoreActivities = `*[_type == "moreActivities"]{
    id,
    title,
    items[]{
      name,
      description,
      details,
      image
    }
  }`;

  const { isLoading, error, data } = useFetch(queryMoreActivities);

  let categories: any[] = [];

  if (data) {
    categories = data.map((item: any) => ({
      id: item.id,
      title: item.title[i18n.language],
      items: item.items.map((activity: any) => ({
        name: activity.name[i18n.language],
        description: activity.description[i18n.language],
        image: imgUrlBuilder(activity.image).url(),
        details: {
          price: `${t("transfers.fleetSection.pricePrefix")} ${
            activity.details.price
          }`,
          hours: activity.details.hours,
          highlights: activity.details.highlights[i18n.language],
        },
      })),
    }));
  }

  if (categories?.length > 0) {
    categories = [
      {
        id: "all",
        title: `✨ ${t("all")}`,
        icon: null,
        items: [],
      },
      ...categories,
    ];
  }

  const filteredItems =
    selectedCategory === "all"
      ? categories.flatMap((category) => category.items)
      : categories.find((category) => category?.id === selectedCategory)
          ?.items || [];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <main id="main-content">
        <Wrapper isLoading={isLoading} error={error}>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div
            className="relative bg-cover bg-center h-[40vh]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
                {t("nav.muchmore")}
              </h1>
              <p className="text-xl text-white/80">
                {t("discovergastrolisbonne")}
              </p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="sticky top-20 bg-white shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 py-4">
              {categories.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-[#37b7ab] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item: any, itemIndex: any) => (
              <article
                key={itemIndex}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={`${item.name} - Activité à faire à Lisbonne`}
                    loading="lazy"
                    width="400"
                    height="192"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold text-[#2a2765] mb-3 font-garage line-clamp-2 group-hover:text-[#37b7ab] transition-colors">
                      {item.name}
                    </h2>

                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <button className="w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group mt-auto">
                    <span>{t("viewdetails")}</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Modal */}
        <ActivityModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default MoreActivities;
