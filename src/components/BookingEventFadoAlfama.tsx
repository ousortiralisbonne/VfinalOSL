// src/components/BookingEventFadoAlfama.tsx

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
  onClose: () => void;
}

const BookingEventFadoAlfama = ({
  item,
  reservation,
  onClose,
}: BookingModalProps) => {
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
    dinnerIncluded: "",
    dietaryRestrictions: "",
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
      dinnerIncluded: "",
      dietaryRestrictions: "",
      specialRequests: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.date) {
      setValidDate(false);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (formData?.email && subscribeToNewsletter) {
      await subscribe(formData?.email);
    }

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
    }
  };

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-0 md:p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2a2765] font-garage pr-8">
            {t("bookingModal.reserve")} - {item?.name || item?.title}
          </h2>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
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
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.date")} *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="w-full px-4 py-2 pl-[45px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      required
                      readOnly
                      style={
                        !validDate && !formData.date
                          ? { border: "1px solid #ef4444" }
                          : {}
                      }
                    />
                    <div className="absolute left-4 top-[10px] text-gray-400 cursor-pointer">
                      <Calendar
                        size={20}
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
                        className="absolute z-10 mt-2"
                        required
                        locale={locale}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.time")} *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.guests")} *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      min="1"
                      className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("firstname")} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("lastname")} *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.email")} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.dinnerIncluded")} *
                  </label>
                  <select
                    name="dinnerIncluded"
                    value={formData.dinnerIncluded}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  >
                    <option value="">
                      {t("bookingModal.form.selectOption")}
                    </option>
                    <option value="yes">{t("bookingModal.form.yes")}</option>
                    <option value="no">{t("bookingModal.form.no")}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.dietaryRestrictions")}
                </label>
                <input
                  type="text"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.specialRequests")}
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                  placeholder={t(
                    "bookingModal.form.specialRequestsPlaceholder"
                  )}
                />
              </div>

              <div className="mt-8">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-5 h-5 rounded border ${
                      consent
                        ? "bg-[#37b7ab] border-[#37b7ab]"
                        : "border-gray-300 hover:border-[#37b7ab]"
                    } flex items-center justify-center cursor-pointer transition-colors`}
                    onClick={() => {
                      setConsent(!consent);
                    }}
                  >
                    {consent && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <label
                    className="text-sm text-gray-600 cursor-pointer"
                    onClick={() => setConsent(!consent)}
                  >
                    {t("membershipModal.consent.label")}{" "}
                    <Link
                      to="/cgv"
                      className="text-[#37b7ab] hover:text-[#2d9d93] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("membershipModal.consent.terms")}
                    </Link>{" "}
                    -{" "}
                    <Link
                      to="/politique-confidentialite"
                      className="text-[#37b7ab] hover:text-[#2d9d93] transition-colors"
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
                className={`w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group ${
                  !consent ? "cursor-not-allowed" : ""
                }`}
                disabled={loading || !consent}
              >
                <span>{loading ? "..." : t("bookingModal.form.submit")}</span>
                {!loading && (
                  <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              {errorMessage && (
                <div className="bg-red-50 text-red-800 rounded-lg p-6 text-center">
                  {errorMessage}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingEventFadoAlfama;
