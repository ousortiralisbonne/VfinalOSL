/**
 * Sintra Trip Booking Modal - Main Component
 * Refactored from SintraTripBookingModal.tsx (~1145 lines)
 */
import { useTranslation } from "react-i18next";
import { X, Calendar, Mail, ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr, pt } from "date-fns/locale";

import SubscribeNewsLetterCheckbox from "../SubscribeNewsLetterCheckbox";
import SintraTripSuccess from "./SintraTripSuccess";
import { useSintraTripForm } from "./useSintraTripForm";
import {
  getLanguageOptions,
  getDepartureTimeOptions,
  getAccompanimentOptions,
  getMonumentOptions,
  getVehicleOptions,
  getVehicleFormulas,
} from "./constants";
import type { SintraTripBookingModalProps } from "./types";

const SintraTripBookingModal = ({
  item,
  source = "",
  reservation,
  onClose,
  fromSetubal,
}: SintraTripBookingModalProps) => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const locale = lng === "fr" ? fr : lng === "pt" ? pt : undefined;

  const {
    formRef,
    formData,
    consent,
    showDatePicker,
    showSecondDatePicker,
    formSubmitted,
    showSuccess,
    errorMessage,
    validDate,
    loading,
    subscribeToNewsletter,
    setConsent,
    setShowDatePicker,
    setShowSecondDatePicker,
    setSubscribeToNewsletter,
    closeModal,
    handleSubmit,
    handleChange,
    handleCheckboxChange,
    handleDateChange,
    handlePhoneChange,
  } = useSintraTripForm({
    item,
    source,
    reservation,
    fromSetubal,
    onClose,
  });

  // Get translated options
  const languageOptions = getLanguageOptions(t);
  const departureTimeOptions = getDepartureTimeOptions(t);
  const accompanimentOptions = getAccompanimentOptions(t);
  const monumentOptions = getMonumentOptions(t);
  const vehicleOptions = getVehicleOptions(t);
  const vehicleFormulas = getVehicleFormulas(t);

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
            aria-label={t("bookingModal.close")}
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {showSuccess ? (
            <SintraTripSuccess onClose={closeModal} />
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-6">
                {/* Date Fields */}
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
                          className="absolute z-[9999] mt-2 bg-white shadow-xl rounded-lg border border-gray-200"
                          locale={locale}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("bookingModal.form.secondDate")}
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

                {/* Pickup Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.pickupLocation")} *
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>

                {/* Languages */}
                <div>
                  <label
                    className={
                      formSubmitted && formData.languages.length <= 0
                        ? "block text-sm font-medium text-[#ef4444] mb-1"
                        : "block text-sm font-medium text-gray-700 mb-1"
                    }
                  >
                    {t("bookingModal.form.languages")} *
                  </label>
                  <div className="space-y-2">
                    {languageOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="languages"
                          value={option.value}
                          checked={formData.languages.includes(option.value)}
                          onChange={(e) => handleCheckboxChange(e, "languages")}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Departure Time */}
                <div>
                  <label
                    className={
                      formSubmitted && !formData.departureTime
                        ? "block text-sm font-medium text-[#ef4444] mb-1"
                        : "block text-sm font-medium text-gray-700 mb-1"
                    }
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

                {/* Accompaniment */}
                <div>
                  <label
                    className={
                      formSubmitted && !formData.accompaniment
                        ? "block text-sm font-medium text-[#ef4444] mb-1"
                        : "block text-sm font-medium text-gray-700 mb-1"
                    }
                  >
                    {t("bookingModal.form.accompaniment")} *
                  </label>
                  <div className="space-y-2">
                    {accompanimentOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="accompaniment"
                          value={option.value}
                          checked={formData.accompaniment === option.value}
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

                {/* Monuments */}
                <div>
                  <label
                    className={
                      formSubmitted && formData.monuments.length <= 0
                        ? "block text-sm font-medium text-[#ef4444] mb-1"
                        : "block text-sm font-medium text-gray-700 mb-1"
                    }
                  >
                    {t("bookingModal.form.monuments")} *
                  </label>
                  <div className="space-y-2">
                    {monumentOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="monuments"
                          value={option.value}
                          checked={formData.monuments.includes(option.value)}
                          onChange={(e) => handleCheckboxChange(e, "monuments")}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicles */}
                <div>
                  <label
                    className={
                      formSubmitted && formData.vehicles.length === 0
                        ? "block text-sm font-medium text-[#ef4444] mb-1"
                        : "block text-sm font-medium text-gray-700 mb-1"
                    }
                  >
                    {t("bookingModal.form.vehicles")} *
                  </label>
                  <div className="space-y-2">
                    {vehicleOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="vehicles"
                          value={option.value}
                          checked={formData.vehicles.includes(option.value)}
                          onChange={(e) => handleCheckboxChange(e, "vehicles")}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicle-specific ticket questions */}
                {formData.vehicles.includes("decapotable") && (
                  <div>
                    <label
                      className={
                        formSubmitted && !formData.tickets.decapotable
                          ? "block text-sm font-medium text-[#ef4444] mb-1"
                          : "block text-sm font-medium text-gray-700 mb-1"
                      }
                    >
                      {t("bookingModal.form.tickets")}
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="tickets.decapotable"
                          value="yes"
                          checked={formData.tickets.decapotable === "yes"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {t("bookingModal.form.ticketsYes")}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="tickets.decapotable"
                          value="no"
                          checked={formData.tickets.decapotable === "no"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {t("bookingModal.form.ticketsNo")}
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {formData.vehicles.includes("combi") && (
                  <div>
                    <label
                      className={
                        formSubmitted && !formData.tickets.combi
                          ? "block text-sm font-medium text-[#ef4444] mb-1"
                          : "block text-sm font-medium text-gray-700 mb-1"
                      }
                    >
                      {t("bookingModal.form.tickets")}
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="tickets.combi"
                          value="yes"
                          checked={formData.tickets.combi === "yes"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {t("bookingModal.form.ticketsYes")}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="tickets.combi"
                          value="no"
                          checked={formData.tickets.combi === "no"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {t("bookingModal.form.ticketsNo")}
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {formData.vehicles.includes("van") && (
                  <>
                    <div>
                      <label
                        className={
                          formSubmitted && !formData.vehicleFormulas.van
                            ? "block text-sm font-medium text-[#ef4444] mb-1"
                            : "block text-sm font-medium text-gray-700 mb-1"
                        }
                      >
                        {t("bookingModal.form.vehicleFormulas")}
                      </label>
                      <div className="space-y-2">
                        {vehicleFormulas.van.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="radio"
                              name="vehicleFormulas.van"
                              value={option.value}
                              checked={
                                formData.vehicleFormulas.van === option.value
                              }
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
                    <div>
                      <label
                        className={
                          formSubmitted && !formData.tickets.van
                            ? "block text-sm font-medium text-[#ef4444] mb-1"
                            : "block text-sm font-medium text-gray-700 mb-1"
                        }
                      >
                        {t("bookingModal.form.tickets")}
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="tickets.van"
                            value="yes"
                            checked={formData.tickets.van === "yes"}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            {t("bookingModal.form.ticketsYes")}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="tickets.van"
                            value="no"
                            checked={formData.tickets.van === "no"}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            {t("bookingModal.form.ticketsNo")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {formData.vehicles.includes("minibus") && (
                  <>
                    <div>
                      <label
                        className={
                          formSubmitted && !formData.vehicleFormulas.minibus
                            ? "block text-sm font-medium text-[#ef4444] mb-1"
                            : "block text-sm font-medium text-gray-700 mb-1"
                        }
                      >
                        {t("bookingModal.form.vehicleFormulas")}
                      </label>
                      <div className="space-y-2">
                        {vehicleFormulas.minibus.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="radio"
                              name="vehicleFormulas.minibus"
                              value={option.value}
                              checked={
                                formData.vehicleFormulas.minibus === option.value
                              }
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
                    <div>
                      <label
                        className={
                          formSubmitted && !formData.tickets.minibus
                            ? "block text-sm font-medium text-[#ef4444] mb-1"
                            : "block text-sm font-medium text-gray-700 mb-1"
                        }
                      >
                        {t("bookingModal.form.tickets")}
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="tickets.minibus"
                            value="yes"
                            checked={formData.tickets.minibus === "yes"}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            {t("bookingModal.form.ticketsYes")}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="tickets.minibus"
                            value="no"
                            checked={formData.tickets.minibus === "no"}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            {t("bookingModal.form.ticketsNo")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {formData.vehicles.includes("bus") && (
                  <div>
                    <label
                      className={
                        formSubmitted && !formData.tickets.bus
                          ? "block text-sm font-medium text-[#ef4444] mb-1"
                          : "block text-sm font-medium text-gray-700 mb-1"
                      }
                    >
                      {t("bookingModal.form.tickets")}
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="tickets.bus"
                          value="yes"
                          checked={formData.tickets.bus === "yes"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {t("bookingModal.form.ticketsYesBus")}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="tickets.bus"
                          value="no"
                          checked={formData.tickets.bus === "no"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#37b7ab] border-gray-300 rounded focus:ring-[#37b7ab]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {t("bookingModal.form.ticketsNo")}
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Info */}
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
                      onChange={handlePhoneChange}
                      className="phone-input-field"
                      required
                    />
                  </div>
                </div>

                {/* Participants */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.participants18to64")} *
                  </label>
                  <input
                    type="number"
                    name="participants18to64"
                    value={formData.participants18to64}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.participants6to17")} *
                  </label>
                  <input
                    type="number"
                    name="participants6to17"
                    value={formData.participants6to17}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.participants65plus")} *
                  </label>
                  <input
                    type="number"
                    name="participants65plus"
                    value={formData.participants65plus}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("bookingModal.form.participantsUnder6")} *
                  </label>
                  <input
                    type="number"
                    name="participantsUnder6"
                    value={formData.participantsUnder6}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition"
                    required
                  />
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
              </div>

              {/* Consent */}
              <div className="mt-8">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-5 h-5 rounded border ${
                      consent
                        ? "bg-[#37b7ab] border-[#37b7ab]"
                        : "border-gray-300 hover:border-[#37b7ab]"
                    } flex items-center justify-center cursor-pointer transition-colors`}
                    onClick={() => setConsent(!consent)}
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

export default SintraTripBookingModal;
