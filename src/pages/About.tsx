import React from "react";
import { Mail, Phone, MapPin, Heart, Star, Users, Award, Sparkles, Globe, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import personalImage from "../images/newpics/about-personal-image.jpg";
import portugalFlag from "../images/newpics/about-portugal-flag.jpg";
import SanityImage from "../components/SanityImage";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";

const About = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('about', i18n.language);

  // Stats data
  const stats = [
    { icon: Users, value: "1000+", label: t("about.stats.happyClients") || "Clients satisfaits" },
    { icon: Star, value: "4.9/5", label: t("about.stats.rating") || "Note moyenne" },
    { icon: Award, value: "5+", label: t("about.stats.yearsExperience") || "Ans d'expérience" },
    { icon: Globe, value: "3", label: t("about.stats.languages") || "Langues parlées" },
  ];

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <main id="main-content">
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section - Modern & Eye-catching */}
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt={t("about.images.historicalQuarters")}
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-white/20">
              <Heart className="h-4 w-4 mr-2 text-emerald-400" />
              <span>{t("about.hero.badge") || "Notre Histoire"}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-garage text-white leading-tight">
              À{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Propos
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Bienvenue sur 'Où sortir à{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Lisbonne
              </span>
              ' !
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-20 z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-garage">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Introduction */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            {t("about.content.introLabel") || "Qui sommes-nous"}
          </div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {t("about.content.intro")}
          </p>
        </div>

        {/* Section 1 - Personal Story with Image */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                <SanityImage
                  imageId="about-personal"
                  fallbackSrc={personalImage}
                  alt="Tania - Fondatrice"
                  className="w-full h-auto"
                />
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-400 rounded-full opacity-20 blur-2xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-400 rounded-full opacity-20 blur-2xl" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Heart className="h-4 w-4 mr-2" />
                {t("about.content.section1.badge") || "Notre Passion"}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-garage leading-tight">
                De la France au{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Portugal
                </span>
                {" "}: un retour aux racines
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>{t("about.content.section1.text1")}</p>
                <p>{t("about.content.section1.text2")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 - Mission */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-white text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                  <Globe className="h-4 w-4 mr-2" />
                  {t("about.content.section2.badge") || "Notre Mission"}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-garage">
                  Une double casquette : communication et{" "}
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    tourisme
                  </span>
                </h2>
              </div>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>{t("about.content.section2.text1")}</p>
                <p>{t("about.content.section2.text2")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 - Services with List */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="h-4 w-4 mr-2" />
              {t("about.content.section3.badge") || "Nos Services"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-garage">
              'Où sortir à{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Lisbonne
              </span>
              ' : votre guide personnalisé
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about.content.section3.text1")}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {(
              t("about.content.section3.list", { returnObjects: true }) as any
            ).map(
              (
                item: string,
                index: number
              ) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                  </div>
                </div>
              )
            )}
          </div>

          <p className="text-lg text-gray-600 text-center leading-relaxed max-w-3xl mx-auto">
            {t("about.content.section3.text2")}
          </p>
        </div>

        {/* Section 4 - Portugal with Flag */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                {t("about.content.section4.badge") || "Notre Terre"}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-garage leading-tight">
                Plus qu'un simple guide, une expérience{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  humaine
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("about.content.section4.text")}
              </p>
            </div>
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src={portugalFlag}
                  alt="Drapeau du Portugal - Où Sortir à Lisbonne"
                  loading="lazy"
                  width="600"
                  height="400"
                  className="w-full h-auto"
                />
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-400 rounded-full opacity-20 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400 rounded-full opacity-20 blur-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section - Premium Design */}
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 md:p-12 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }} />
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                <Clock className="h-4 w-4 mr-2" />
                {t("about.content.contact.badge") || "Contactez-nous"}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-garage">
                Envie de découvrir{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Lisbonne
                </span>
                {" "}autrement ?
              </h3>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {t("about.content.contact.text")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:contact@ousortiralisbonne.com"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <Mail className="h-5 w-5 mr-3 text-emerald-600" />
                  <span>{t("about.content.contact.email")}</span>
                </a>
                <a
                  href="tel:+351966998827"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{t("about.content.contact.phone")}</span>
                </a>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-4 h-4 bg-white/20 rounded-full animate-pulse" />
            <div className="absolute bottom-8 right-12 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-500" />
          </div>
        </div>
        </div>
      </div>
      </main>
    </>
  );
};

export default About;
