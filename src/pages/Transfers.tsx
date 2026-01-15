import React, { useEffect, useState, useRef } from "react";
import {
  Car,
  Users,
  Bus,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Check,
} from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FavoriteButton from "../components/FavoriteButton";
import { useTranslation } from "react-i18next";
import { useTransfers } from "../hooks/useSanityData";
import Wrapper from "../components/Wrapper";
import { imgUrlBuilder } from "../utils/imgUrlBuilder";
import { useLocation, useNavigate } from "react-router-dom";
import useResendTransferForm from "../hooks/resend/useResendTransferForm";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr, pt } from "date-fns/locale";
import { languageOptions } from "../utils/languageOptions";
import { useNewsletterSubscription } from "../hooks/useNewsletterSubscription";
import SubscribeNewsLetterCheckbox from "../components/SubscribeNewsLetterCheckbox";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { getSEOForPage } from "../config/seoConfig";

const Transfers = () => {
  const { t, i18n } = useTranslation();
  const seo = getSEOForPage('transfers', i18n.language);
  const onQuote = t("onquote");
  const navigate = useNavigate();
  const location = useLocation();
  const lng = i18n.language;
  const locale = lng === "fr" ? fr : lng === "pt" ? pt : undefined;
  const formRef = useRef<HTMLFormElement>(null);
  const transferFormRef = useRef<HTMLDivElement>(null);

  const handleClick = (id: string) => {
    setClickedTransfer(id);
    if (transferFormRef.current) {
      transferFormRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`${location.pathname}#transfer-form`);
    }
  };

  const { vehicles: vehiclesData, services: servicesData, isLoading, error } = useTransfers();

  const vehicles =
    vehiclesData?.map((vehicle: any) => ({
      id: vehicle.id,
      name: vehicle.name,
      icon: vehicle.id === "car" ? Car : vehicle.id === "bus" ? Bus : Users,
      capacity: vehicle.capacity,
      price: vehicle.price,
      image: vehicle.image,
      features: vehicle.features,
      nameFr: vehicle.name,
    })) || [];

  const services =
    servicesData?.map((service: any) => ({
      title: service.title,
      description: service.description,
      price: service.price.length >= 3 ? service.price : onQuote,
    })) || [];

  const [formData, setFormData] = useState({
    start: "",
    destination: "",
    date: "",
    returnDate: "",
    time: "",
    passengers: "",
    vehicleType: "",
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    comments: "",
    childSeat: "",
    luggage: "",
    language: "",
    guidLanguage: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [validDate, setValidDate] = useState(true);
  const [validReturnDate, setValidReturnDate] = useState(true);
  const [clickedTransfert, setClickedTransfer] = useState("");
  const { subscribe, message, withSuccess } = useNewsletterSubscription();

  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [consent, setConsent] = useState(false);
  const [addReturnTransfer, setAddReturnTransfer] = useState(false);

  const { submitForm, loading } = useResendTransferForm({
    onSuccess: () => {
      setShowSuccess(true);
      setErrorMessage("");
      setSubscribeToNewsletter(false);
      setClickedTransfer("");
    },
    onError: (error: string) => {
      setErrorMessage(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.date || !formData.date) {
      setValidDate(false);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (addReturnTransfer && (!formData?.returnDate || !formData.returnDate)) {
      setValidReturnDate(false);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (formData?.email && subscribeToNewsletter) {
      await subscribe(formData?.email);
    }

    setSubscribeToNewsletter(false);

    submitForm(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
      />
      <main id="main-content">
        <Wrapper
          isLoading={isLoading}
          error={error}
        >
          <div className="pt-20 min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div
            className="relative bg-cover bg-center h-[40vh]"
            style={{
              backgroundImage: 'url("/src/images/bridge-portugal-beautiful-sunset.jpg")',
            }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
                Service de{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Transferts
                </span>
              </h1>
              <p className="text-xl text-white/80">
                {t("transfers.hero.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-[#2a2765] mb-8 font-garage text-center">
            {t("transfers.fleetSection.title")}
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-[#2a2765] mb-2 font-garage">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-[#37b7ab] font-semibold">
                  {service.price.length < 4
                    ? t("transfers.fleetSection.pricePrefix")
                    : ""}{" "}
                  {service.price}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-[#2a2765] mb-8 font-garage text-center">
            {t("transfers.fleetSection.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative h-48">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${vehicle.image})` }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[#2a2765] font-semibold">
                    {t("transfers.fleetSection.pricePrefix")} {vehicle.price}
                  </div>
                  <FavoriteButton
                    item={{
                      id: vehicle.id,
                      name: vehicle.name,
                      type: "Transport",
                      image: vehicle.image,
                      price: `${t("transfers.fleetSection.pricePrefix")} ${
                        vehicle.price
                      }`,
                    }}
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2a2765] mb-4 font-garage">
                    {vehicle.name}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Users className="h-4 w-4 mr-2 text-[#37b7ab]" />
                    <span>
                      {t("transfers.fleetSection.capacity")} {vehicle.capacity}{" "}
                      {t("transfers.fleetSection.people")}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {vehicle.features.map(
                      (
                        feature:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Iterable<React.ReactNode>
                          | null
                          | undefined,
                        index: React.Key | null | undefined
                      ) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-[#37b7ab] mr-2" />
                          {feature}
                        </div>
                      )
                    )}
                  </div>

                  <button
                    className="w-full bg-[#2f2d69] text-white px-6 py-3 rounded-full hover:bg-[#252157] transition font-garage tracking-wide text-sm flex items-center justify-center group"
                    onClick={() => handleClick(vehicle.id)}
                  >
                    <span>{t("transfers.fleetSection.infoButton")}</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <div
            ref={transferFormRef}
            className="mt-16 bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#2a2765] mb-8 font-garage text-center">
              {t("transfers.bookingForm.title")}
            </h2>

            {showSuccess ? (
              <div className="bg-green-50 text-green-800 rounded-lg p-6 text-center">
                {t("transfers.bookingForm.successMessage")}
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("transfers.bookingForm.fields.start")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                        placeholder={t(
                          "transfers.bookingForm.fields.startPlaceholder"
                        )}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("transfers.bookingForm.fields.destination")}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                        placeholder={t(
                          "transfers.bookingForm.fields.destinationPlaceholder"
                        )}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("transfers.bookingForm.fields.date")}
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
                          locale={locale}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("transfers.bookingForm.fields.time")}
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
                      {t("transfers.bookingForm.fields.passengers")}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                        min="1"
                        className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("transfers.bookingForm.fields.vehicleType")}
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      required
                    >
                      <option value="">
                        {t(
                          "transfers.bookingForm.fields.vehicleTypePlaceholder"
                        )}
                      </option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.nameFr}>
                          {vehicle.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("transfers.bookingForm.fields.luggage")}
                    </label>
                    <input
                      type="text"
                      name="luggage"
                      value={formData.luggage}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("transfers.bookingForm.fields.childSeat")}
                    </label>
                    <select
                      name="childSeat"
                      value={formData.childSeat}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    >
                      <option value="non">
                        {" "}
                        {t("transfers.bookingForm.fields.no")}
                      </option>
                      <option value="oui">
                        {" "}
                        {t("transfers.bookingForm.fields.yes")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("firstname")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("lastname")}
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
                      {t("transfers.bookingForm.fields.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("transfers.bookingForm.fields.phone")}
                    </label>
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 transition"
                      required
                    />
                  </div>
                </div>

                <div
                  className={
                    formData.vehicleType.toLocaleLowerCase() === "tuktuk"
                      ? "grid md:grid-cols-2 gap-6"
                      : ""
                  }
                >
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("language")}
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                      required
                    >
                      <option value="" disabled></option>
                      {languageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {t(option.label)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.vehicleType.toLocaleLowerCase() === "tuktuk" && (
                    <div className="">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("guidLanguage")}
                      </label>
                      <select
                        name="guidLanguage"
                        value={formData.guidLanguage}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                        required
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("transfers.bookingForm.fields.comments")}
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    placeholder={t(
                      "transfers.bookingForm.fields.commentsPlaceholder"
                    )}
                  />
                </div>

                {/* Add Return Transfer Checkbox */}
                <div className="mt-8">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-5 h-5 rounded border ${
                        addReturnTransfer
                          ? "bg-[#37b7ab] border-[#37b7ab]"
                          : "border-gray-300 hover:border-[#37b7ab]"
                      } flex items-center justify-center cursor-pointer transition-colors`}
                      onClick={() => {
                        setAddReturnTransfer(!addReturnTransfer);
                      }}
                    >
                      {addReturnTransfer && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <label
                      className="text-sm text-gray-600 cursor-pointer "
                      onClick={() => setAddReturnTransfer(!addReturnTransfer)}
                    >
                      {t("addReturnTransfer")}
                    </label>
                  </div>
                </div>

                {/* Return Date Picker */}
                {addReturnTransfer && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("returnDate")}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        onClick={() =>
                          setShowReturnDatePicker(!showReturnDatePicker)
                        }
                        className="w-full px-4 py-2 pl-[45px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                        required
                        readOnly
                        style={
                          !validReturnDate && !formData.returnDate
                            ? { border: "1px solid #ef4444" }
                            : {}
                        }
                      />
                      <div className="absolute left-4 top-[10px] text-gray-400 cursor-pointer">
                        <Calendar
                          size={20}
                          onClick={() =>
                            setShowReturnDatePicker(!showReturnDatePicker)
                          }
                        />
                      </div>
                      {showReturnDatePicker && (
                        <DayPicker
                          mode="single"
                          selected={
                            formData.returnDate
                              ? new Date(formData.returnDate)
                              : undefined
                          }
                          onSelect={(date) => {
                            handleDateChange(date, "returnDate");
                            setShowReturnDatePicker(false);
                          }}
                          className="absolute z-10 mt-2"
                          locale={locale}
                        />
                      )}
                    </div>
                  </div>
                )}

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
                  <span>
                    {loading ? "..." : t("transfers.bookingForm.submitButton")}
                  </span>
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
      </Wrapper>
      </main>
    </>
  );
};

export default Transfers;
