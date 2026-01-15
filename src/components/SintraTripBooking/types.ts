/**
 * Types for Sintra Trip Booking
 */

export interface SintraTripItem {
  id: string;
  name: string;
  type: string;
  image?: string;
  title?: string;
}

export interface SintraTripBookingModalProps {
  item: SintraTripItem | null;
  source?: string;
  reservation: string;
  fromSetubal?: boolean;
  onClose: () => void;
}

export interface VehicleTickets {
  decapotable: string;
  combi: string;
  van: string;
  minibus: string;
  bus: string;
}

export interface VehicleFormulas {
  van: string;
  minibus: string;
}

export interface SintraTripFormData {
  date: string;
  secondDate: string;
  pickupLocation: string;
  languages: string[];
  departureTime: string;
  accompaniment: string;
  monuments: string[];
  vehicles: string[];
  vehicleFormulas: VehicleFormulas;
  tickets: VehicleTickets;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  participants18to64: string;
  participants6to17: string;
  participants65plus: string;
  participantsUnder6: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export const initialFormData: SintraTripFormData = {
  date: "",
  secondDate: "",
  pickupLocation: "",
  languages: [],
  departureTime: "",
  accompaniment: "",
  monuments: [],
  vehicles: [],
  vehicleFormulas: {
    van: "",
    minibus: "",
  },
  tickets: {
    decapotable: "",
    combi: "",
    van: "",
    minibus: "",
    bus: "",
  },
  name: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  participants18to64: "",
  participants6to17: "",
  participants65plus: "",
  participantsUnder6: "",
};
