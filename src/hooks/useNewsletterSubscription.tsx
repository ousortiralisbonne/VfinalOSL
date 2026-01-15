import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface NewsletterSubscriptionResult {
  subscribe: (email: string, firstName?: string, lastName?: string, phone?: string) => Promise<void>;
  loading: boolean;
  message: string | null;
  withSuccess: boolean;
}

export const useNewsletterSubscription = (): NewsletterSubscriptionResult => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [withSuccess, setWithSuccess] = useState(false);
  const { t } = useTranslation();

  const subscribe = async (
    email: string,
    firstName = "",
    lastName = "",
    phone = ""
  ) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/contacts",
        {
          email,
          listIds: [22],
          updateEnabled: true,
          attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
            PHONE: phone,
          },
        },
        {
          headers: {
            "api-key": import.meta.env.VITE_BREVO_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage(t("subscription.success"));
        setWithSuccess(true);
      } else {
        setMessage(t("subscription.error.general"));
      }
    } catch (error) {
      console.error(error);
      setMessage(t("subscription.error.unableToSubscribe"));
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, message, withSuccess };
};
