// src/components/SetubalModal.tsx
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X, Calendar, Mail, ChevronRight, Check } from "lucide-react";
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

interface SetubalModalProps {
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

const SetubalModal = ({
  item,
  source = "",
  reservation,
  onClose,
  fromSetubal,
}: SetubalModalProps) => {
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
    departureTime: "",
    numberOfPeople: "",
    departureCity: "",
    hours: "",
    boatChoice: "",
    boatLicense: "",
    extras: [],
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validDate, setValidDate] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { subscribe, message, withSuccess } = useNewsletterSubscription();

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
    setFormSubmitted(false);
    setFormData({
      date: "",
      secondDate: "",
      departureTime: "",
      numberOfPeople: "",
      departureCity: "",
      hours: "",
      boatChoice: "",
      boatLicense: "",
      extras: [],
      name: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      !formData.date ||
      !formData.phone ||
      !formData.departureTime ||
      !formData.numberOfPeople ||
      !formData.departureCity ||
      !formData.hours ||
      !formData.boatChoice ||
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

  const departureTimeOptions = [
    { value: "10h", label: "10h" },
    { value: "14h30", label: "14h30" },
    {
      value: "Peu importe",
      label: lng === "fr" ? "Peu importe" : lng === "pt" ? "Tanto faz" : "Any",
    },
  ];

  const boatOptions = [
    {
      value: "Kelt Azura / 5pers",
      label: t("bookingModal.boatOptions.keltAzura"),
      price: 180,
    },
    {
      value: "Saver / 6pers",
      label: t("bookingModal.boatOptions.saver"),
      price: 210,
    },
    {
      value: "CAD / 6pers",
      label: t("bookingModal.boatOptions.cad"),
      price: 210,
    },
    {
      value: "San Remo / 7pers",
      label: t("bookingModal.boatOptions.sanRemo"),
      price: 220,
    },
    {
      value: "Selva / 7pers",
      label: t("bookingModal.boatOptions.selva"),
      price: 220,
    },
    {
      value: "Nireus / 8pers",
      label: t("bookingModal.boatOptions.nireus"),
      price: 240,
    },
    {
      value: "SACS / 10pers",
      label: t("bookingModal.boatOptions.sacs"),
      price: 250,
    },
    {
      value: "BWA / 12pers",
      label: t("bookingModal.boatOptions.bwa"),
      price: 290,
    },
  ];

  const extrasOptions = [
    { value: "bouee", label: t("bookingModal.extras.bouee"), price: 40 },
    {
      value: "wakeboard",
      label: t("bookingModal.extras.wakeboard"),
      price: 40,
    },
    {
      value: "skiNautique",
      label: t("bookingModal.extras.skiNautique"),
      price: 40,
    },
  ];

  const calculateTotalPrice = () => {
    const boatPrice =
      boatOptions.find((opt) => opt.value === formData.boatChoice)?.price || 0;
    const extrasPrice = formData.extras.reduce((total, value) => {
      const option = extrasOptions.find((opt) => opt.value === value);
      return total + (option ? option.price : 0);
    }, 0);
    const docTax = formData.departureCity === "Troia" ? 25 : 0;
    const equipage = formData.boatLicense === "equipage" ? 70 : 0;
    return boatPrice + extrasPrice + docTax + equipage;
  };

  const filteredExtrasOptions = () => {
    if (formData.boatChoice === "Kelt Azura / 5pers") {
      return [];
    } else if (formData.boatChoice === "San Remo / 7pers") {
      return extrasOptions.filter((option) => option.value === "bouee");
    } else {
      return extrasOptions;
    }
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

              {/* Departure Time */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    formSubmitted && !formData.departureTime
                      ? "text-[#ef4444]"
                      : "text-gray-700"
                  }`}
                >
                  {t("bookingModal.form.departureTime")} *
                </label>
                <div className="space-y-2">
                  {departureTimeOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="departureTime"
                        value={option.value}
                        checked={formData.departureTime === option.value}
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

              {/* Number of People */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.numberOfPeople")} *
                </label>
                <input
                  type="number"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                  required
                />
              </div>
              {/* Hours */}
              <div>
                <label
                  className={
                    formSubmitted && !formData.hours
                      ? "block text-sm font-medium text-[#ef4444] mb-1"
                      : "block text-sm font-medium text-gray-700 mb-1"
                  }
                >
                  {t("bookingModal.form.hours")} *
                </label>
                <div className="space-y-2">
                  {["4 heures", "8 heures"].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="hours"
                        value={option}
                        checked={formData.hours === option}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Departure City */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.departureCity")} *
                </label>
                <select
                  name="departureCity"
                  value={formData.departureCity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[48px] text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white cursor-pointer"
                  required
                  style={{ WebkitAppearance: 'menulist-button' }}
                >
                  <option value="" disabled>
                    {t("bookingModal.form.selectOption")}
                  </option>
                  <option value="Setubal">
                    {t("bookingModal.form.setubal")}
                  </option>
                  <option value="Troia">{t("bookingModal.form.troia")}</option>
                </select>
              </div>
              {/* Boat Choice */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.boatChoice")} *
                </label>
                <select
                  name="boatChoice"
                  value={formData.boatChoice}
                  onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[48px] text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition bg-white cursor-pointer"
                  required
                  style={{ WebkitAppearance: 'menulist-button' }}
                >
                  <option value="" disabled>
                    {t("bookingModal.form.selectOption")}
                  </option>
                  {boatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Boat License */}
              {(formData.boatChoice === "Kelt Azura / 5pers" || true) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.boatLicense")}
                  </label>
                  <div className="space-y-2">
                    {["permis", "equipage"].map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="boatLicense"
                          value={option}
                          checked={formData.boatLicense === option}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {option === "permis"
                            ? t("bookingModal.form.permis")
                            : `${t(
                                "bookingModal.form.equipage"
                              )} (+70 €, -2 places)`}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extras */}
              {formData.boatChoice && (
                <div>
                  {formData.boatChoice != "Kelt Azura / 5pers" && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("bookingModal.form.extras")}
                    </label>
                  )}
                  <div className="space-y-2">
                    {filteredExtrasOptions().map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="extras"
                          value={option.value}
                          checked={formData.extras.includes(option.value)}
                          onChange={(e) => handleCheckboxChange(e, "extras")}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {formData.extras.length > 0 && (
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
              )}

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

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("bookingModal.form.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
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

export default SetubalModal;
