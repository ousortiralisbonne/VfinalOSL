import { useState } from "react";
import axios from "axios";
import type {
  CruiseFormData,
  CruiseHookOptions,
  FormHookReturn,
} from "../../types/forms";

export const useResendCruiseForm = ({
  onSuccess,
  onError,
  reservation,
}: CruiseHookOptions): FormHookReturn<CruiseFormData> => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (formData: CruiseFormData): Promise<void> => {
    const to = import.meta.env.VITE_FORM_MAIL;
    const selectedBoatTypes = formData?.boatTypes
      ? formData.boatTypes.join(", ")
      : "--";
    const selectedCriteria = formData?.criteria
      ? formData.criteria.join(", ")
      : "--";
    const selectedExtras = formData?.extras
      ? formData.extras.join(", ")
      : "--";
    const selectedExperiences = formData?.experiences
      ? formData.experiences.join(", ")
      : "--";

    setLoading(true);
    try {
      const emailPayload = {
        from: "noreply@ousortiralisbonne.com",
        to,
        subject: `Demande de réservation : ${reservation}`,
        html: `
          <div style="font-family: 'Helvetica, Arial, sans-serif'; color: #2a2765; padding: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Nouvelle demande de réservation : ${reservation}</h1>
            ${
              formData?.participants
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Nombre de participants:</strong> ${formData.participants}</p>`
                : ""
            }
            ${
              formData?.date
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Date:</strong> ${formData.date}</p>`
                : ""
            }
            ${
              formData?.secondDate
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Autre date possible:</strong> ${formData.secondDate}</p>`
                : ""
            }
            ${
              formData?.departureTime
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Heure de départ:</strong> ${formData.departureTime}</p>`
                : ""
            }
            ${
              formData?.duration
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Nombre d'heures:</strong> ${formData.duration}</p>`
                : ""
            }
            ${
              formData?.boatTypes
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Type(s) d'embarcation(s):</strong> ${selectedBoatTypes}</p>`
                : ""
            }
            ${
              formData?.criteria
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Critères importants:</strong> ${selectedCriteria}</p>`
                : ""
            }
            ${
              formData?.event
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Événement particulier:</strong> ${formData.event}</p>`
                : ""
            }
            ${
              formData?.extras
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Extras:</strong> ${selectedExtras}</p>`
                : ""
            }
            ${
              formData?.experiences
                ? `<p style="line-height: 1.6;"><strong style="display: inline-block; width: 220px;">Expériences:</strong> ${selectedExperiences}</p>`
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
