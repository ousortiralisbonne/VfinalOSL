import { useState } from "react";
import axios from "axios";
import type {
  HomeFormData,
  HomeHookOptions,
  FormHookReturn,
} from "../../types/forms";

const useResendHomeForm = ({
  onSuccess,
  onError,
}: HomeHookOptions): FormHookReturn<HomeFormData> => {
  const [loading, setLoading] = useState(false);
  const to = import.meta.env.VITE_FORM_MAIL;

  const submitForm = async (formData: HomeFormData): Promise<void> => {
    setLoading(true);
    try {
      const emailPayload = {
        from: "noreply@ousortiralisbonne.com",
        to,
        subject: "Demande d'informations",
        html: `
          <div style="font-family: 'Helvetica, Arial, sans-serif'; color: #2a2765; padding: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Nouveau lead: Formulaire de contact page d'accueil</h1>
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
                ? `<p><strong style="display: inline-block; width: 190px;">Tel:</strong> ${formData.phone}</p>`
                : ""
            }
            ${
              formData?.company
                ? `<p><strong style="display: inline-block; width: 190px;">Entreprise:</strong> ${formData.company}</p>`
                : ""
            }
            ${
              formData?.website
                ? `<p><strong style="display: inline-block; width: 190px;">Site web:</strong> ${formData.website}</p>`
                : ""
            }
            ${
              formData?.message
                ? `<p><strong style="display: inline-block; width: 190px;">Message:</strong> ${formData.message}</p>`
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

export default useResendHomeForm;
