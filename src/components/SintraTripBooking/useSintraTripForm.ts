/**
 * Custom hook for Sintra Trip Booking form state and handlers
 */
import { useState, useCallback, useRef } from "react";
import { useResendBookingForm } from "../../hooks/resend/useResendBookingForm";
import { useNewsletterSubscription } from "../../hooks/useNewsletterSubscription";
import { pixelEvents } from "../../utils/analytics";
import type { SintraTripFormData, SintraTripItem } from "./types";
import { initialFormData } from "./types";

interface UseSintraTripFormProps {
  item: SintraTripItem | null;
  source: string;
  reservation: string;
  fromSetubal?: boolean;
  onClose: () => void;
}

export const useSintraTripForm = ({
  item,
  source,
  reservation,
  fromSetubal,
  onClose,
}: UseSintraTripFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [consent, setConsent] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSecondDatePicker, setShowSecondDatePicker] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<SintraTripFormData>(initialFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validDate, setValidDate] = useState(true);
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const { subscribe } = useNewsletterSubscription();

  const { submitForm, loading } = useResendBookingForm({
    onSuccess: () => {
      setShowSuccess(true);
      setErrorMessage("");
      setSubscribeToNewsletter(false);
    },
    onError: (error: string) => {
      setErrorMessage(error);
    },
    reservation,
  });

  const closeModal = useCallback(() => {
    onClose();
    setShowSuccess(false);
    setConsent(false);
    setShowDatePicker(false);
    setFormSubmitted(false);
    setFormData(initialFormData);
  }, [onClose]);

  const validateForm = useCallback((): boolean => {
    if (
      !formData?.date ||
      !formData.date ||
      !formData?.phone ||
      !formData.accompaniment ||
      formData.languages?.length <= 0 ||
      !formData.departureTime ||
      !formData.accompaniment ||
      formData.monuments?.length <= 0 ||
      formData.vehicles?.length <= 0 ||
      (formData.vehicles.includes("decapotable") &&
        !formData.tickets.decapotable) ||
      (formData.vehicles.includes("combi") && !formData.tickets.combi) ||
      (formData.vehicles.includes("van") && !formData.tickets.van) ||
      (formData.vehicles.includes("minibus") && !formData.tickets.minibus) ||
      (formData.vehicles.includes("bus") && !formData.tickets.bus)
    ) {
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormSubmitted(true);

      if (!validateForm()) {
        setValidDate(false);
        formRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (formData?.email && subscribeToNewsletter) {
        await subscribe(
          formData?.email,
          formData.name,
          formData.lastName,
          formData.phone
        );
      }

      submitForm({ ...formData, source, fromSetubal });
      pixelEvents.completeForm();

      if (item) {
        pixelEvents.completeBooking({
          id: item.id,
          type: item.type,
          name: item.name,
        });
      }
    },
    [
      formData,
      item,
      source,
      fromSetubal,
      subscribeToNewsletter,
      subscribe,
      submitForm,
      validateForm,
    ]
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormSubmitted(false);

      const keys = name.split(".");

      if (keys.length === 2) {
        const [parent, child] = keys;
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof SintraTripFormData] as Record<
              string,
              string
            >),
            [child]: value,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
      const value = e.target.value;
      setFormData((prevData) => {
        const currentValues = prevData[
          field as keyof typeof prevData
        ] as string[];
        if (currentValues.includes(value)) {
          return {
            ...prevData,
            [field]: currentValues.filter((item) => item !== value),
          };
        } else {
          return {
            ...prevData,
            [field]: [...currentValues, value],
          };
        }
      });
    },
    []
  );

  const handleDateChange = useCallback(
    (date: Date | undefined, field: string) => {
      if (date) {
        const formattedDate = date
          .toLocaleDateString("fr-FR")
          .split("/")
          .join("-");
        setFormData((prev) => ({
          ...prev,
          [field]: formattedDate,
        }));
      }
    },
    []
  );

  const handlePhoneChange = useCallback((value: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value || "",
    }));
  }, []);

  return {
    // Refs
    formRef,
    // State
    formData,
    consent,
    showDatePicker,
    showSecondDatePicker,
    formSubmitted,
    showSuccess,
    errorMessage,
    validDate,
    loading,
    subscribeToNewsletter,
    // Setters
    setConsent,
    setShowDatePicker,
    setShowSecondDatePicker,
    setSubscribeToNewsletter,
    // Handlers
    closeModal,
    handleSubmit,
    handleChange,
    handleCheckboxChange,
    handleDateChange,
    handlePhoneChange,
  };
};
