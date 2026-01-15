import { useState } from "react";
import axios from "axios";
import type {
  RomanticFormData,
  RomanticHookOptions,
  FormHookReturn,
  BoatOptionType,
} from "../../types/forms";

const boatOptions: Record<BoatOptionType, string> = {
  voilier6:
    "Voilier 6 places à partir de 170€ pour 2h30 (coucher de soleil + 30€)",
  catamaran8: "Catamaran 8 places à partir de 180€ pour 2h",
  voilier10: "Voilier 10 places à partir de 300€ pour 2h",
  catamaran18: "Catamaran 18 places à partir de 650€ pour 2h",
};

export const useResendRomanticForm = ({
  onSuccess,
  onError,
  reservation,
}: RomanticHookOptions): FormHookReturn<RomanticFormData> => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (formData: RomanticFormData): Promise<void> => {
    const to = import.meta.env.VITE_FORM_MAIL;
    const selectedBoats = formData?.boatOptions
      ? formData.boatOptions
          .map((key) => boatOptions[key] ?? key)
          .join(", ")
      : "--";

    setLoading(true);
    try {
      const emailPayload = {
        from: "noreply@ousortiralisbonne.com",
        to,
        subject: `Demande de réservation : Croisière romantique sur mesure`,
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
              formData?.timeSlot
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Créneau souhaité:</strong> ${formData.timeSlot}</p>`
                : ""
            }
            ${
              formData?.boatOptions
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Embarcation(s): ?</strong> ${selectedBoats}</p>`
                : ""
            }
            ${
              formData?.nightOnBoard
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Nuit à bord:</strong> Oui</p>`
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
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Téléphone:</strong> ${formData.phone}</p>`
                : ""
            }
            ${
              formData?.specialRequest
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Demande particulière:</strong> ${formData.specialRequest}</p>`
                : ""
            }
            ${
              formData?.promoCode
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Code promo:</strong> ${formData.promoCode}</p>`
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
