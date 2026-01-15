import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

function SubscribeNewsLetterCheckbox(props: any) {
  const { subscribeToNewsletter, setSubscribeToNewsletter } = props;
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-start space-x-3">
        <div
          className={`w-5 h-5 rounded border ${
            subscribeToNewsletter
              ? "bg-[#37b7ab] border-[#37b7ab]"
              : "border-gray-300 hover:border-[#37b7ab]"
          } flex items-center justify-center cursor-pointer transition-colors`}
          onClick={() => setSubscribeToNewsletter(!subscribeToNewsletter)}
        >
          {subscribeToNewsletter && <Check className="h-4 w-4 text-white" />}
        </div>
        <label
          className="text-sm text-gray-600 cursor-pointer"
          onClick={() => setSubscribeToNewsletter(!subscribeToNewsletter)}
        >
          {t("subscribenews")}
        </label>
      </div>
    </div>
  );
}

export default SubscribeNewsLetterCheckbox;
