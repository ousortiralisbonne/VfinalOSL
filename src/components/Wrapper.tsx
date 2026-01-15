import LoadingSpinner from "./LoadingSpinner";
import { useTranslation } from "react-i18next";

interface WrapperProps {
  isLoading: boolean;
  error: any;
  children: React.ReactNode;
}

function Wrapper({ isLoading, error, children }: WrapperProps) {
  const { t } = useTranslation();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
        <div className="text-red-500 text-center">
          <h3 className="text-lg font-semibold mb-2">{t("wrapper.error.title")}</h3>
          <p className="text-sm">
            {error?.message || t("wrapper.error.message")}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            {t("wrapper.error.retry")}
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default Wrapper;
