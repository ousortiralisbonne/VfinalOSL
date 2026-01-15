import { Star, Facebook, Quote, ExternalLink, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: "1",
    rating: 5,
  },
  {
    id: "2",
    rating: 5,
  },
  {
    id: "3",
    rating: 5,
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            {t("testimonials.badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-garage tracking-tight">
            {t("testimonials.titleStart")}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t("testimonials.titleHighlight")}
            </span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            {t("testimonials.descriptionStart")}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-medium">
              {t("testimonials.descriptionHighlight")}
            </span>
            {t("testimonials.descriptionEnd")}
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-8">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="testimonials-swiper pb-10"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative overflow-hidden mx-2">
                  {/* Quote icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Quote className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 font-garage tracking-wide text-base mb-2">
                      {t(`testimonials.reviews.${testimonial.id}.name`)}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-base relative z-10">
                    "{t(`testimonials.reviews.${testimonial.id}.textStart`)}
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-semibold">
                      {t(`testimonials.reviews.${testimonial.id}.textHighlight`)}
                    </span>
                    {t(`testimonials.reviews.${testimonial.id}.textEnd`)}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handlePrev}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-gray-200"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-gray-200"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <style>{`
            .testimonials-swiper .swiper-pagination {
              bottom: 0;
            }
            .testimonials-swiper .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              background: #d1d5db;
              opacity: 1;
            }
            .testimonials-swiper .swiper-pagination-bullet-active {
              background: #10b981;
              width: 24px;
              border-radius: 4px;
            }
          `}</style>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8 md:mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 transform hover:scale-105 border border-gray-100 relative overflow-hidden"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Quote className="h-6 w-6 text-emerald-600" />
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-900 font-garage tracking-wide text-lg mb-2">
                  {t(`testimonials.reviews.${testimonial.id}.name`)}
                </h3>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                "{t(`testimonials.reviews.${testimonial.id}.textStart`)}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-semibold">
                  {t(`testimonials.reviews.${testimonial.id}.textHighlight`)}
                </span>
                {t(`testimonials.reviews.${testimonial.id}.textEnd`)}"
              </p>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 right-4 w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>

        {/* Review Links */}
        <div className="text-center bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
            <Star className="h-4 w-4 mr-2" />
            {t("testimonials.moreBadge")}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 font-garage">
            {t("testimonials.moreTitle")}
          </h3>
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg px-2">
            {t("testimonials.moreDescription")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <a
              href="https://www.facebook.com/ousortiralisbonne/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-6 md:px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[52px]"
            >
              <Facebook className="h-5 w-5 md:h-6 md:w-6 mr-3" />
              <span>{t("testimonials.facebookReviews")}</span>
              <ExternalLink className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="https://www.trustpilot.com/review/ousortiralisbonne.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-6 md:px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 active:from-emerald-700 active:to-teal-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[52px]"
            >
              <svg
                className="h-5 w-5 md:h-6 md:w-6 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0l2.869 9.196h9.131l-7.412 5.402 2.869 9.196-7.412-5.402-7.412 5.402 2.869-9.196-7.412-5.402h9.131z" />
              </svg>
              <span>{t("testimonials.trustpilot")}</span>
              <ExternalLink className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
