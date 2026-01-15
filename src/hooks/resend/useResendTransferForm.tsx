import { useState } from "react";
import axios from "axios";
import type {
  TransferFormData,
  TransferHookOptions,
  FormHookReturn,
} from "../../types/forms";

const useResendTransferForm = ({
  onSuccess,
  onError,
}: TransferHookOptions): FormHookReturn<TransferFormData> => {
  const [loading, setLoading] = useState(false);

  const to = import.meta.env.VITE_FORM_MAIL;

  const submitForm = async (formData: TransferFormData): Promise<void> => {
    setLoading(true);
    try {
      const emailPayload = {
        from: "noreply@ousortiralisbonne.com",
        to,
        subject: `Demande de transfert de ${formData?.start} à  ${formData?.destination}`,
        html: `
          <div style="font-family: 'Helvetica, Arial, sans-serif'; color: #2a2765; padding: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Nouvelle demande de transfert</h1>
            ${
              formData?.start
                ? `<p><strong style="display: inline-block; width: 190px;">Départ:</strong> ${formData.start}</p>`
                : ""
            }
            ${
              formData?.destination
                ? `<p><strong style="display: inline-block; width: 190px;">Destination:</strong> ${formData.destination}</p>`
                : ""
            }
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
              formData?.passengers
                ? `<p><strong style="display: inline-block; width: 190px;">Nombre de passagers:</strong> ${formData.passengers}</p>`
                : ""
            }
            ${
              formData?.vehicleType
                ? `<p><strong style="display: inline-block; width: 190px;">Type de véhicule:</strong> ${formData.vehicleType}</p>`
                : ""
            }
          ${
            formData?.luggage
              ? `<p><strong style="display: inline-block; width: 190px;">Bagages:</strong> ${formData.luggage}</p>`
              : ""
          }
          ${
            formData?.language
              ? `<p><strong style="display: inline-block; width: 190px;">Langue:</strong> ${formData.language}</p>`
              : ""
          }
          ${
            formData?.guidLanguage
              ? `<p><strong style="display: inline-block; width: 190px;">Langue du guide:</strong> ${formData.guidLanguage}</p>`
              : ""
          }
            ${
              formData?.childSeat
                ? `<p><strong style="display: inline-block; width: 190px;">Siège enfant:</strong> ${formData.childSeat}</p>`
                : ""
            }
            ${
              formData?.comments
                ? `<p><strong style="display: inline-block; width: 190px;">Commentaires:</strong> ${formData.comments}</p>`
                : ""
            }
            ${
              formData?.firstName
                ? `<p><strong style="display: inline-block; width: 190px;">Prénom:</strong> ${formData.firstName}</p>`
                : ""
            }
            ${
              formData?.lastName
                ? `<p><strong style="display: inline-block; width: 190px;">Nom:</strong> ${formData.firstName}</p>`
                : ""
            }
            ${
              formData?.email
                ? `<p><strong style="display: inline-block; width: 190px;">E-mail:</strong> ${formData.email}</p>`
                : ""
            }
            ${
              formData?.phone
                ? `<p><strong style="display: inline-block; width: 190px;">Téléphone:</strong> ${formData.phone}</p>`
                : ""
            }
            ${
              formData?.returnDate
                ? `<p><strong style="display: inline-block; width: 190px;">Avec date transfert du retour ? </strong> Oui</p>`
                : `<p><strong style="display: inline-block; width: 190px;">Avec date transfert du retour ? </strong> Non</p>`
            }
            ${
              formData?.returnDate
                ? `<p><strong style="display: inline-block; width: 190px;">Date du transfert du retour:</strong> ${formData.returnDate}</p>`
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

export default useResendTransferForm;
