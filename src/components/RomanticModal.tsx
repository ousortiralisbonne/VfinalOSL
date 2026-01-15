import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X, Calendar, Mail, ChevronRight, Check } from "lucide-react";
import { pixelEvents } from "../utils/analytics";
import { useResendRomanticForm } from "../hooks/resend/useResendRomanticForm";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr, pt } from "date-fns/locale";
import { useNewsletterSubscription } from "../hooks/useNewsletterSubscription";
import SubscribeNewsLetterCheckbox from "./SubscribeNewsLetterCheckbox";

interface RomanticModalProps {
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

const RomanticModal = ({
  item,
  source = "",
  reservation,
  onClose,
  fromSetubal,
}: RomanticModalProps) => {
  const { t, i18n } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [consent, setConsent] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSecondDatePicker, setShowSecondDatePicker] = useState(false);
  const lng = i18n.language;
  const locale = lng === "fr" ? fr : lng === "pt" ? pt : undefined;

  const [formData, setFormData] = useState({
    date: "",
    secondDate: "",
    timeSlot: "",
    boatOptions: [],
    nightOnBoard: false,
    name: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequest: "",
    promoCode: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validDate, setValidDate] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { subscribe, message, withSuccess } = useNewsletterSubscription();

  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const { submitForm, loading } = useResendRomanticForm({
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
    setFormSubmitted(false);
    setFormData({
      date: "",
      secondDate: "",
      timeSlot: "",
      boatOptions: [],
      nightOnBoard: false,
      name: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequest: "",
      promoCode: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      !formData.date ||
      !formData.phone ||
      !formData.name ||
      !formData.lastName ||
      !formData.email
    ) {
      setValidDate(false);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (formData.email && subscribeToNewsletter) {
      await subscribe(
        formData.email,
        formData.name,
        formData.lastName,
        formData.phone
      );
    }

    submitForm({ ...formData, source, fromSetubal });
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
    const { name, value } = e.target;
    setFormSubmitted(false);

    const keys = name.split(".");

    if (keys.length === 2) {
      const [parent, child] = keys;
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setFormData((prevData) => {
      const currentValues = prevData[
        field as keyof typeof prevData
      ] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prevData,
          [field]: currentValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prevData,
          [field]: [...currentValues, value],
        };
      }
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

  const timeSlotOptions = [
    { value: "10h-12h", label: t("bookingModal.timeSlot.10h-12h") },
    { value: "12h30-14h30", label: t("bookingModal.timeSlot.12h30-14h30") },
    { value: "15h-17h", label: t("bookingModal.timeSlot.15h-17h") },
    {
      value: "Coucher de soleil",
      label:
        lng === "fr"
          ? "Coucher de soleil"
          : lng === "pt"
          ? "Pôr do sol"
          : "Sunset",
    },
  ];

  const boatOptions = [
    {
      value: t("bookingModal.boatOptions.voilier6", { lng: "fr" }),
      label: t("bookingModal.boatOptions.voilier6"),
      price: 170,
    },
    {
      value: t("bookingModal.boatOptions.catamaran8", { lng: "fr" }),
      label: t("bookingModal.boatOptions.catamaran8"),
      price: 180,
    },
    {
      value: t("bookingModal.boatOptions.voilier10", { lng: "fr" }),
      label: t("bookingModal.boatOptions.voilier10"),
      price: 300,
    },
    {
      value: t("bookingModal.boatOptions.catamaran18", { lng: "fr" }),
      label: t("bookingModal.boatOptions.catamaran18"),
      price: 650,
    },
  ];

  const calculateTotalPrice = () => {
    const boatPrice = formData.boatOptions.reduce((total, value) => {
      const option = boatOptions.find((opt) => opt.value === value);
      return total + (option ? option.price : 0);
    }, 0);

    const sunsetPrice = formData.timeSlot === "Coucher de soleil" ? 30 : 0;
    const nightOnBoardPrice = formData.nightOnBoard ? 575 : 0;

    return boatPrice + sunsetPrice + nightOnBoardPrice;
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-0 md:p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full h-full md:h-auto md:rounded-2xl md:max-w-2xl md:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 relative p-4 md:p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl md:text-2xl font-bold text-[#2a2765] font-garage pr-12">
            {t("bookingModal.reserve")} - {item?.name || item?.title}
          </h2>
          <button
            onClick={closeModal}
            className="absolute top-1/2 -translate-y-1/2 right-3 p-2.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fermer"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Dates */}
              <div className="grid gap-6 md:grid-cols-2">
                {["date", "secondDate"].map((field, i) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t(`bookingModal.form.${field}`)} {field === "date" && "*"}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onClick={() =>
                          field === "date"
                            ? setShowDatePicker(!showDatePicker)
                            : setShowSecondDatePicker(!showSecondDatePicker)
                        }
                        className="w-full px-4 py-2 pl-[45px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                        readOnly
                        style={
                          !validDate && field === "date" && !formData.date
                            ? { border: "1px solid #ef4444" }
                            : {}
                        }
                      />
                      <div className="absolute left-4 top-[10px] text-gray-400 cursor-pointer">
                        <Calendar
                          size={20}
                          onClick={() =>
                            field === "date"
                              ? setShowDatePicker(!showDatePicker)
                              : setShowSecondDatePicker(!showSecondDatePicker)
                          }
                        />
                      </div>
                      {(field === "date"
                        ? showDatePicker
                        : showSecondDatePicker) && (
                        <DayPicker
                          mode="single"
                          selected={
                            formData[field]
                              ? new Date(formData[field])
                              : undefined
                          }
                          onSelect={(date) => {
                            handleDateChange(date, field);
                            field === "date"
                              ? setShowDatePicker(false)
                              : setShowSecondDatePicker(false);
                          }}
                          className="absolute z-[9999] mt-2 bg-white shadow-xl rounded-lg border border-gray-200"
                          locale={locale}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slot */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    formSubmitted && !formData.timeSlot
                      ? "text-[#ef4444]"
                      : "text-gray-700"
                  }`}
                >
                  {t("bookingModal.form.timeSlot")} *
                </label>
                <div className="space-y-2">
                  {timeSlotOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="timeSlot"
                        value={option.value}
                        checked={formData.timeSlot === option.value}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boat Options */}
              <div>
                <label
                  className={
                    formData.boatOptions.length === 0 && formSubmitted
                      ? "block text-sm font-medium text-[#ef4444] mb-1"
                      : "block text-sm font-medium text-gray-700 mb-1"
                  }
                >
                  {t("bookingModal.form.boatOptions")} *
                </label>
                <div className="space-y-2">
                  {boatOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="boatOptions"
                        value={option.value}
                        checked={formData.boatOptions.includes(option.value)}
                        onChange={(e) => handleCheckboxChange(e, "boatOptions")}
                        className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                {formData.boatOptions.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("bookingModal.form.totalPrice")}
                    </label>
                    <div className="text-lg font-bold text-[#37b7ab]">
                      {calculateTotalPrice()} €
                    </div>
                  </div>
                )}
              </div>

              {/* Night on Board */}
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded border ${
                    formData.nightOnBoard
                      ? "bg-[#37b7ab] border-[#37b7ab]"
                      : "border-gray-300 hover:border-[#37b7ab]"
                  } flex items-center justify-center cursor-pointer transition-colors`}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      nightOnBoard: !prev.nightOnBoard,
                    }));
                  }}
                >
                  {formData.nightOnBoard && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
                <label className="text-sm text-gray-600 cursor-pointer">
                  {t("romanticinclusion")}
                </label>
              </div>

              {/* Name & Lastname */}
              {["name", "lastName"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(field === "name" ? "firstname" : "lastname")} *
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>
              ))}

              {/* Email */}
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

              {/* Phone */}
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
                      handleChange({
                        target: { name: "phone", value },
                      })
                    }
                    className="phone-input-field"
                    required
                  />
                </div>
              </div>

              {/* Special Request */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.specialRequests")}
                </label>
                <textarea
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                />
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.promoCode")}
                </label>
                <input
                  type="text"
                  name="promoCode"
                  value={formData.promoCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                />
              </div>

              {/* Consent Checkbox */}
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

              {/* Newsletter Subscription Checkbox */}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default RomanticModal;
