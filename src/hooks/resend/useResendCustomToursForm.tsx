import { useState } from "react";
import axios from "axios";
import type {
  CustomToursFormData,
  CustomToursHookOptions,
  FormHookReturn,
} from "../../types/forms";

const useResendCustomToursForm = ({
  onSuccess,
  onError,
}: CustomToursHookOptions): FormHookReturn<CustomToursFormData> => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (formData: CustomToursFormData): Promise<void> => {
    setLoading(true);
    const to = import.meta.env.VITE_FORM_MAIL;

    try {
      const emailPayload = {
        from: "noreply@ousortiralisbonne.com",
        to,
        subject: `Demande de tour personnalisé : ${formData.groupType}`,
        html: `
          <div style="font-family: 'Helvetica, Arial, sans-serif'; color: #2a2765; padding: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Nouvelle demande de tour personnalisé</h1>
            ${
              formData?.arrivalDate
                ? `<p><strong style="display: inline-block; width: 190px;">Date d'arrivée:</strong> ${formData.arrivalDate}</p>`
                : ""
            }
            ${
              formData?.departureDate
                ? `<p><strong style="display: inline-block; width: 190px;">Date de départ:</strong> ${formData.departureDate}</p>`
                : ""
            }
            ${
              formData?.totalBudget
                ? `<p><strong style="display: inline-block; width: 190px;">Budget total:</strong> ${formData.totalBudget}</p>`
                : ""
            }
            ${
              formData?.groupType
                ? `<p><strong style="display: inline-block; width: 190px;">Type de groupe:</strong> ${formData.groupType}</p>`
                : ""
            }
            ${
              formData?.adultsCount
                ? `<p><strong style="display: inline-block; width: 190px;">Nombre d'adultes:</strong> ${formData.adultsCount}</p>`
                : ""
            }
            ${
              formData?.seniorsCount
                ? `<p><strong style="display: inline-block; width: 190px;">Nombre de seniors:</strong> ${formData.seniorsCount}</p>`
                : ""
            }
            ${
              formData?.minorsCount
                ? `<p><strong style="display: inline-block; width: 190px;">Nombre de mineurs:</strong> ${formData.minorsCount}</p>`
                : ""
            }
            ${
              formData?.mobilityInfo
                ? `<p><strong style="display: inline-block; width: 190px;">Informations sur la mobilité:</strong> ${formData.mobilityInfo}</p>`
                : ""
            }
            ${
              formData?.firstName
                ? `<p><strong style="display: inline-block; width: 190px;">Prénom:</strong> ${formData.firstName}</p>`
                : ""
            }
            ${
              formData?.lastName
                ? `<p><strong style="display: inline-block; width: 190px;">Nom:</strong> ${formData.lastName}</p>`
                : ""
            }
            ${
              formData?.tellUsMore
                ? `<p><strong style="display: inline-block; width: 190px;">Plus d'informations:</strong> ${formData.tellUsMore}</p>`
                : ""
            }
            ${
              formData?.contactPreference
                ? `<p><strong style="display: inline-block; width: 190px;">Souhaite être contacté ? :</strong> ${
                    formData.contactPreference === "yes" ? "Oui" : "Non"
                  }</p>`
                : ""
            }
            ${
              formData?.preferredContactDay
                ? `<p><strong style="display: inline-block; width: 190px;">Souhaite être contacté le :</strong> ${formData.preferredContactDay}</p>`
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

export default useResendCustomToursForm;
