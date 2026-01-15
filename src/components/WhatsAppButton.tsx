import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhatsAppButton = () => {
  const { t } = useTranslation();
  const phoneNumber = "+351966998827";
  const message = t("whatsapp.defaultMessage");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1da851] transition-colors z-50 flex items-center group"
      aria-label={t("whatsapp.ariaLabel")}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out">
        {t("whatsapp.contactText")}
      </span>
    </a>
  );
};

export default WhatsAppButton;
