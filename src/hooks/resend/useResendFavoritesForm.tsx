import { useState } from "react";
import axios from "axios";
import type {
  FavoritesFormData,
  FavoritesHookOptions,
  FormHookReturn,
} from "../../types/forms";

const useResendFavoritesForm = ({
  onSuccess,
  onError,
}: FavoritesHookOptions): FormHookReturn<FavoritesFormData> => {
  const [loading, setLoading] = useState(false);
  const to = import.meta.env.VITE_FORM_MAIL;

  const submitForm = async (formData: FavoritesFormData): Promise<void> => {
    setLoading(true);
    try {
      const emailPayload = {
        from: "noreply@ousortiralisbonne.com",
        to,
        subject: `Demande de réservation : ${formData.selectedFavorites}`,
        html: `
          <div style="font-family: 'Helvetica, Arial, sans-serif'; color: #2a2765; padding: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Nouvelle demande de réservation à partir des favoris</h1>
            ${
              formData?.date
                ? `<p><strong style="display: inline-block; width: 190px;">Date:</strong> ${formData.date}</p>`
                : ""
            }
            ${
              formData?.time
                ? `<p><strong style="display: inline-block; width: 190px;">Heure:</strong> ${formData.time}</p>`
                : ""
            }
            ${
              formData?.guests
                ? `<p><strong style="display: inline-block; width: 190px;">Nombre de personnes:</strong> ${formData.guests}</p>`
                : ""
            }
            ${
              formData?.name
                ? `<p><strong style="display: inline-block; width: 190px;">Prénom:</strong> ${formData.name}</p>`
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
              formData?.email
                ? `<p><strong style="display: inline-block; width: 190px;">Email:</strong> ${formData.email}</p>`
                : ""
            }
            ${
              formData?.phone
                ? `<p><strong style="display: inline-block; width: 190px;">Téléphone:</strong> ${formData.phone}</p>`
                : ""
            }
            ${
              formData?.message
                ? `<p><strong style="display: inline-block; width: 190px;">Message:</strong> ${formData.message}</p>`
                : ""
            }
            ${
              formData?.selectedFavorites
                ? `<p><strong style="display: inline-block; width: 190px;">Sélections:</strong> ${formData.selectedFavorites}</p>`
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

export default useResendFavoritesForm;
