import { Facebook, Instagram, Youtube, MessageCircle, Mail, Sparkles, Users, Heart } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNewsletterSubscription } from "../hooks/useNewsletterSubscription";

const CommunitySection = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const {
    subscribe,
    loading,
    message,
    withSuccess: success,
  } = useNewsletterSubscription();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await subscribe(email);
    setEmail("");
  };

  return (
    <div className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
            <Users className="h-4 w-4 mr-2" />
            {t("communitySection.badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-garage tracking-tight">
            {t("communitySection.titleStart")}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t("communitySection.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t("communitySection.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Newsletter Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white font-garage">
                {t("communitySection.newsletter.title")}
              </h3>
            </div>
            <p className="text-white/90 mb-8 text-lg leading-relaxed">
              {t("communitySection.newsletter.description")}
            </p>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("communitySection.newsletter.placeholder")}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-emerald-600 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-garage tracking-wide font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                {t("communitySection.newsletter.button")}
              </button>
            </form>
            {message && (
              <div
                className={`mt-6 p-4 rounded-2xl text-lg font-medium ${
                  success
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          {/* Community Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white font-garage">
                {t("communitySection.community.title")}
              </h3>
            </div>
            <p className="text-white/90 mb-8 text-lg leading-relaxed">
              {t("communitySection.community.description")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://www.facebook.com/ousortiralisbonne"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("communitySection.community.facebook")}
              >
                <div className="w-12 h-12 bg-blue-600 md:bg-blue-600 bg-transparent rounded-2xl flex items-center justify-center">
                  <Facebook className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{t("communitySection.community.facebook")}</p>
                  <p className="text-white/70 text-sm">{t("communitySection.community.facebookSubtitle")}</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/sortiralisbonne/"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("communitySection.community.instagram")}
              >
                <div className="w-12 h-12 bg-transparent md:bg-gradient-to-r md:from-purple-500 md:to-pink-500 rounded-2xl flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{t("communitySection.community.instagram")}</p>
                  <p className="text-white/70 text-sm">{t("communitySection.community.instagramSubtitle")}</p>
                </div>
              </a>
              <a
                href="https://chat.whatsapp.com/ByWcy4bKfAP7J3J9j8uLWN"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("communitySection.community.whatsapp")}
              >
                <div className="w-12 h-12 bg-green-600 md:bg-green-600 bg-transparent rounded-2xl flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{t("communitySection.community.whatsapp")}</p>
                  <p className="text-white/70 text-sm">{t("communitySection.community.whatsappSubtitle")}</p>
                </div>
              </a>
              <a
                href="https://www.youtube.com/@ousortiralisbonne"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("communitySection.community.youtube")}
              >
                <div className="w-12 h-12 bg-red-600 md:bg-red-600 bg-transparent rounded-2xl flex items-center justify-center">
                  <Youtube className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{t("communitySection.community.youtube")}</p>
                  <p className="text-white/70 text-sm">{t("communitySection.community.youtubeSubtitle")}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-8 left-8 w-4 h-4 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-8 right-12 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-500" />
      </div>
    </div>
  );
};

export default CommunitySection;
