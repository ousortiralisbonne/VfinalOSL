// src/components/IntegrationSection.tsx

import React, { useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  Check,
  Sparkles,
  Send,
  Users,
  ArrowRight,
  Facebook,
  Instagram,
} from "lucide-react";
import { pixelEvents } from "../utils/analytics";
import { useTranslation } from "react-i18next";
import useResendForm from "../hooks/resend/useResendHomeForm";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import { useNewsletterSubscription } from "../hooks/useNewsletterSubscription";
import SubscribeNewsLetterCheckbox from "./SubscribeNewsLetterCheckbox";

const IntegrationSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const { subscribe, message, withSuccess } = useNewsletterSubscription();

  const { submitForm, loading } = useResendForm({
    onSuccess: () => {
      setShowSuccess(true);
      setErrorMessage("");
      setSubscribeToNewsletter(false);
    },
    onError: (error: any) => {
      setErrorMessage(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData?.email && subscribeToNewsletter) {
      await subscribe(formData?.email);
    }

    submitForm(formData);
    pixelEvents.contact();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50" id="integration-form">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Users className="h-4 w-4 mr-2" />
            {t("integrationSection.badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-garage tracking-tight">
            {t("integrationSection.titleStart")}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t("integrationSection.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("integrationSection.description1")}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-2xl border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-12 text-center leading-relaxed">
              {t("integrationSection.description2")}
            </p>

            {showSuccess ? (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 rounded-3xl p-12 text-center border border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-garage">{t("integrationSection.successTitle")}</h3>
                <p className="text-lg">{t("integrationSection.successMessage")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("firstname")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base md:text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("lastname")}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base md:text-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("integrationSection.form.email")}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base md:text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("integrationSection.form.phone")}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <PhoneInput
                        international
                        defaultCountry="FR"
                        value={formData.phone}
                        onChange={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            phone: value,
                          }))
                        }
                        className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base md:text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("integrationSection.form.company")}
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base md:text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("integrationSection.form.website")}
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base md:text-lg"
                        placeholder="https://"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("integrationSection.form.message")}
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base md:text-lg resize-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-8">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-6 h-6 rounded-lg border-2 ${
                        consent
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-gray-300 hover:border-emerald-500"
                      } flex items-center justify-center cursor-pointer transition-all duration-300`}
                      onClick={() => {
                        setConsent(!consent);
                      }}
                    >
                      {consent && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <label
                      className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                      onClick={() => setConsent(!consent)}
                    >
                      {t("membershipModal.consent.label")}{" "}
                      <Link
                        to="/cgv"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("membershipModal.consent.terms")}
                      </Link>{" "}
                      -{" "}
                      <Link
                        to="/politique-confidentialite"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("membershipModal.consent.privacy")}
                      </Link>
                      .
                    </label>
                  </div>
                </div>

                <SubscribeNewsLetterCheckbox
                  subscribeToNewsletter={subscribeToNewsletter}
                  setSubscribeToNewsletter={setSubscribeToNewsletter}
                />

                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 md:px-8 py-4 md:py-5 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-garage tracking-wide text-base md:text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                    !consent ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={loading || !consent}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("newsletter.loading")}
                    </div>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      {t("integrationSection.form.submit")}
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>

                {errorMessage && (
                  <div className="bg-red-50 text-red-800 rounded-2xl p-6 text-center border border-red-200">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-red-600 text-xl font-bold">!</span>
                    </div>
                    <p className="text-lg font-medium">{errorMessage}</p>
                  </div>
                )}
              </form>
            )}

            <div className="flex flex-col items-center mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200">
              <div className="inline-flex items-center bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <ArrowRight className="h-4 w-4 mr-2" />
                {t("integrationSection.followBadge")}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-garage text-center">
                {t("integrationSection.socialMedia")}
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                {t("integrationSection.socialDescription")}
              </p>

              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <a
                  href="https://www.instagram.com/sortiralisbonne/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-emerald-600 hover:text-emerald-700 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-transparent md:bg-gradient-to-r md:from-purple-500 md:to-pink-500 rounded-2xl flex items-center justify-center">
                    <Instagram className="h-6 w-6 text-emerald-600 md:text-white" />
                  </div>
                  <span className="font-semibold text-lg">@sortiralisbonne</span>
                </a>
                <a
                  href="https://www.facebook.com/ousortiralisbonne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-emerald-600 hover:text-emerald-700 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-transparent md:bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Facebook className="h-6 w-6 text-emerald-600 md:text-white" />
                  </div>
                  <span className="font-semibold text-lg">@ousortiralisbonne</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSection;
