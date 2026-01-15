// project/src/pages/MoreExplore.tsx

import { useState } from "react";
import { useTranslation } from "react-i18next";
import ActivityModal from "../components/ActivityModal";
import { useFetch } from "../hooks/useFetch";
import Wrapper from "../components/Wrapper";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import { ChevronRight } from "lucide-react";

const MoreExplore = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { t, i18n } = useTranslation();

  const { data, isLoading, error } = useFetch(
    `*[_type == "exploreMore"] | order(order asc)`
  );

  let categories =
    data?.map((category: any) => ({
      id: category._id, // Ensure each category has a unique id
      title: category.title[i18n.language],
      items: category.items.map((item: any) => ({
        name: item.name[i18n.language],
        description: item.description[i18n.language],
        image: imgUrlBuilder(item.image).url(),
        details: {
          price:
            item?.details?.price == "0"
              ? t("free")
              : item?.details?.price?.includes("-")
              ? item.details.price
              : `${t("transfers.fleetSection.pricePrefix")} ${
                  item.details.price
                }`,
          hours:
            item.details.hours == "0"
              ? t("onrdv")
              : item.details.hours == "1"
              ? t("variable")
              : item.details.hours,
          highlights: item.details.highlights[i18n.language],
        },
      })),
    })) || [];

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
    <main id="main-content">
      <Wrapper isLoading={isLoading} error={error}>
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center h-[40vh]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1594794312433-05a69a98b7a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
                {t("nav.muchmore")}
              </h1>
              <p className="text-xl text-white/80">
                {t("discoveruniqexperience")}
              </p>
            </div>
          </div>
        </div>

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
                    alt={`${item.name} - Explorer Lisbonne`}
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
  );
};

export default MoreExplore;
