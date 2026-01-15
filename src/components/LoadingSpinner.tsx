import { useTranslation } from "react-i18next";

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczP-B3rgHsfpavVo9_vw2vcgs9hMRFV1UgXF3CDSr9iF7XkCHfqt2SkSsgMlq_u5T9CWNGcK_uYOiePlN-5iFb4ixYZE2OEEQwgioO-VTNtplER9_hpddXQXO1PrNnfMr2PmE9FIrZpsnzml6MsOuyNa=w500-h500-s-no-gm?authuser=0"
          alt={t("loading.logoAlt") || "Logo Où Sortir à Lisbonne - Chargement"}
          loading="eager"
          width="128"
          height="128"
          className="w-32 h-32 object-contain mb-8 animate-pulse"
        />
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#37b7ab]"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
