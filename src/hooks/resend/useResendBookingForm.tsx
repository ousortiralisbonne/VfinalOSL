import { useState } from "react";
import axios from "axios";
import type {
  BookingFormData,
  BookingHookOptions,
  FormHookReturn,
  VehicleType,
  ExtraType,
  VEHICLE_LABELS,
  EXTRAS_LABELS,
} from "../../types/forms";

const vehicles: Record<VehicleType, string> = {
  decapotable: "Décapotable Opel Astra jusqu'à 3 passagers",
  combi: "Combi Volkswagen de 1970 jusqu'à 5 passagers",
  van: "Van jusqu'à 8 passagers",
  minibus: "Mini-Bus de 9 à 19 passagers",
  bus: "Bus de 23 à 63 passagers",
};

const extras: Record<ExtraType, string> = {
  skiNautique: "Ski Nautique",
  wakeboard: "Wakeboard",
  bouee: "Bouée",
};

export const useResendBookingForm = ({
  onSuccess,
  onError,
  reservation,
}: BookingHookOptions): FormHookReturn<BookingFormData> => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (formData: BookingFormData): Promise<void> => {
    const to = import.meta.env.VITE_FORM_MAIL;
    const selectedVehicles = formData?.vehicles
      ? formData.vehicles
          .map((key) => vehicles[key] ?? key)
          .join(", ")
      : "--";

    const selectedExtras = formData?.extras
      ? formData.extras
          .map((key) => extras[key] ?? key)
          .join(", ")
      : "--";

    setLoading(true);
    try {
      const emailPayload = {
        from: "noreply@ousortiralisbonne.com",
        to,
        subject: `Demande de reservation : ${reservation}`,
        html: `
           <div style="font-family: 'Helvetica, Arial, sans-serif'; color: #2a2765; padding: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Nouvelle demande de réservation : ${reservation}</h1>
            ${
              formData?.date
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Date:</strong> ${formData.date}</p>`
                : ""
            }
            ${
              formData?.secondDate
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Autre date:</strong> ${formData.secondDate}</p>`
                : ""
            }
            ${
              formData?.pickupLocation
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Lieu de Prise en Charge:</strong> ${formData.pickupLocation}</p>`
                : ""
            }
            ${
              formData?.languages
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Langue de l'Accompagnant:</strong> ${formData.languages.join(
                    ", "
                  )}</p>`
                : ""
            }
            ${
              formData?.departureTime
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Heure de Départ:</strong> ${formData.departureTime}</p>`
                : ""
            }
            ${
              formData?.accompaniment
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Accompagnement:</strong> ${formData.accompaniment}</p>`
                : ""
            }
            ${
              formData?.monuments
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Monuments:</strong> ${formData.monuments.join(
                    ", "
                  )}</p>`
                : ""
            }
            ${
              formData?.vehicles
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Véhicules:</strong> ${selectedVehicles}</p>`
                : ""
            }
            ${
              formData?.vehicleFormulas?.van
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Formule de Véhicule (Van):</strong> ${formData.vehicleFormulas.van}</p>`
                : ""
            }
            ${
              formData?.vehicleFormulas?.minibus
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Formule de Véhicule (Minibus):</strong> ${formData.vehicleFormulas.minibus}</p>`
                : ""
            }
            ${
              formData?.tickets?.decapotable
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Billets Décapotable:</strong> ${
                    formData.tickets.decapotable === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.tickets?.combi
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Billets Combi:</strong> ${
                    formData.tickets.combi === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.tickets?.van
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Billets Van:</strong> ${
                    formData.tickets.van === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.tickets?.minibus
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Billets Minibus:</strong> ${
                    formData.tickets.minibus === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.tickets?.bus
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Billets Bus:</strong> ${
                    formData.tickets.bus === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.name
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Prénom:</strong> ${formData.name}</p>`
                : ""
            }
            ${
              formData?.lastName
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Nom:</strong> ${formData.lastName}</p>`
                : ""
            }
            ${
              formData?.email
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Email:</strong> ${formData.email}</p>`
                : ""
            }
            ${
              formData?.phone
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Tel:</strong> ${formData.phone}</p>`
                : ""
            }
            ${
              formData?.message
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Message:</strong> ${formData.message}</p>`
                : ""
            }
            ${
              formData?.participants18to64
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Participants entre 18 et 64 ans:</strong> ${formData.participants18to64}</p>`
                : ""
            }
            ${
              formData?.participants6to17
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Participants entre 6 et 17 ans:</strong> ${formData.participants6to17}</p>`
                : ""
            }
            ${
              formData?.participants65plus
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Participants de 65 ans et plus:</strong> ${formData.participants65plus}</p>`
                : ""
            }
            ${
              formData?.participantsUnder6
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Participants de moins de 6 ans:</strong> ${formData.participantsUnder6}</p>`
                : ""
            }
            ${
              formData?.receiveMenu
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Recevoir le menu de groupe:</strong> ${
                    formData.receiveMenu === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.privatizationInfo
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Informations sur la privatisation:</strong> ${formData.privatizationInfo}</p>`
                : ""
            }
            ${
              formData?.reservationType
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Type de réservation:</strong> ${formData.reservationType}</p>`
                : ""
            }
            ${
              formData?.culinaryPreferences
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Préférences culinaires:</strong> ${formData.culinaryPreferences}</p>`
                : ""
            }
            ${
              formData?.specialRequests
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Demandes spécifiques:</strong> ${formData.specialRequests}</p>`
                : ""
            }
            ${
              formData?.dinnerIncluded
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Dîner inclus:</strong> ${
                    formData.dinnerIncluded === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.dietaryRestrictions
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Restrictions alimentaires:</strong> ${formData.dietaryRestrictions}</p>`
                : ""
            }
            ${
              formData?.entryType
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Type d'entrée:</strong> ${formData.entryType}</p>`
                : ""
            }
            ${
              formData?.musicPreferences
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Préférences musicales:</strong> ${formData.musicPreferences}</p>`
                : ""
            }
            ${
              formData?.language
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Langue:</strong> ${formData.language}</p>`
                : ""
            }
            ${
              formData?.source === "romantic"
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Avec Nuit à bord?</strong> ${
                    formData?.withBoardNight ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.fromSetubal && !formData?.boatLicense
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Avec équipage?</strong> ${
                    formData?.withEquipage === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
                 ${
                   formData?.timeSlot
                     ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Créneau horaire:</strong> ${formData.timeSlot}</p>`
                     : ""
                 }
            ${
              formData?.sunsetCruise && formData.sunsetCruise.length > 0
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Croisière au coucher du soleil:</strong> ${formData.sunsetCruise.join(
                    ", "
                  )}</p>`
                : ""
            }
            ${
              formData?.promoCode
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Code promo:</strong> ${formData.promoCode}</p>`
                : ""
            }
                 ${
                   formData?.numberOfPeople
                     ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Nombre de personnes:</strong> ${formData.numberOfPeople}</p>`
                     : ""
                 }
            ${
              formData?.departureCity
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Ville de départ:</strong> ${formData.departureCity}</p>`
                : ""
            }
            ${
              formData?.boatChoice
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Choix du bateau:</strong> ${formData.boatChoice}</p>`
                : ""
            }
            ${
              formData?.boatLicense
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Permis bateau ou avec équipage:</strong> ${
                    formData.boatLicense.charAt(0).toUpperCase() +
                    formData.boatLicense.slice(1)
                  }</p>`
                : ""
            }
            ${
              formData?.extras && formData.extras.length > 0
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Extras:</strong> ${selectedExtras}</p>`
                : ""
            }
          </div>
        `,
      };

      const response = await axios.post("/api/emails", emailPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        onSuccess();
      } else {
        onError("Failed to send the form.");
      }
    } catch {
      onError("An error occurred while sending the form.");
    } finally {
      setLoading(false);
    }
  };

  return { submitForm, loading };
};
