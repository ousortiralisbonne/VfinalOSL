import React, { useState } from "react";
import customToursHero from '../images/colorful-houses-bosa-sardinia.jpg';
import { useTranslation } from "react-i18next";
import {
  Building2,
  Users,
  Briefcase,
  ChevronRight,
  Star,
  MessageCircle,
  FileCheck,
  Handshake,
  Check,
  Calendar,
  ChevronLeft,
} from "lucide-react";
import useResendCustomToursForm from "../hooks/resend/useResendCustomToursForm";
import { Link } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr, pt } from "date-fns/locale";
import Testimonials from "../components/Testimonials";

const CustomTours = () => {
  const { t, i18n } = useTranslation();
  const [consent, setConsent] = useState(false);
  const [validDates, setValidDates] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    arrivalDate: "",
    departureDate: "",
    groupType: "",
    adultsCount: "",
    seniorsCount: "",
    minorsCount: "",
    mobilityInfo: "",
    tellUsMore: "",
    firstName: "",
    lastName: "",
    contactPreference: "no",
    preferredContactDay: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showContactDayPicker, setShowContactDayPicker] = useState(false);
  const lng = i18n.language;
  const locale = lng === "fr" ? fr : lng === "pt" ? pt : undefined;

  const { submitForm, loading } = useResendCustomToursForm({
    onSuccess: () => {
      setShowSuccess(true);
      setErrorMessage("");
    },
    onError: (error: any) => {
      setErrorMessage(error);
    },
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDeparturePicker(false);
    setShowArrivalPicker(false);
    setShowContactDayPicker(false);
    if (!formData?.arrivalDate || !formData.departureDate) {
      setValidDates(false);
      document
        .getElementById("departure")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    submitForm(formData);
    setFormData({
      arrivalDate: "",
      departureDate: "",
      groupType: "",
      adultsCount: "",
      seniorsCount: "",
      minorsCount: "",
      mobilityInfo: "",
      tellUsMore: "",
      firstName: "",
      lastName: "",
      contactPreference: "no",
      preferredContactDay: "",
    });
  };

  const tourTypes = [
    {
      id: "partner",
      title: t("customTours.tourTypes.partner.title"),
      icon: Building2,
      description: t("customTours.tourTypes.partner.description"),
      benefits: [
        t("customTours.tourTypes.partner.benefits.1"),
        t("customTours.tourTypes.partner.benefits.2"),
        t("customTours.tourTypes.partner.benefits.3"),
        t("customTours.tourTypes.partner.benefits.4"),
      ],
      color: "#37b7ab",
    },
    {
      id: "family",
      title: t("customTours.tourTypes.family.title"),
      icon: Users,
      description: t("customTours.tourTypes.family.description"),
      benefits: [
        t("customTours.tourTypes.family.benefits.1"),
        t("customTours.tourTypes.family.benefits.2"),
        t("customTours.tourTypes.family.benefits.3"),
        t("customTours.tourTypes.family.benefits.4"),
      ],
      color: "#ea3e4e",
    },
    {
      id: "business",
      title: t("customTours.tourTypes.business.title"),
      icon: Briefcase,
      description: t("customTours.tourTypes.business.description"),
      benefits: [
        t("customTours.tourTypes.business.benefits.1"),
        t("customTours.tourTypes.business.benefits.2"),
        t("customTours.tourTypes.business.benefits.3"),
        t("customTours.tourTypes.business.benefits.4"),
      ],
      color: "#2f2d69",
    },
  ];

  const timeline = [
    {
      icon: MessageCircle,
      title: t("customTours.timeline.1.title"),
      description: t("customTours.timeline.1.description"),
      color: "#37b7ab",
    },
    {
      icon: FileCheck,
      title: t("customTours.timeline.2.title"),
      description: t("customTours.timeline.2.description"),
      color: "#ea3e4e",
    },
    {
      icon: Handshake,
      title: t("customTours.timeline.3.title"),
      description: t("customTours.timeline.3.description"),
      color: "#2f2d69",
    },
  ];

  return (
    <main id="main-content">
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[40vh]"
        style={{
          backgroundImage: `url(${customToursHero})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
              Visites{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Sur Mesure
              </span>
            </h1>
            <p className="text-xl text-white/80">
              {t("customTours.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Options Grid + Form Section - Side by Side */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Options Cards */}
          <div className="lg:w-1/2">
            <div className="grid gap-4">
              {tourTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    selectedType === type.id ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor:
                      selectedType === type.id ? type.color : "transparent",
                    borderWidth: "2px",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${type.color}15` }}
                    >
                      <type.icon
                        style={{ color: type.color }}
                        className="h-5 w-5"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[#2a2765] font-garage">
                      {type.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {type.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <div
                          className="h-1.5 w-1.5 rounded-full mr-2 flex-shrink-0"
                          style={{ backgroundColor: type.color }}
                        />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:w-1/2" id="departure">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#2a2765] mb-6 font-garage">
                {t("customTours.formSection.title")}
              </h2>

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
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("customTours.formSection.fields.arrivalDate")}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="arrivalDate"
                          value={formData.arrivalDate}
                          onChange={handleChange}
                          onClick={() => setShowArrivalPicker(!showArrivalPicker)}
                          className="w-full px-3 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                          required
                          readOnly
                          style={
                            !validDates && !formData.arrivalDate
                              ? { border: "1px solid #ef4444" }
                              : {}
                          }
                        />
                        <div className="absolute left-3 top-[10px] text-gray-400 cursor-pointer">
                          <Calendar
                            size={18}
                            onClick={() => setShowArrivalPicker(!showArrivalPicker)}
                          />
                        </div>
                        {showArrivalPicker && (
                          <DayPicker
                            mode="single"
                            selected={
                              formData.arrivalDate
                                ? new Date(formData.arrivalDate)
                                : undefined
                            }
                            onSelect={(date) => {
                              handleDateChange(date, "arrivalDate");
                              setShowArrivalPicker(false);
                            }}
                            className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg"
                            locale={locale}
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("customTours.formSection.fields.departureDate")}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="departureDate"
                          value={formData.departureDate}
                          onChange={handleChange}
                          onClick={() =>
                            setShowDeparturePicker(!showDeparturePicker)
                          }
                          className="w-full px-3 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                          required
                          readOnly
                          style={
                            !validDates && !formData.departureDate
                              ? { border: "1px solid #ef4444" }
                              : {}
                          }
                        />
                        <div className="absolute left-3 top-[10px] text-gray-400 cursor-pointer">
                          <Calendar
                            size={18}
                            onClick={() =>
                              setShowDeparturePicker(!showDeparturePicker)
                            }
                          />
                        </div>
                        {showDeparturePicker && (
                          <DayPicker
                            mode="single"
                            selected={
                              formData.departureDate
                                ? new Date(formData.departureDate)
                                : undefined
                            }
                            onSelect={(date) => {
                              handleDateChange(date, "departureDate");
                              setShowDeparturePicker(false);
                            }}
                            className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg"
                            locale={locale}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("customTours.formSection.fields.groupType")}
                    </label>
                    <select
                      name="groupType"
                      value={formData.groupType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                      required
                    >
                      <option value="">--</option>
                      {[
                        t("customTours.formSection.groupTypes.couple"),
                        t("customTours.formSection.groupTypes.friends"),
                        t("customTours.formSection.groupTypes.school"),
                        t("customTours.formSection.groupTypes.family"),
                        t("customTours.formSection.groupTypes.single"),
                        t("customTours.formSection.groupTypes.seminar"),
                        t("customTours.formSection.groupTypes.teamBuilding"),
                        t("customTours.formSection.groupTypes.other"),
                      ].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("customTours.formSection.fields.adultsCount")}
                      </label>
                      <input
                        type="number"
                        name="adultsCount"
                        value={formData.adultsCount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("customTours.formSection.fields.seniorsCount")}
                      </label>
                      <input
                        type="number"
                        name="seniorsCount"
                        value={formData.seniorsCount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("customTours.formSection.fields.minorsCount")}
                      </label>
                      <input
                        type="text"
                        name="minorsCount"
                        value={formData.minorsCount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("customTours.formSection.fields.mobilityInfo")}
                      </label>
                      <input
                        type="text"
                        name="mobilityInfo"
                        value={formData.mobilityInfo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("firstname")} *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
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
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("telluseverything")}
                    </label>
                    <textarea
                      name="tellUsMore"
                      value={formData.tellUsMore}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("recontactPreference")}
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="contactPreference"
                          value="no"
                          checked={formData.contactPreference === "no"}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-[#37b7ab] focus:ring-[#37b7ab]"
                        />
                        <span className="text-sm">{t("no")}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="contactPreference"
                          value="yes"
                          checked={formData.contactPreference === "yes"}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-[#37b7ab] focus:ring-[#37b7ab]"
                        />
                        <span className="text-sm">{t("yes")}</span>
                      </label>
                    </div>
                  </div>

                  {formData.contactPreference === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("selectDay")}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="preferredContactDay"
                          value={formData.preferredContactDay}
                          onChange={handleChange}
                          onClick={() =>
                            setShowContactDayPicker(!showContactDayPicker)
                          }
                          className="w-full px-3 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition text-sm"
                          required
                          readOnly
                        />
                        <div className="absolute left-3 top-[10px] text-gray-400 cursor-pointer">
                          <Calendar
                            size={18}
                            onClick={() =>
                              setShowContactDayPicker(!showContactDayPicker)
                            }
                          />
                        </div>
                        {showContactDayPicker && (
                          <DayPicker
                            mode="single"
                            selected={
                              formData.preferredContactDay
                                ? new Date(formData.preferredContactDay)
                                : undefined
                            }
                            onSelect={(date) => {
                              handleDateChange(date, "preferredContactDay");
                              setShowContactDayPicker(false);
                            }}
                            className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg"
                            locale={locale}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-5 h-5 rounded border ${
                          consent
                            ? "bg-[#37b7ab] border-[#37b7ab]"
                            : "border-gray-300 hover:border-[#37b7ab]"
                        } flex items-center justify-center cursor-pointer transition-colors flex-shrink-0`}
                        onClick={() => {
                          setConsent(!consent);
                        }}
                      >
                        {consent && <Check className="h-4 w-4 text-white" />}
                      </div>
                      <label
                        className="text-xs text-gray-600 cursor-pointer"
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

                  <button
                    type="submit"
                    className={`w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group ${
                      !consent ? "cursor-not-allowed opacity-60" : ""
                    }`}
                    disabled={loading || !consent}
                  >
                    {loading ? (
                      "..."
                    ) : (
                      <span>{t("customTours.formSection.submitButton")}</span>
                    )}
                    {!loading && (
                      <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2a2765] mb-8 md:mb-12 text-center font-garage">
            {t("customTours.timelineSection.title")}
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block" />

            <div className="space-y-12 relative">
              {timeline.map((step, index) => (
                <div key={index} className="relative">
                  <div
                    className={`md:flex items-center ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-white border-4"
                        style={{ borderColor: step.color }}
                      >
                        <step.icon
                          className="h-5 w-5"
                          style={{ color: step.color }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`bg-white rounded-xl p-6 shadow-sm md:w-[calc(50%-2rem)] mt-6 md:mt-0 ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      } pt-[60px] md:pt-0`}
                    >
                      <h3 className="text-xl font-bold text-[#2a2765] mb-2 font-garage">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
    </main>
  );
};

export default CustomTours;
