/**
 * Form type definitions for all booking and contact forms
 */

// ============================================
// Base Types
// ============================================

export type YesNo = "yes" | "no";

export type VehicleType =
  | "decapotable"
  | "combi"
  | "van"
  | "minibus"
  | "bus";

export type ExtraType = "skiNautique" | "wakeboard" | "bouee";

export type BoatOptionType =
  | "voilier6"
  | "catamaran8"
  | "voilier10"
  | "catamaran18";

// ============================================
// Base Form Data (common fields)
// ============================================

export interface BaseContactInfo {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface BaseDateInfo {
  date?: string;
  secondDate?: string;
}

// ============================================
// Booking Form Data
// ============================================

export interface VehicleFormulas {
  van?: string;
  minibus?: string;
}

export interface TicketOptions {
  decapotable?: YesNo;
  combi?: YesNo;
  van?: YesNo;
  minibus?: YesNo;
  bus?: YesNo;
}

export interface BookingFormData extends BaseContactInfo, BaseDateInfo {
  // Location & Time
  pickupLocation?: string;
  departureTime?: string;
  timeSlot?: string;
  departureCity?: string;

  // Languages
  language?: string;
  languages?: string[];

  // Accompaniment
  accompaniment?: string;
  monuments?: string[];

  // Vehicles
  vehicles?: VehicleType[];
  vehicleFormulas?: VehicleFormulas;
  tickets?: TicketOptions;

  // Participants
  participants18to64?: number;
  participants6to17?: number;
  participants65plus?: number;
  participantsUnder6?: number;
  numberOfPeople?: number;

  // Dining
  receiveMenu?: YesNo;
  culinaryPreferences?: string;
  dietaryRestrictions?: string;
  dinnerIncluded?: YesNo;

  // Reservation details
  reservationType?: string;
  privatizationInfo?: string;
  specialRequests?: string;
  message?: string;

  // Club/Event specific
  entryType?: string;
  musicPreferences?: string;

  // Boat specific
  source?: string;
  withBoardNight?: boolean;
  fromSetubal?: boolean;
  boatLicense?: string;
  withEquipage?: YesNo;
  boatChoice?: string;
  sunsetCruise?: string[];
  extras?: ExtraType[];

  // Promo
  promoCode?: string;
}

// ============================================
// Cruise Form Data
// ============================================

export interface CruiseFormData extends BaseDateInfo {
  participants?: number;
  departureTime?: string;
  duration?: string;
  boatTypes?: string[];
  criteria?: string[];
  event?: string;
  extras?: string[];
  experiences?: string[];
}

// ============================================
// Romantic Cruise Form Data
// ============================================

export interface RomanticFormData extends BaseContactInfo, BaseDateInfo {
  timeSlot?: string;
  boatOptions?: BoatOptionType[];
  nightOnBoard?: boolean;
  specialRequest?: string;
  promoCode?: string;
}

// ============================================
// Transfer Form Data
// ============================================

export interface TransferFormData extends BaseContactInfo {
  start?: string;
  destination?: string;
  date?: string;
  time?: string;
  passengers?: number;
  vehicleType?: string;
  luggage?: string;
  language?: string;
  guidLanguage?: string;
  childSeat?: string;
  comments?: string;
  returnDate?: string;
}

// ============================================
// Custom Tours Form Data
// ============================================

export interface CustomToursFormData extends BaseContactInfo {
  arrivalDate?: string;
  departureDate?: string;
  totalBudget?: string;
  groupType?: string;
  adultsCount?: number;
  seniorsCount?: number;
  minorsCount?: number;
  mobilityInfo?: string;
  tellUsMore?: string;
  contactPreference?: YesNo;
  preferredContactDay?: string;
}

// ============================================
// Home Contact Form Data
// ============================================

export interface HomeFormData extends BaseContactInfo {
  company?: string;
  website?: string;
  message?: string;
}

// ============================================
// Favorites Form Data
// ============================================

export interface FavoritesFormData extends BaseContactInfo {
  date?: string;
  time?: string;
  guests?: number;
  message?: string;
  selectedFavorites?: string;
}

// ============================================
// Hook Options Types
// ============================================

export interface FormHookCallbacks {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export interface BookingHookOptions extends FormHookCallbacks {
  reservation: string;
}

export interface CruiseHookOptions extends FormHookCallbacks {
  reservation: string;
}

export interface RomanticHookOptions extends FormHookCallbacks {
  reservation: string;
}

export type TransferHookOptions = FormHookCallbacks;
export type CustomToursHookOptions = FormHookCallbacks;
export type HomeHookOptions = FormHookCallbacks;
export type FavoritesHookOptions = FormHookCallbacks;

// ============================================
// Hook Return Types
// ============================================

export interface FormHookReturn<T> {
  submitForm: (formData: T) => Promise<void>;
  loading: boolean;
}

// ============================================
// Email Payload Types
// ============================================

export interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// ============================================
// Vehicle and Extras Label Maps
// ============================================

export const VEHICLE_LABELS: Record<VehicleType, string> = {
  decapotable: "Décapotable Opel Astra jusqu'à 3 passagers",
  combi: "Combi Volkswagen de 1970 jusqu'à 5 passagers",
  van: "Van jusqu'à 8 passagers",
  minibus: "Mini-Bus de 9 à 19 passagers",
  bus: "Bus de 23 à 63 passagers",
};

export const EXTRAS_LABELS: Record<ExtraType, string> = {
  skiNautique: "Ski Nautique",
  wakeboard: "Wakeboard",
  bouee: "Bouée",
};

export const BOAT_OPTIONS_LABELS: Record<BoatOptionType, string> = {
  voilier6: "Voilier 6 places à partir de 170€ pour 2h30 (coucher de soleil + 30€)",
  catamaran8: "Catamaran 8 places à partir de 180€ pour 2h",
  voilier10: "Voilier 10 places à partir de 300€ pour 2h",
  catamaran18: "Catamaran 18 places à partir de 650€ pour 2h",
};
