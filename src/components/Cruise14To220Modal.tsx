import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X, Calendar, Clock, Users, ChevronRight, Check } from "lucide-react";
import { pixelEvents } from "../utils/analytics";
import { useResendCruiseForm } from "../hooks/resend/useResendCruiseForm";
import { Link } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr, pt } from "date-fns/locale";
import { useNewsletterSubscription } from "../hooks/useNewsletterSubscription";
import SubscribeNewsLetterCheckbox from "./SubscribeNewsLetterCheckbox";

interface Cruise14To220ModalProps {
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

const Cruise14To220Modal = ({
  item,
  source = "",
  reservation,
  onClose,
  fromSetubal,
}: Cruise14To220ModalProps) => {
  const { t, i18n } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [consent, setConsent] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSecondDatePicker, setShowSecondDatePicker] = useState(false);
  const lng = i18n.language;
  const locale = lng === "fr" ? fr : lng === "pt" ? pt : undefined;

  const [formData, setFormData] = useState({
    participants: "",
    date: "",
    secondDate: "",
    departureTime: "",
    duration: "",
    boatTypes: [],
    criteria: [],
    event: "",
    extras: [],
    experiences: [],
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validDate, setValidDate] = useState(true);
  const { subscribe, message, withSuccess } = useNewsletterSubscription();

  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const { submitForm, loading } = useResendCruiseForm({
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
      participants: "",
      date: "",
      secondDate: "",
      departureTime: "",
      duration: "",
      boatTypes: [],
      criteria: [],
      event: "",
      extras: [],
      experiences: [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date) {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const boatTypeOptions = [
    {
      value: t("cruiseModal.boatTypes.voilier", { lng: "fr" }),
      label: t("cruiseModal.boatTypes.voilier"),
    },
    {
      value: t("cruiseModal.boatTypes.catamaran", { lng: "fr" }),
      label: t("cruiseModal.boatTypes.catamaran"),
    },
    {
      value: t("cruiseModal.boatTypes.yacht", { lng: "fr" }),
      label: t("cruiseModal.boatTypes.yacht"),
    },
    {
      value: t("cruiseModal.boatTypes.peuImporte", { lng: "fr" }),
      label: t("cruiseModal.boatTypes.peuImporte"),
    },
    {
      value: t("cruiseModal.boatTypes.ceBateau", { lng: "fr" }),
      label: t("cruiseModal.boatTypes.ceBateau"),
    },
  ];

  const criteriaOptions = [
    { value: "date", label: t("cruiseModal.criteria.date") },
    { value: "creneau", label: t("cruiseModal.criteria.creneau") },
    { value: "tarif", label: t("cruiseModal.criteria.tarif") },
    { value: "service", label: t("cruiseModal.criteria.service") },
    { value: "type", label: t("cruiseModal.criteria.type") },
    { value: "autre", label: t("cruiseModal.criteria.autre") },
  ];

  const extrasOptions = [
    {
      value: t("cruiseModal.extras.boissons", { lng: "fr" }),
      label: t("cruiseModal.extras.boissons"),
    },
    {
      value: t("cruiseModal.extras.openBar", { lng: "fr" }),
      label: t("cruiseModal.extras.openBar"),
    },
    {
      value: t("cruiseModal.extras.snacks", { lng: "fr" }),
      label: t("cruiseModal.extras.snacks"),
    },
    {
      value: t("cruiseModal.extras.reception", { lng: "fr" }),
      label: t("cruiseModal.extras.reception"),
    },
    {
      value: t("cruiseModal.extras.barbecue", { lng: "fr" }),
      label: t("cruiseModal.extras.barbecue"),
    },
    {
      value: t("cruiseModal.extras.brunch", { lng: "fr" }),
      label: t("cruiseModal.extras.brunch"),
    },
    {
      value: t("cruiseModal.extras.fruitsDeMer", { lng: "fr" }),
      label: t("cruiseModal.extras.fruitsDeMer"),
    },
    {
      value: t("cruiseModal.extras.gateau", { lng: "fr" }),
      label: t("cruiseModal.extras.gateau"),
    },
    {
      value: t("cruiseModal.extras.sushi", { lng: "fr" }),
      label: t("cruiseModal.extras.sushi"),
    },
    {
      value: t("cruiseModal.extras.vegetarien", { lng: "fr" }),
      label: t("cruiseModal.extras.vegetarien"),
    },
    {
      value: t("cruiseModal.extras.autre", { lng: "fr" }),
      label: t("cruiseModal.extras.autre"),
    },
  ];

  const experiencesOptions = [
    {
      value: t("cruiseModal.experiences.romantique", { lng: "fr" }),
      label: t("cruiseModal.experiences.romantique"),
    },
    {
      value: t("cruiseModal.experiences.evg", { lng: "fr" }),
      label: t("cruiseModal.experiences.evg"),
    },
    {
      value: t("cruiseModal.experiences.barman", { lng: "fr" }),
      label: t("cruiseModal.experiences.barman"),
    },
    {
      value: t("cruiseModal.experiences.boatParty", { lng: "fr" }),
      label: t("cruiseModal.experiences.boatParty"),
    },
    {
      value: t("cruiseModal.experiences.fado", { lng: "fr" }),
      label: t("cruiseModal.experiences.fado"),
    },
    {
      value: t("cruiseModal.experiences.guide", { lng: "fr" }),
      label: t("cruiseModal.experiences.guide"),
    },
    {
      value: t("cruiseModal.experiences.nuits", { lng: "fr" }),
      label: t("cruiseModal.experiences.nuits"),
    },
    {
      value: t("cruiseModal.experiences.photographe", { lng: "fr" }),
      label: t("cruiseModal.experiences.photographe"),
    },
    {
      value: t("cruiseModal.experiences.peche", { lng: "fr" }),
      label: t("cruiseModal.experiences.peche"),
    },
    {
      value: t("cruiseModal.experiences.planche", { lng: "fr" }),
      label: t("cruiseModal.experiences.planche"),
    },
    {
      value: t("cruiseModal.experiences.teamBuilding", { lng: "fr" }),
      label: t("cruiseModal.experiences.teamBuilding"),
    },
    {
      value: t("cruiseModal.experiences.sushiMan", { lng: "fr" }),
      label: t("cruiseModal.experiences.sushiMan"),
    },
    {
      value: t("cruiseModal.experiences.autre", { lng: "fr" }),
      label: t("cruiseModal.experiences.autre"),
    },
  ];

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
            {t("cruiseModal.reserve")} - {item?.name || item?.title}
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
                {t("cruiseModal.success.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("cruiseModal.success.message")}
              </p>
              <button
                onClick={closeModal}
                className="bg-[#2f2d69] text-white px-6 py-2 rounded-full hover:bg-[#252157] transition"
              >
                {t("cruiseModal.close")}
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Participants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("cruiseModal.form.participants")} *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="participants"
                    value={formData.participants}
                    onChange={handleChange}
                    min="1"
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("cruiseModal.form.date")} *
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
                        className="absolute z-[9999] mt-2 bg-white shadow-xl rounded-lg border border-gray-200"
                        locale={locale}
                      />
                    )}
                  </div>
                </div>

                {/* Second Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("cruiseModal.form.secondDate")}
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
                      className="w-full px-4 py-2 pl-[45px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      readOnly
                    />
                    <div className="absolute left-4 top-[10px] text-gray-400 cursor-pointer">
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
              {/* Departure Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("cruiseModal.form.departureTime")} *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                    min="10:00"
                    max="20:30"
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("cruiseModal.form.duration")} *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>
              </div>

              {/* Boat Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("cruiseModal.form.boatTypes")}
                </label>
                <div className="space-y-2">
                  {boatTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="boatTypes"
                        value={option.value}
                        checked={formData.boatTypes.includes(option.value)}
                        onChange={(e) => handleCheckboxChange(e, "boatTypes")}
                        className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Criteria */}
              {formData.boatTypes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("cruiseModal.form.criteria")}
                  </label>
                  <div className="space-y-2">
                    {criteriaOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="criteria"
                          value={option.value}
                          checked={formData.criteria.includes(option.value)}
                          onChange={(e) => handleCheckboxChange(e, "criteria")}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("cruiseModal.form.event")}
                </label>
                <input
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                />
              </div>

              {/* Extras */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("cruiseModal.form.extras")}
                </label>
                <div className="space-y-2">
                  {extrasOptions.map((option) => (
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
              </div>

              {/* Experiences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("cruiseModal.form.experiences")}
                </label>
                <div className="space-y-2">
                  {experiencesOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        name="experiences"
                        value={option.value}
                        checked={formData.experiences.includes(option.value)}
                        onChange={(e) => handleCheckboxChange(e, "experiences")}
                        className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
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
                className={`w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group ${
                  !consent ? "cursor-not-allowed" : ""
                }`}
                disabled={loading || !consent}
              >
                <span>{loading ? "..." : t("cruiseModal.form.submit")}</span>
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

export default Cruise14To220Modal;
