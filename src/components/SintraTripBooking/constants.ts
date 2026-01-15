/**
 * Constants and options for Sintra Trip Booking form
 */
import { TFunction } from "i18next";
import type { SelectOption } from "./types";

export const getLanguageOptions = (t: TFunction): SelectOption[] => [
  { value: "Allemand", label: t("bookingModal.languages.german") },
  { value: "Anglais", label: t("bookingModal.languages.english") },
  { value: "Espagnol", label: t("bookingModal.languages.spanish") },
  { value: "Français", label: t("bookingModal.languages.french") },
  { value: "Italien", label: t("bookingModal.languages.italian") },
  { value: "Portugais", label: t("bookingModal.languages.portuguese") },
  { value: "N'importe lequel", label: t("bookingModal.languages.any") },
  { value: "Autre", label: t("bookingModal.languages.other") },
];

export const getDepartureTimeOptions = (t: TFunction): SelectOption[] => [
  { value: "8h15", label: t("bookingModal.departureTime.8h15") },
  { value: "9h30", label: t("bookingModal.departureTime.9h30") },
  { value: "10h30", label: t("bookingModal.departureTime.10h30") },
  { value: "11h30", label: t("bookingModal.departureTime.11h30") },
  { value: "other", label: t("bookingModal.departureTime.other") },
];

export const getAccompanimentOptions = (t: TFunction): SelectOption[] => [
  { value: "Avec Chauffeur", label: t("bookingModal.accompaniment.driver") },
  {
    value: "Avec Chauffeur-Guide",
    label: t("bookingModal.accompaniment.driverGuide"),
  },
];

export const getMonumentOptions = (t: TFunction): SelectOption[] => [
  {
    value: t("bookingModal.monuments.palacioPenaInterior", { lng: "fr" }),
    label: t("bookingModal.monuments.palacioPenaInterior"),
  },
  {
    value: t("bookingModal.monuments.palacioPenaGarden", { lng: "fr" }),
    label: t("bookingModal.monuments.palacioPenaGarden"),
  },
  {
    value: t("bookingModal.monuments.quintaRegaleira", { lng: "fr" }),
    label: t("bookingModal.monuments.quintaRegaleira"),
  },
  {
    value: t("bookingModal.monuments.palacioMonserrate", { lng: "fr" }),
    label: t("bookingModal.monuments.palacioMonserrate"),
  },
  {
    value: t("bookingModal.monuments.palacioNacional", { lng: "fr" }),
    label: t("bookingModal.monuments.palacioNacional"),
  },
  {
    value: t("bookingModal.monuments.casteloMorros", { lng: "fr" }),
    label: t("bookingModal.monuments.casteloMorros"),
  },
  {
    value: t("bookingModal.monuments.palacioQueluz", { lng: "fr" }),
    label: t("bookingModal.monuments.palacioQueluz"),
  },
  {
    value: t("bookingModal.monuments.historicalCenter", { lng: "fr" }),
    label: t("bookingModal.monuments.historicalCenter"),
  },
  {
    value: t("bookingModal.monuments.none", { lng: "fr" }),
    label: t("bookingModal.monuments.none"),
  },
];

export const getVehicleOptions = (t: TFunction): SelectOption[] => [
  { value: "decapotable", label: t("vehicleOptions.decapotable") },
  { value: "combi", label: t("vehicleOptions.combi") },
  { value: "van", label: t("vehicleOptions.van") },
  { value: "minibus", label: t("vehicleOptions.minibus") },
  { value: "bus", label: t("vehicleOptions.bus") },
];

export const getVehicleFormulas = (t: TFunction) => ({
  van: [
    {
      value: t("vehicleFormulas.van.2", { lng: "fr" }),
      label: t("vehicleFormulas.van.2"),
    },
    {
      value: t("vehicleFormulas.van.3", { lng: "fr" }),
      label: t("vehicleFormulas.van.3"),
    },
    {
      value: t("vehicleFormulas.van.4", { lng: "fr" }),
      label: t("vehicleFormulas.van.4"),
    },
    {
      value: t("vehicleFormulas.van.5", { lng: "fr" }),
      label: t("vehicleFormulas.van.5"),
    },
    {
      value: t("vehicleFormulas.van.6", { lng: "fr" }),
      label: t("vehicleFormulas.van.6"),
    },
    {
      value: t("vehicleFormulas.van.7", { lng: "fr" }),
      label: t("vehicleFormulas.van.7"),
    },
  ],
  minibus: [
    {
      value: t("vehicleFormulas.minibus.16", { lng: "fr" }),
      label: t("vehicleFormulas.minibus.16"),
    },
    {
      value: t("vehicleFormulas.minibus.19", { lng: "fr" }),
      label: t("vehicleFormulas.minibus.19"),
    },
  ],
});
