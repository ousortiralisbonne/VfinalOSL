// src/components/VideoSection.tsx
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Play, ExternalLink, Star } from "lucide-react";

const VideoSection = () => {
  const { t, i18n } = useTranslation();

  const getDescriptionByLanguage = () => {
    if (i18n.language.includes("fr")) {
      return (
        <div>
          Nous passons l'actualité et la ville au peigne fin pour dénicher les
          meilleures{" "}
          <Link
            className="text-[#ea3e4e] hover:underline"
            to="/visites-guidees"
          >
            activités
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/bars">
            bars
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/events">
            événements
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/explore-more">
            lieux culturels
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/hotels">
            hôtels
          </Link>
          , insolites et{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/restaurants">
            restaurants
          </Link>{" "}
          de la ville et sa région.
        </div>
      );
    } else if (i18n.language.includes("pt")) {
      return (
        <div>
          Nós passamos a actualidade e a cidade ao peneireiro para descobrir as
          melhores{" "}
          <Link
            className="text-[#ea3e4e] hover:underline"
            to="/visites-guidees"
          >
            actividades
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/bars">
            bares
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/events">
            eventos
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/explore-more">
            locais culturais
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/hotels">
            hotéis
          </Link>
          , pontos únicos e{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/restaurants">
            restaurantes
          </Link>{" "}
          da cidade e da sua região.
        </div>
      );
    } else {
      return (
        <div>
          We scour the news and the city to uncover the best{" "}
          <Link
            className="text-[#ea3e4e] hover:underline"
            to="/visites-guidees"
          >
            activities
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/bars">
            bars
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/events">
            events
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/explore-more">
            cultural sites
          </Link>
          ,{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/hotels">
            hotels
          </Link>
          , unique spots, and{" "}
          <Link className="text-[#ea3e4e] hover:underline" to="/restaurants">
            restaurants
          </Link>{" "}
          in the city and its region.
        </div>
      );
    }
  };

  const description1 = getDescriptionByLanguage();

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Play className="h-4 w-4 mr-2" />
            {t("videoSection.badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-garage tracking-tight">
            {t("videoSection.titleStart")}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t("videoSection.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("videoSection.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video Container */}
          <div className="relative group">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-500">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/s0y_ol0uG4M"
                title={t("videoTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">{description1}</p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("videoSection.description2")}
                <a
                  href="https://www.instagram.com/sortiralisbonne/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                  Instagram
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
                {t("videoSection.description3")}
                <a
                  href="https://chat.whatsapp.com/ByWcy4bKfAP7J3J9j8uLWN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                  WhatsApp
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
                {t("videoSection.description4")}
                <a
                  href="https://www.facebook.com/ousortiralisbonne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                  Facebook
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
                .
              </p>
            </div>

            {/* Trustpilot Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">4.9</span>
                    <span className="text-gray-500 text-sm">/5</span>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{t("videoSection.trustpilot")}</p>
                </div>
                <a
                  href="https://www.trustpilot.com/review/ousortiralisbonne.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="mr-2">{t("videoSection.trustpilotButton")}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
