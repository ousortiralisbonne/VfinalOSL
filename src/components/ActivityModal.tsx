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

interface ActivityDetails {
  address?: string;
  hours?: string;
  price?: string;
  contact?: string;
  highlights?: string[];
}

interface ActivityItem {
  id: string;
  name: string;
  type?: string;
  description?: string;
  image: string;
  details?: ActivityDetails;
}

interface ActivityModalProps {
  item: ActivityItem | null;
  onClose: () => void;
}

interface ActivityFormData {
  date: string;
  secondDate: string;
  time: string;
  timeSlot: string;
  guests: string;
  name: string;
  lastName: string;
  email: string;
  phone: string | undefined;
  message: string;
}

const ActivityModal = ({ item, onClose }: ActivityModalProps) => {
  const { t, i18n } = useTranslation();
  const [consent, setConsent] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSecondDatePicker, setShowSecondDatePicker] = useState(false);
  const lng = i18n.language;
  const locale = lng === "fr" ? fr : lng === "pt" ? pt : undefined;
  const [validDate, setValidDate] = useState(true);
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const { subscribe } = useNewsletterSubscription();

  const [formData, setFormData] = useState<ActivityFormData>({
    date: "",
    secondDate: "",
    time: "",
    timeSlot: "",
    guests: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { submitForm, loading } = useResendBookingForm({
    onSuccess: () => {
      setShowSuccess(true);
      setErrorMessage("");
      setSubscribeToNewsletter(false);
    },
    onError: (error: string) => {
      setErrorMessage(error);
    },
    reservation: item?.name ?? "",
  });
  const closeModal = () => {
    onClose();
    setShowSuccess(false);
    setConsent(false);
    setShowDatePicker(false);
    setShowSecondDatePicker(false);
    setFormData({
      date: "",
      secondDate: "",
      time: "",
      timeSlot: "",
      guests: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
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
      onClick={onClose}
    >
      <div
        className="bg-white w-full h-full md:h-auto md:rounded-xl md:max-w-4xl md:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header sticky avec bouton close */}
        <div className="sticky top-0 z-20 bg-white md:bg-transparent">
          <div className="relative h-40 md:h-72">
            <img
              src={item.image}
              alt={`${item.name} - Activité à Lisbonne`}
              loading="lazy"
              width="800"
              height="288"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent md:from-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white active:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Fermer"
            >
              <X className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2a2765] mb-3 md:mb-4 font-garage">
            {item.name}
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
            {item.description}
          </p>

          {item.details && (
            <div className="space-y-4">
              {item.details.address && (
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-2">{t("activityModal.address")}</h3>
                  <p className="text-gray-600">{item.details.address}</p>
                </div>
              )}

              {item.details.hours && (
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-2">
                    {t("activityModal.hours")}
                  </h3>
                  <p className="text-gray-600">{item.details.hours}</p>
                </div>
              )}

              {item.details.price && (
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-2">{t("activityModal.price")}</h3>
                  <p className="text-gray-600">{item.details.price}</p>
                </div>
              )}

              {item.details.contact && (
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-2">{t("activityModal.contact")}</h3>
                  <p className="text-gray-600">{item.details.contact}</p>
                </div>
              )}

              {item.details.highlights && (
                <div>
                  <h3 className="font-semibold text-[#2a2765] mb-2">
                    {t("activityModal.highlights")}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {item.details.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        {/** FORM CONTENT */}
        <div className="p-4 md:p-6 safe-area-bottom">
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6" id="form">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
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
                      className="w-full px-4 py-3 pl-12 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition min-h-[48px]"
                      required
                      readOnly
                      style={
                        !validDate && !formData.date
                          ? { border: "1px solid #ef4444" }
                          : {}
                      }
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
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
                        className="absolute z-[9999] mt-2 bg-white shadow-xl rounded-lg border border-gray-200"
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
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition min-h-[48px]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.guests")} *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      min="1"
                      className="w-full pl-12 pr-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition min-h-[48px]"
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
                    className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition min-h-[48px]"
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
                    className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition min-h-[48px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.email")} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition min-h-[48px]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
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
                      className="w-full px-4 py-3 pl-12 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition min-h-[48px]"
                      readOnly
                      style={
                        !validSecondDate && !formData.secondDate
                          ? { border: "1px solid #ef4444" }
                          : {}
                      }
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                      <Calendar
                        size={20}
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
                        className="absolute z-[9999] mt-2 bg-white shadow-xl rounded-lg border border-gray-200"
                        locale={locale}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition resize-none"
                />
              </div>

              {/* Consent checkbox with proper touch target */}
              <div className="mt-6 md:mt-8">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-6 h-6 rounded border-2 flex-shrink-0 ${
                      consent
                        ? "bg-[#37b7ab] border-[#37b7ab]"
                        : "border-gray-300 hover:border-[#37b7ab]"
                    } flex items-center justify-center cursor-pointer transition-colors min-w-[24px] min-h-[24px]`}
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
                      className="text-[#37b7ab] hover:text-[#2d9d93] transition-colors underline underline-offset-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("membershipModal.consent.terms")}
                    </Link>{" "}
                    -{" "}
                    <Link
                      to="/politique-confidentialite"
                      className="text-[#37b7ab] hover:text-[#2d9d93] transition-colors underline underline-offset-2"
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
                className={`w-full bg-[#2f2d69] text-white px-6 py-4 rounded-full hover:bg-[#252157] active:bg-[#1e1a47] transition font-garage tracking-wide text-base flex items-center justify-center group min-h-[52px] ${
                  !consent ? "cursor-not-allowed opacity-60" : ""
                }`}
                disabled={loading || !consent}
              >
                <span className="font-semibold">{loading ? "Envoi..." : t("bookingModal.form.submit")}</span>
                {!loading && (
                  <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              {errorMessage && (
                <div className="bg-red-50 text-red-800 rounded-lg p-6 text-center">
                  {errorMessage}
                </div>
              )}
            </form>
          )}{" "}
          {/* End of form */}
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
