import React, { useState } from "react";
import { Send, Mail, Sparkles, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNewsletterSubscription } from "../hooks/useNewsletterSubscription";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { subscribe, loading, message, withSuccess } =
    useNewsletterSubscription();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await subscribe(email);
    setEmail(""); // Clear input after submission
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Mail className="h-4 w-4 mr-2" />
            {t("newsletter.badge")}
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-garage tracking-tight">
            {t("newsletter.title")}
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("newsletter.description")}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                {t("newsletter.emailLabel", "Votre adresse email")}
              </label>
              <Mail className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder={t("newsletter.placeholder")}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 text-lg min-h-[48px]"
                required
                aria-describedby="newsletter-privacy"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-3 font-garage tracking-wide group shadow-lg hover:shadow-xl transform hover:scale-105 text-lg font-semibold"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("newsletter.loading")}
                </div>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  {t("newsletter.button")}
                  <Send className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-6 rounded-2xl text-lg font-medium flex items-center justify-center gap-3 ${
                withSuccess
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {withSuccess ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
              )}
              {message}
            </div>
          )}

          <div className="mt-8 text-sm text-gray-500" id="newsletter-privacy">
            <p>{t("newsletter.privacyNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
