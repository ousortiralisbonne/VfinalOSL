// project/src/pages/Bars.tsx
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Clock, Phone } from "lucide-react";
import BookingModal from "../components/BookingModal";
import Card from "../components/shared/Card";
import Rating from "../components/shared/Rating";
import InfoItem from "../components/shared/InfoItem";
import TagList from "../components/shared/TagList";
import { useBars } from "../hooks/useSanityData";
import Wrapper from "../components/Wrapper";
import BookingClubSpotLisboa from "../components/BookingClubSpotLisboa";
import PageBanner from "../components/PageBanner";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";
import SEOContent from "../components/SEOContent";
import { ItemListSchema, FAQSchema } from "../components/StructuredData";

const Bars = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('bars', i18n.language);

  // SEO Content
  const seoContentData = {
    title: t('seoContent.bars.title'),
    intro: t('seoContent.bars.intro'),
    sections: [
      {
        title: t('seoContent.bars.sections.rooftops.title'),
        content: t('seoContent.bars.sections.rooftops.content'),
        titleHighlight: 'Panoramique',
        contentHighlight: 'Tage',
      },
      {
        title: t('seoContent.bars.sections.cocktails.title'),
        content: t('seoContent.bars.sections.cocktails.content'),
        titleHighlight: 'Cocktails',
        contentHighlight: 'mixologistes',
      },
      {
        title: t('seoContent.bars.sections.traditional.title'),
        content: t('seoContent.bars.sections.traditional.content'),
        titleHighlight: 'Bairro Alto',
        contentHighlight: 'Bairro Alto',
      },
    ],
    faqs: [
      {
        question: t('seoContent.bars.faqs.best.question'),
        answer: t('seoContent.bars.faqs.best.answer'),
      },
      {
        question: t('seoContent.bars.faqs.neighborhood.question'),
        answer: t('seoContent.bars.faqs.neighborhood.answer'),
      },
      {
        question: t('seoContent.bars.faqs.hours.question'),
        answer: t('seoContent.bars.faqs.hours.answer'),
      },
      {
        question: t('seoContent.bars.faqs.prices.question'),
        answer: t('seoContent.bars.faqs.prices.answer'),
      },
    ],
    faqTitle: t('seoContent.bars.faqTitle'),
  };

  const [selectedType, setSelectedType] = useState("all");
  const [selectedBar, setSelectedBar] = useState<any>(null);

  const { bars, types, isLoading, error } = useBars();

  const filteredBars =
    selectedType === "all"
      ? bars
      : bars.filter((bar: any) => bar.type === selectedType);

  // ItemList pour le schema SEO
  const itemListData = useMemo(() =>
    bars.slice(0, 20).map((bar: any) => ({
      name: bar.name,
      url: `https://ousortiralisbonne.com/bars#${bar.id}`,
      image: bar.image,
      description: bar.description?.substring(0, 150)
    })), [bars]
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
        listName={t('bars.title') || "Meilleurs bars à Lisbonne"}
        listUrl="https://ousortiralisbonne.com/bars"
      />
      <FAQSchema faqs={seoContentData.faqs} pageId="bars" />
      <main id="main-content">
        <Wrapper
          isLoading={isLoading}
          error={error}
        >
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <PageBanner
          pageId="bars"
          fallbackTitle={t("bars.title")}
          fallbackSubtitle={t("bars.subtitle")}
          fallbackImage="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          titleHighlight="Lisbonne"
        />

        {/* Filters Section */}
        <div className="sticky top-20 bg-white shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 py-3 md:py-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                  selectedType === "all"
                    ? "bg-[#37b7ab] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                }`}
              >
                ✨ {t("bars.filters.all")}
              </button>

              {types.map((type: any) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2.5 md:py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 text-sm md:text-base min-h-[44px] md:min-h-0 flex items-center ${
                    selectedType === type.id
                      ? "bg-[#37b7ab] text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBars.map((bar: any) => (
              <Card
                key={bar.id}
                id={bar.id.toString()}
                name={bar.name}
                type="Bar"
                image={bar.image}
                price={bar.priceRange}
                onAction={() => setSelectedBar(bar)}
                actionLabel={t("bars.book_button")}
              >
                <h3 className="text-xl font-bold text-[#2a2765] mb-2 font-garage">
                  {bar.name}
                </h3>

                <Rating
                  rating={bar.rating}
                  reviews={bar.reviews}
                  reviewsLabel={t("bars.reviews")}
                />

                <div className="space-y-2 mb-4 text-sm">
                  <InfoItem icon={MapPin} text={bar.address} />
                  <InfoItem icon={Clock} text={bar.openingHours} />
                  <InfoItem icon={Phone} text={bar.phone} />
                </div>

                <TagList
                  tags={bar.tags}
                  getTagLabel={(tag: any) => {
                    return tag;
                  }}
                />
              </Card>
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
          faqAnswerHighlights={["Bairro Alto", "rooftop", "cocktails", "PARK Bar", "Cais do Sodré", "22h"]}
          pageId="bars"
        />

        {selectedBar?.name === "Spot Lisboa" ? (
          <BookingClubSpotLisboa
            item={selectedBar}
            onClose={() => setSelectedBar(null)}
            reservation={`Bar ${selectedBar?.name}`}
          />
        ) : (
          <BookingModal
            item={selectedBar}
            onClose={() => setSelectedBar(null)}
            reservation={`Bar ${selectedBar?.name}`}
          />
        )}
        </div>
      </Wrapper>
      </main>
    </>
  );
};

export default Bars;
