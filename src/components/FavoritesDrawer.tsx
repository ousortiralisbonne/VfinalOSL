// src/components/FavoritesDrawer.tsx

import React, { useState } from "react";
import {
  X,
  Heart,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  Mail,
  Phone,
  MessageSquare,
  Check,
} from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useTranslation } from "react-i18next";
import useResendFavoritesForm from "../hooks/resend/useResendFavoritesForm";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesDrawer = ({ isOpen, onClose }: FavoritesDrawerProps) => {
  const { t } = useTranslation();
  const [consent, setConsent] = useState(false);
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    selectedFavorites: favorites
      .map((fav) => fav?.name || fav?.title)
      .join(" | "),
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { submitForm, loading } = useResendFavoritesForm({
    onSuccess: () => {
      setShowSuccess(true);
      setErrorMessage("");
      clearFavorites();
    },
    onError: (error: any) => {
      setErrorMessage(error);
    },
  });

  const closeModal = () => {
    onClose();
    setShowSuccess(false);
    setFormData({
      date: "",
      time: "",
      guests: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      selectedFavorites: favorites
        .map((fav) => fav?.name || fav?.title)
        .join(" | "),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = () => {
    // Check if selection contains only restaurants and/or hotels
    const onlyRedirectItems = favorites.every(
      (item) => item.type === "Restaurant" || item.type === "Hôtel"
    );

    if (onlyRedirectItems) {
      // Redirect to external sites
      window.open("https://www.thefork.com/restaurant/lisboa", "_blank");
    } else {
      // Show form for boats and guided tours
      setShowBookingForm(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

      {/* Drawer */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 pt-safe">
          <h2 className="text-lg md:text-xl font-bold text-[#2a2765] font-garage flex items-center">
            <Heart className="h-5 w-5 mr-2 text-[#ea3e4e]" />
            {t("favoritesDrawer.title")} ({favorites.length})
          </h2>
          <button
            onClick={closeModal}
            className="p-2.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fermer"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4 h-[calc(100vh-80px)] overflow-y-auto">
          {favorites.length === 0 && !showSuccess ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {t("favoritesDrawer.noFavorites")}
              </p>
              {showSuccess ? (
                <div className="bg-green-50 text-green-800 rounded-lg p-6 text-center">
                  {t("bookingModal.success.message")}
                </div>
              ) : null}
            </div>
          ) : showBookingForm ? (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#2a2765] mb-4">
                {t("favoritesDrawer.bookingForm.title")}
              </h3>
              {showSuccess ? (
                <div className="bg-green-50 text-green-800 rounded-lg p-6 text-center">
                  {t("bookingModal.success.message")}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("favoritesDrawer.bookingForm.fields.date")}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition min-h-[48px]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("favoritesDrawer.bookingForm.fields.time")}
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
                        {t("favoritesDrawer.bookingForm.fields.guests")}
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
                        {t("firstname")}
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
                        {t("lastname")}
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
                        {t("favoritesDrawer.bookingForm.fields.email")}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("favoritesDrawer.bookingForm.fields.phone")}
                    </label>
                    <div className="relative">
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
                        className="w-full text-base min-h-[48px]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("favoritesDrawer.bookingForm.fields.message")}
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full pl-12 pr-4 py-3 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#37b7ab] focus:border-[#37b7ab] transition resize-none"
                        placeholder={t(
                          "favoritesDrawer.bookingForm.fields.messagePlaceholder"
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
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

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 safe-area-bottom">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 px-6 py-4 border-2 border-[#2f2d69] text-[#2f2d69] rounded-full hover:bg-[#2f2d69] hover:text-white active:bg-[#252157] transition font-garage tracking-wide text-base min-h-[52px]"
                    >
                      {t("favoritesDrawer.bookingForm.buttons.back")}
                    </button>
                    <button
                      type="submit"
                      className={`flex-1 bg-[#2f2d69] text-white px-6 py-4 rounded-full hover:bg-[#252157] active:bg-[#1e1a47] transition font-garage tracking-wide text-base min-h-[52px] ${
                        !consent ? "cursor-not-allowed opacity-60" : ""
                      }`}
                      disabled={!consent || loading}
                    >
                      {loading
                        ? "Envoi..."
                        : t("favoritesDrawer.bookingForm.buttons.confirm")}
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-50 text-red-800 rounded-lg p-6 text-center">
                      {errorMessage}
                    </div>
                  )}
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={`${item.name} - ${item.type} à Lisbonne`}
                      loading="lazy"
                      width="96"
                      height="96"
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-[#2a2765] mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {item.type}
                          </p>
                          {item.price && (
                            <p className="text-[#37b7ab] font-semibold">
                              {item.price}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFavorite(item.id)}
                          className="text-gray-400 hover:text-[#ea3e4e] transition-colors"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {favorites.length > 0 && !showBookingForm && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 safe-area-bottom">
            <button
              onClick={handleBooking}
              className="w-full bg-[#2f2d69] text-white px-6 py-4 rounded-full hover:bg-[#252157] active:bg-[#1e1a47] transition font-garage tracking-wide text-base flex items-center justify-center group min-h-[52px]"
            >
              <span className="font-semibold">{t("favoritesDrawer.bookSelection")}</span>
              <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesDrawer;
