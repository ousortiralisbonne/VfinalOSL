import { Star, Wine, Bot as Boat, Landmark, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import { Link } from "react-router-dom";
import sintraUrl from "../images/newpics/sintra.jpg";
import MobileCarousel from "./MobileCarousel";

const PopularExperiences = () => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const lisbonWalkTitle =
    lng === "pt"
      ? "Passeio a pé privado e autêntico por Lisboa"
      : lng === "fr"
      ? "Visite privée et authentique à pied de Lisbonne"
      : "Private and authentic walking tour of Lisbon";
  const lisbonWalkImg = {
    _type: "image",
    asset: {
      _ref: "image-67a3408b626d929ba1edb1d20832f178b9e26391-1495x984-png",
      _type: "reference",
    },
  };

  const sintraTitle =
    lng === "pt"
      ? "Excursão Sintra, Cabo da Roca e Cascais em Francês"
      : lng === "fr"
      ? "Excursion Sintra, Cabo da Roca et Cascais en français"
      : "Sintra, Cabo da Roca, and Cascais Excursion in French";

  const sintraImg = {
    _type: "image",
    asset: {
      _ref: "image-a6298879e9dda27584e945dc340e9b10934ec25c-1488x980-png",
      _type: "reference",
    },
  };

  const cruiseTitle =
    lng === "pt"
      ? "Cruzeiro diurno, ao final da manhã ou a meio da tarde"
      : lng === "fr"
      ? "Croisière en journée, en fin de matinée ou milieu d'après-midi "
      : "Daytime cruise, late morning or mid-afternoon";
  const cruiseImg = {
    _type: "image",
    asset: {
      _ref: "image-bf92837b121a8e4feb6342b3eb3187c3ce6ed606-1856x1384-png",
      _type: "reference",
    },
  };

  const bestSellers = [
    {
      id: "best-seller-1",
      category: t("popularExperiences.culture.category"),
      title: lisbonWalkTitle,
      rating: 4.9,
      reviews: 167,
      image: imgUrlBuilder(lisbonWalkImg),
      altText: "Lisbonne walk",
      color: "#37b7ab",
      icon: Landmark,
      path: "/visites-guidees",
    },
    {
      id: "best-seller-2",
      category: t("popularExperiences.culture.category"),
      title: sintraTitle,
      rating: 4.8,
      reviews: 225,
      image: sintraUrl, // imgUrlBuilder(sintraImg),
      altText: "Sintra walk",
      color: "#37b7ab",
      icon: Landmark,
      path: "/visites-guidees",
    },
    {
      id: "best-seller-3",
      category: t("popularExperiences.cruise.category"),
      title: cruiseTitle,
      rating: 4.6,
      reviews: 445,
      image: imgUrlBuilder(cruiseImg),
      altText: "Cruise ",
      color: "#4A90E2",
      icon: Landmark,
      path: "/bateaux-lisbonne",
    },
  ];

  const experiences = [
    ...bestSellers,
    /* {
      id: 1,
      category: t("popularExperiences.gastronomy.category"),
      title: t("popularExperiences.gastronomy.title"),
      rating: 4.9,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      altText:
        "Dégustation de vins portugais dans une cave historique avec des verres de Porto",
      color: "#37b7ab",
      icon: Wine,
    }, */
    {
      id: 2,
      category: t("popularExperiences.cruise.category"),
      title: t("popularExperiences.cruise.title"),
      rating: 4.8,
      reviews: 256,
      image:
        "https://lh3.googleusercontent.com/pw/AP1GczOFLRR8UjaDC55ujHGvfrFAV_iu4ySfiH30RG_bMu7Xbu2VvAIpMLUx36VK-IEZFbut9LR84g38uup0jb4DiS2wA7Eo3MXmMZkrdq2pE8M-tYshhpLBf8Qhi6SfO-xSuvzV-wV6CYopw3mlESlld1rZ=w2495-h1661-s-no-gm?authuser=0",
      altText:
        "Croisière sur le Tage au coucher du soleil avec vue sur le pont du 25 avril",
      color: "#4A90E2",
      icon: Boat,
      path: "/bateaux-lisbonne",
    },
    {
      id: 3,
      category: t("popularExperiences.culture.category"),
      title: t("popularExperiences.culture.title"),
      rating: 4.7,
      reviews: 184,
      image:
        "https://lh3.googleusercontent.com/pw/AP1GczP56Hi6z17UjXjLuzKZYLN35qyB-GIcl3ONBKkCRF3eL_nGg-iswL-JDmEJEf8xyQ4vqVL8fsQeUBFCdWWNCt_y5lDsmKHzGPMWtTBqZXgkauiL7wmvDUPHBFZyZNKO522Vs4zd_XNEBgQUKgzbx6c9=w1107-h1661-s-no-gm?authuser=0",
      altText:
        "Visite guidée dans les ruelles pittoresques d'Alfama avec ses azulejos traditionnels",
      color: "#37b7ab", //"#FF6B6B",
      icon: Landmark,
      path: "/visites-guidees",
    },

    {
      id: 4,
      category: t("popularExperiences.tuktuk.category"),
      title: t("popularExperiences.tuktuk.title"),
      rating: 4.7,
      reviews: 184,
      image:
        "https://lh3.googleusercontent.com/pw/AP1GczPK0PHm46w_Gja5ehf6JSBMPbJ1pw6meO-4pY4hQELjGflzRDXj2sEL3PRO4q05akPzoK7dif6OphE3XbhyV8NRyad3JL5YneSZ7_xcYCcP_Z5g8dJqysvPtJ_23Ki2-AHJofk9bacXPp49Zn8kw4FV=w2486-h1656-s-no-gm?authuser=0",
      altText:
        "Visite guidée dans les ruelles pittoresques d'Alfama avec ses azulejos traditionnels",
      color: "#37b7ab", //"#FF6B6B",
      icon: Landmark,
      path: "/visites-guidees",
    },
    /*{
      id: 5,
      category: t("popularExperiences.tage.category"),
      title: t("popularExperiences.tage.title"),
      rating: 4.7,
      reviews: 184,
      image:
        "https://images.unsplash.com/photo-1614065263944-15c1f6230cd1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText:
        "Visite guidée dans les ruelles pittoresques d'Alfama avec ses azulejos traditionnels",
      color: "#FF6B6B",
      icon: Landmark,
    },
     {
      id: 6,
      category: t("popularExperiences.visiteonfoot.category"),
      title: t("popularExperiences.visiteonfoot.title"),
      rating: 4.7,
      reviews: 184,
      image:
        "https://images.unsplash.com/photo-1692189180322-76b6156f31b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText:
        "Visite guidée dans les ruelles pittoresques d'Alfama avec ses azulejos traditionnels",
      color: "#FF6B6B",
      icon: Landmark,
    }, */
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 md:mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            {t("popularExperiences.badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-garage tracking-tight">
            {t("popularExperiences.titleStart")}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t("popularExperiences.titleHighlight")}
            </span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            {t("popularExperiences.description")}
          </p>
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel className="mb-8">
          {bestSellers.map((experience) => (
            <div
              key={experience.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 mx-2"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${experience.image}")` }}
                  role="img"
                  aria-label={experience.altText}
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm border border-white/20"
                  style={{
                    backgroundColor: `${experience.color}90`,
                    color: "#fff",
                  }}
                >
                  <experience.icon className="h-3 w-3" />
                  {experience.category}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3 font-garage tracking-tight leading-tight">
                  {experience.title}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1.5">
                    <div className="flex items-center space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < Math.floor(experience.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900 text-xs">
                      {experience.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {experience.reviews} {t("popularExperiences.reviews")}
                  </span>
                </div>

                <Link to={experience?.path}>
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3.5 rounded-2xl hover:from-emerald-600 hover:to-teal-700 active:from-emerald-700 active:to-teal-800 transition-all duration-300 font-garage tracking-wide text-sm flex items-center justify-center shadow-lg">
                    <span className="font-semibold">{t("popularExperiences.discover")}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </MobileCarousel>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {bestSellers.map((experience, index) => (
            <div
              key={experience.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 border border-gray-100"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${experience.image}")` }}
                  role="img"
                  aria-label={experience.altText}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category badge */}
                <div
                  className="absolute top-6 left-6 px-4 py-2 rounded-2xl text-sm font-semibold flex items-center gap-2 backdrop-blur-sm border border-white/20"
                  style={{
                    backgroundColor: `${experience.color}90`,
                    color: "#fff",
                  }}
                >
                  <experience.icon className="h-4 w-4" />
                  {experience.category}
                </div>

                {/* Rating overlay */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900 text-sm">{experience.rating}</span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-garage tracking-tight leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                  {experience.title}
                </h3>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(experience.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      {experience.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {experience.reviews} {t("popularExperiences.reviews")}
                  </span>
                </div>

                <Link to={experience?.path}>
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-5 rounded-3xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-500 font-garage tracking-wide text-base flex items-center justify-center group shadow-2xl hover:shadow-emerald-500/30">
                    <span className="font-semibold">{t("popularExperiences.discover")}</span>
                    <ArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-2 transition-all duration-300" />
                  </button>
                </Link>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-10 md:mt-16 px-2 md:px-0">
          <Link
            to="/visites-guidees"
            className="w-full md:w-auto group inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl hover:from-emerald-600 hover:to-teal-700 active:from-emerald-700 active:to-teal-800 transition-all duration-500 font-garage font-bold text-base md:text-lg shadow-2xl hover:shadow-emerald-500/30 min-h-[52px]"
          >
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 mr-3 md:mr-4 group-hover:rotate-12 transition-transform duration-300" />
            <span>{t("popularExperiences.viewAll")}</span>
            <ArrowRight className="h-5 w-5 md:h-6 md:w-6 ml-3 md:ml-4 transform group-hover:translate-x-2 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularExperiences;
