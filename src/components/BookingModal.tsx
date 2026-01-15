// src/components/BookingModal.tsx

import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Calendar,
  Clock,
  Users,
  Mail,
  ChevronRight,
  Check,
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
import { languageOptions } from "../utils/languageOptions";

interface BookingModalProps {
  item: {
    id: string;
    name: string;
    type: string;
    image?: string;
    title?: string;
  } | null;
  source?: string;
  reservation: string;
  fromSetubal?: boolean;
  onClose: () => void;
}

const BookingModal = ({
  item,
  source = "",
  reservation,
  onClose,
  fromSetubal,
}: BookingModalProps) => {
  const { t, i18n } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [consent, setConsent] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [withBoardNight, setWithBoardNight] = useState(false);
  const [showSecondDatePicker, setShowSecondDatePicker] = useState(false);
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
    language: "",
    withBoardNight: false,
    source,
    secondDate: "",
    withEquipage: "",
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
    setWithBoardNight(false);
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
      language: "",
      withBoardNight: false,
      source,
      secondDate: "",
      withEquipage: "",
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
      await subscribe(
        formData?.email,
        formData.name,
        formData.lastName,
        formData.phone
      );
    }

    submitForm({ ...formData, withBoardNight, source, fromSetubal });
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
      withBoardNight,
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
    }
  };

  if (!item) return null;

  const sunsetCruiseOptions = [
    {
      title: t("bookingModal.sunsetCruise.calm"),
      options: [
        {
          label: t("bookingModal.sunsetCruise.sailboat"),
          url: "https://fareharbor.com/embeds/book/marlintours/items/323413/calendar/2025/03/?asn=ousortiralisbonne&asn-ref=ousortiralisbonne-asn&full-items=yes&ref=ousortiralisbonne-asn&flow=1138192",
        },
        {
          label: t("bookingModal.sunsetCruise.catamaran18"),
          url: "https://fareharbor.com/embeds/book/marlintours/items/323418/calendar/2025/03/?asn=ousortiralisbonne&asn-ref=ousortiralisbonne-asn&full-items=yes&ref=ousortiralisbonne-asn&flow=1138192",
        },
        {
          label: t("bookingModal.sunsetCruise.yacht"),
          url: "https://fareharbor.com/embeds/book/marlintours/items/323418/calendar/2025/03/?asn=ousortiralisbonne&asn-ref=ousortiralisbonne-asn&full-items=yes&ref=ousortiralisbonne-asn&flow=1138192",
        },
      ],
    },
    {
      title: t("bookingModal.sunsetCruise.festive"),
      options: [
        {
          label: t("bookingModal.sunsetCruise.catamaran60"),
          url: "https://fareharbor.com/embeds/book/sardinhadotejo/items/157102/calendar/2025/03/?asn=taniabarros-eur&asn-ref=taniabarros-asn&full-items=yes&ref=taniabarros-asn&flow=199048",
        },
        {
          label: t("bookingModal.sunsetCruise.motorboat"),
          url: "https://fareharbor.com/embeds/book/sardinhadotejo/items/477813/calendar/2025/03/?asn=taniabarros-eur&asn-ref=taniabarros-asn&full-items=yes&ref=taniabarros-asn&flow=199048",
        },
      ],
    },
    {
      title: t("bookingModal.sunsetCruise.boatParty"),
      options: [
        {
          label: t("bookingModal.sunsetCruise.boatPartyLink"),
          url: "https://fareharbor.com/embeds/book/sardinhadotejo/items/380911/calendar/2025/05/?asn=taniabarros-eur&asn-ref=taniabarros-asn&full-items=yes&ref=taniabarros-asn&flow=199048",
        },
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-2 md:p-4 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-xl max-w-4xl w-full my-4 shadow-2xl max-h-[96vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 relative px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-[#2a2765] to-[#37b7ab]">
          <h2 className="text-lg md:text-xl font-bold text-white font-garage pr-12 leading-tight">
            {t("bookingModal.reserve")}
          </h2>
          <p className="text-white/90 text-xs md:text-sm mt-1 pr-12">
            {item?.name || item?.title}
          </p>
          <button
            onClick={closeModal}
            className="absolute top-1/2 -translate-y-1/2 right-2 p-2.5 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 safe-area-bottom">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2a2765] mb-2">
                {t("bookingModal.success.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("bookingModal.success.message")}
              </p>
              <button
                onClick={closeModal}
                className="bg-[#2f2d69] text-white px-6 py-2 rounded-full hover:bg-[#252157] transition"
              >
                {t("bookingModal.close")}
              </button>
            </div>
          ) : source === "sunset-cruise" ? (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#2a2765]">
                {t("bookingModal.sunsetCruise.title")}
              </h3>
              <p className="text-gray-600">
                {t("bookingModal.sunsetCruise.description")}
              </p>
              {sunsetCruiseOptions.map(
                (section, index) =>
                  index !== 2 && (
                    <div key={index} className="space-y-4">
                      <h4 className="text-lg font-bold text-[#2a2765]">
                        {section.title}
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {section.options.map((option, optionIndex) => (
                          <li key={optionIndex} className="flex items-center">
                            <a
                              href={option.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline flex items-center"
                            >
                              <span className="mr-2">{option.label}</span>
                              <ChevronRight className="h-4 w-4" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              {/* Section: Date et Heure */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-[#2a2765] mb-2 uppercase tracking-wide">
                  📅 Date & Heure
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("bookingModal.form.date")} *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="w-full px-3 py-2 pl-[38px] text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white"
                        required
                        readOnly
                        style={
                          !validDate && !formData.date
                            ? { border: "1px solid #ef4444" }
                            : {}
                        }
                      />
                      <div className="absolute left-3 top-[9px] text-gray-400 cursor-pointer">
                        <Calendar
                          size={16}
                          onClick={() => setShowDatePicker(!showDatePicker)}
                        />
                      </div>
                      {showDatePicker && (
                        <DayPicker
                          mode="single"
                          selected={
                            formData.date ? new Date(formData.date) : undefined
                          }
                          onSelect={(date) => {
                            handleDateChange(date, "date");
                            setShowDatePicker(false);
                          }}
                          className="absolute z-[9999] mt-1 bg-white shadow-xl rounded-lg border border-gray-200"
                          locale={locale}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("bookingModal.form.time")} *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white"
                        required
                      />
                    </div>
                  </div>

                  {source === "boatTrip" && (
                    <div className="md:col-span-2 relative">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("bookingModal.form.timeSlot")} *
                      </label>
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="w-full px-3 py-3 min-h-[48px] text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white cursor-pointer"
                        required
                        style={{ WebkitAppearance: 'menulist-button' }}
                      >
                        <option value="" disabled>
                          {t("bookingModal.form.selectTimeSlot")}
                        </option>
                        <option value="11:30 - 13:30">
                          {t("bookingModal.form.morning")}
                        </option>
                        <option value="15:30 - 17:30">
                          {t("bookingModal.form.afternoon")}
                        </option>
                      </select>
                    </div>
                  )}

                  <div className={source === "boatTrip" ? "md:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("bookingModal.form.guests")} *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        min="1"
                        className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Informations personnelles */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-[#2a2765] mb-2 uppercase tracking-wide">
                  👤 Informations personnelles
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("firstname")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("lastname")} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("bookingModal.form.email")} *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("bookingModal.form.phone")} *
                    </label>
                    <div className="relative phone-input-container">
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
                        required
                      />
                    </div>
                  </div>

                  {source === "guidedTour" && (
                    <div className="md:col-span-2 relative">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("language")} *
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-3 py-3 min-h-[48px] text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white cursor-pointer"
                        required
                        style={{ WebkitAppearance: 'menulist-button' }}
                      >
                        <option value="" disabled></option>
                        {languageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {t(option.label)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Section: Options supplémentaires */}
              {(fromSetubal || source === "sunset-cruise" || source === "romantic" || source === "boatTrip") && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-xs font-semibold text-[#2a2765] mb-2 uppercase tracking-wide">
                    ⚙️ Options supplémentaires
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {fromSetubal && (
                      <div className="relative">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {t("withequipage")} *
                        </label>
                        <select
                          name="withEquipage"
                          value={formData.withEquipage}
                          onChange={handleChange}
                          className="w-full px-3 py-3 min-h-[48px] text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white cursor-pointer"
                          required
                          style={{ WebkitAppearance: 'menulist-button' }}
                        >
                          <option value="">
                            {t("bookingModal.form.selectOption")}
                          </option>
                          <option value="yes">{t("bookingModal.form.yes")}</option>
                          <option value="no">{t("bookingModal.form.no")}</option>
                        </select>
                      </div>
                    )}

                    {(source === "sunset-cruise" ||
                      source === "romantic" ||
                      source === "boatTrip") && (
                      <div className={fromSetubal ? "" : "md:col-span-2"}>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {t("otherDate")}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="secondDate"
                            value={formData.secondDate}
                            onChange={handleChange}
                            onClick={() =>
                              setShowSecondDatePicker(!showSecondDatePicker)
                            }
                            className="w-full px-3 py-2 pl-[38px] text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white"
                            readOnly
                          />
                          <div className="absolute left-3 top-[9px] text-gray-400 cursor-pointer">
                            <Calendar
                              size={16}
                              onClick={() =>
                                setShowSecondDatePicker(!showSecondDatePicker)
                              }
                            />
                          </div>
                          {showSecondDatePicker && (
                            <DayPicker
                              mode="single"
                              selected={
                                formData.secondDate
                                  ? new Date(formData.secondDate)
                                  : undefined
                              }
                              onSelect={(date) => {
                                handleDateChange(date, "secondDate");
                                setShowSecondDatePicker(false);
                              }}
                              className="absolute z-[9999] mt-1 bg-white shadow-xl rounded-lg border border-gray-200"
                              locale={locale}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Section: Message */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-xs font-semibold text-[#2a2765] mb-2 uppercase tracking-wide">
                  💬 Message
                </h3>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white resize-none"
                  placeholder="Informations complémentaires..."
                />
              </div>

              {/* Section: Options romantiques */}
              {source === "romantic" && (
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-2.5 rounded-lg border border-pink-200">
                  <div className="flex items-start space-x-2">
                    <div
                      className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 ${
                        withBoardNight
                          ? "bg-[#37b7ab] border-[#37b7ab]"
                          : "border-gray-300 hover:border-[#37b7ab] bg-white"
                      } flex items-center justify-center cursor-pointer transition-all`}
                      onClick={() => {
                        setWithBoardNight((prevState) => !prevState);
                      }}
                    >
                      {withBoardNight && (
                        <Check className="h-3.5 w-3.5 text-white" />
                      )}
                    </div>
                    <label
                      className="text-xs text-gray-700 cursor-pointer font-medium leading-snug"
                      onClick={() => setWithBoardNight((prevState) => !prevState)}
                    >
                      {t("romanticinclusion")}
                    </label>
                  </div>
                </div>
              )}

              {/* Section: Consentements */}
              <div className="space-y-2.5">
                <div className="flex items-start space-x-2">
                  <div
                    className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 ${
                      consent
                        ? "bg-[#37b7ab] border-[#37b7ab]"
                        : "border-gray-300 hover:border-[#37b7ab] bg-white"
                    } flex items-center justify-center cursor-pointer transition-all`}
                    onClick={() => setConsent(!consent)}
                  >
                    {consent && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>
                  <label
                    className="text-xs text-gray-700 cursor-pointer leading-snug"
                    onClick={() => setConsent(!consent)}
                  >
                    {t("membershipModal.consent.label")}{" "}
                    <Link
                      to="/cgv"
                      className="text-[#37b7ab] hover:text-[#2d9d93] font-medium underline underline-offset-2 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("membershipModal.consent.terms")}
                    </Link>{" "}
                    -{" "}
                    <Link
                      to="/politique-confidentialite"
                      className="text-[#37b7ab] hover:text-[#2d9d93] font-medium underline underline-offset-2 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("membershipModal.consent.privacy")}
                    </Link>
                    .
                  </label>
                </div>

                <SubscribeNewsLetterCheckbox
                  subscribeToNewsletter={subscribeToNewsletter}
                  setSubscribeToNewsletter={setSubscribeToNewsletter}
                />
              </div>

              {/* Bouton de soumission */}
              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-[#2f2d69] to-[#37b7ab] text-white px-5 py-4 rounded-xl hover:shadow-lg active:scale-[0.99] transition-all duration-300 font-garage tracking-wide text-base flex items-center justify-center group min-h-[52px] ${
                    !consent ? "cursor-not-allowed opacity-60" : ""
                  }`}
                  disabled={loading || !consent}
                >
                  <span className="font-semibold">
                    {loading ? "Envoi en cours..." : t("bookingModal.form.submit")}
                  </span>
                  {!loading && (
                    <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 rounded-lg p-3">
                  <p className="font-medium text-sm">Erreur</p>
                  <p className="text-xs mt-1">{errorMessage}</p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
