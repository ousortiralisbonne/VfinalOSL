// src/components/BookingRestaurantModal.tsx

import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Calendar,
  Clock,
  Users,
  Mail,
  User,
  MessageSquare,
  UtensilsCrossed,
  ChevronRight,
  Check,
  Sparkles,
} from "lucide-react";
import { pixelEvents } from "../utils/analytics";
import { useResendBookingForm } from "../hooks/resend/useResendBookingForm";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr, pt } from "date-fns/locale";
import { useNewsletterSubscription } from "../hooks/useNewsletterSubscription";
import SubscribeNewsLetterCheckbox from "./SubscribeNewsLetterCheckbox";

interface BookingRestaurantModalProps {
  item: {
    id: string;
    name: string;
    type: string;
    image?: string;
    title?: string;
  } | null;
  source?: string;
  reservation: string;
  onClose: () => void;
}

const BookingRestaurantModal = ({
  item,
  reservation,
  onClose,
}: BookingRestaurantModalProps) => {
  const { t, i18n } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [consent, setConsent] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const lng = i18n.language;
  const locale = lng === "fr" ? fr : lng === "pt" ? pt : undefined;

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    timeSlot: "",
    guests: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    receiveMenu: "",
    privatizationInfo: "",
    reservationType: "",
    culinaryPreferences: "",
    specialRequests: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validDate, setValidDate] = useState(true);
  const { subscribe } = useNewsletterSubscription();

  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const { submitForm, loading } = useResendBookingForm({
    onSuccess: () => {
      setShowSuccess(true);
      setErrorMessage("");
      setSubscribeToNewsletter(false);
    },
    onError: (error: string) => {
      setErrorMessage(error);
    },
    reservation,
  });

  const closeModal = () => {
    onClose();
    setShowSuccess(false);
    setConsent(false);
    setShowDatePicker(false);
    setFormData({
      date: "",
      time: "",
      timeSlot: "",
      guests: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      receiveMenu: "",
      privatizationInfo: "",
      reservationType: "",
      culinaryPreferences: "",
      specialRequests: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData?.date || !formData.date) {
      setValidDate(false);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (formData?.email && subscribeToNewsletter) {
      await subscribe(formData?.email);
    }

    setSubscribeToNewsletter(false);

    submitForm(formData);
    pixelEvents.completeForm();

    if (item) {
      pixelEvents.completeBooking({
        id: item.id,
        type: item.type,
        name: item.name,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | undefined, field: string) => {
    if (date) {
      const formattedDate = date
        .toLocaleDateString("fr-FR")
        .split("/")
        .join("-");
      setFormData({
        ...formData,
        [field]: formattedDate,
      });
      setValidDate(true);
    }
  };

  if (!item) return null;

  // Composant pour les boutons radio stylisés Oui/Non
  const RadioButtonGroup = ({
    name,
    value,
    onChange,
    label,
  }: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    label: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange("Oui")}
          className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 min-h-[52px] ${
            value === "Oui"
              ? "border-[#37b7ab] bg-[#37b7ab]/10 text-[#37b7ab]"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {value === "Oui" && <Check className="w-4 h-4" />}
            {t("bookingModal.form.yes")}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onChange("Non")}
          className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 min-h-[52px] ${
            value === "Non"
              ? "border-[#37b7ab] bg-[#37b7ab]/10 text-[#37b7ab]"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {value === "Non" && <Check className="w-4 h-4" />}
            {t("bookingModal.form.no")}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] flex items-end md:items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full h-[95vh] md:h-auto md:rounded-2xl md:max-w-xl md:max-h-[90vh] overflow-hidden flex flex-col rounded-t-3xl md:rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec gradient */}
        <div className="relative bg-gradient-to-r from-[#2a2765] to-[#37b7ab] p-5 md:p-6">
          {/* Indicateur de drag pour mobile */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full md:hidden" />

          <div className="flex items-start gap-4 mt-2 md:mt-0">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0 pr-10">
              <h2 className="text-xl md:text-2xl font-bold text-white font-garage leading-tight">
                {t("bookingModal.reserve")}
              </h2>
              <p className="text-white/80 text-sm mt-1 truncate">
                {item?.name || item?.title}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Content avec scroll */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 md:p-6 safe-area-bottom">
            {showSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#2a2765] mb-3">
                  {t("bookingModal.success.title")}
                </h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  {t("bookingModal.success.message")}
                </p>
                <button
                  onClick={closeModal}
                  className="bg-gradient-to-r from-[#2f2d69] to-[#37b7ab] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  {t("bookingModal.close")}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Section: Date & Heure */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2a2765]">
                    <Calendar className="w-5 h-5" />
                    <h3 className="font-semibold">Date & Heure</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("bookingModal.form.date")} *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          onClick={() => setShowDatePicker(!showDatePicker)}
                          placeholder="Choisir une date"
                          className={`w-full px-4 py-3 pl-12 rounded-xl border-2 text-base transition-all duration-200 bg-gray-50 focus:bg-white focus:border-[#37b7ab] focus:ring-0 outline-none min-h-[52px] cursor-pointer ${
                            !validDate && !formData.date
                              ? "border-red-400 bg-red-50"
                              : "border-gray-200"
                          }`}
                          required
                          readOnly
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        {showDatePicker && (
                          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50" onClick={() => setShowDatePicker(false)}>
                            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl p-4">
                              <DayPicker
                                mode="single"
                                selected={
                                  formData.date ? new Date(formData.date) : undefined
                                }
                                onSelect={(date) => {
                                  handleDateChange(date, "date");
                                  setShowDatePicker(false);
                                }}
                                locale={locale}
                                disabled={{ before: new Date() }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Heure */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("bookingModal.form.time")} *
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 text-base transition-all duration-200 bg-gray-50 focus:bg-white focus:border-[#37b7ab] focus:ring-0 outline-none min-h-[52px]"
                          required
                        />
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Nombre de personnes */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("bookingModal.form.guests")} *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          min="1"
                          max="100"
                          placeholder="Nombre de personnes"
                          className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 text-base transition-all duration-200 bg-gray-50 focus:bg-white focus:border-[#37b7ab] focus:ring-0 outline-none min-h-[52px]"
                          required
                        />
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Section: Informations personnelles */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2a2765]">
                    <User className="w-5 h-5" />
                    <h3 className="font-semibold">Vos coordonnées</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Prénom */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("firstname")} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jean"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-base transition-all duration-200 bg-gray-50 focus:bg-white focus:border-[#37b7ab] focus:ring-0 outline-none min-h-[52px]"
                        required
                      />
                    </div>

                    {/* Nom */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("lastname")} *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Dupont"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-base transition-all duration-200 bg-gray-50 focus:bg-white focus:border-[#37b7ab] focus:ring-0 outline-none min-h-[52px]"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("bookingModal.form.email")} *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jean.dupont@email.com"
                          className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 text-base transition-all duration-200 bg-gray-50 focus:bg-white focus:border-[#37b7ab] focus:ring-0 outline-none min-h-[52px]"
                          required
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("bookingModal.form.phone")} *
                      </label>
                      <div className="phone-input-container">
                        <PhoneInput
                          international
                          defaultCountry="FR"
                          value={formData.phone}
                          onChange={(value) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              phone: value || "",
                            }))
                          }
                          className="phone-input-field"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Section: Options */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2a2765]">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-semibold">Options</h3>
                  </div>

                  <div className="space-y-4">
                    <RadioButtonGroup
                      name="receiveMenu"
                      value={formData.receiveMenu}
                      onChange={(value) => setFormData({ ...formData, receiveMenu: value })}
                      label={t("bookingModal.form.receivegroupmenu")}
                    />

                    <RadioButtonGroup
                      name="privatizationInfo"
                      value={formData.privatizationInfo}
                      onChange={(value) => setFormData({ ...formData, privatizationInfo: value })}
                      label={t("bookingModal.form.privatespace")}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Section: Message */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2a2765]">
                    <MessageSquare className="w-5 h-5" />
                    <h3 className="font-semibold">{t("bookingModal.form.additionalComments")}</h3>
                  </div>

                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Allergies, régimes alimentaires, occasion spéciale..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-base transition-all duration-200 bg-gray-50 focus:bg-white focus:border-[#37b7ab] focus:ring-0 outline-none resize-none"
                  />
                </div>

                {/* Section: Consentements */}
                <div className="space-y-4 bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setConsent(!consent)}
                      className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 ${
                        consent
                          ? "bg-[#37b7ab] border-[#37b7ab]"
                          : "border-gray-300 bg-white hover:border-[#37b7ab]"
                      }`}
                    >
                      {consent && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <label
                      className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                      onClick={() => setConsent(!consent)}
                    >
                      {t("membershipModal.consent.label")}{" "}
                      <Link
                        to="/cgv"
                        className="text-[#37b7ab] hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("membershipModal.consent.terms")}
                      </Link>{" "}
                      et{" "}
                      <Link
                        to="/politique-confidentialite"
                        className="text-[#37b7ab] hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("membershipModal.consent.privacy")}
                      </Link>
                    </label>
                  </div>

                  <SubscribeNewsLetterCheckbox
                    subscribeToNewsletter={subscribeToNewsletter}
                    setSubscribeToNewsletter={setSubscribeToNewsletter}
                  />
                </div>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  disabled={loading || !consent}
                  className={`w-full bg-gradient-to-r from-[#2f2d69] to-[#37b7ab] text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 min-h-[56px] shadow-lg ${
                    !consent
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t("bookingModal.form.submit")}</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-center text-sm">
                    {errorMessage}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRestaurantModal;
