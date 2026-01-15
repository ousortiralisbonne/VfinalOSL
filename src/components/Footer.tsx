import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoSrc from "../images/Logo.png";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll to integration form when navigating from hash
  useEffect(() => {
    if (location.pathname === "/" && window.location.hash === "#integration-form") {
      setTimeout(() => {
        const formSection = document.querySelector("#integration-form");
        if (formSection) {
          formSection.scrollIntoView({ behavior: "smooth" });
          // Clear the hash from URL
          window.history.replaceState(null, "", "/");
        }
      }, 100);
    }
  }, [location.pathname]);

  const handlePartnerClick = () => {
    if (location.pathname === "/") {
      // If we're on the homepage, scroll to the form
      const formSection = document.querySelector("#integration-form");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      navigate("/#integration-form");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="relative">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Mobile: Logo centré (masqué sur desktop) */}
              <div className="flex justify-center md:hidden">
                <img
                  src={logoSrc}
                  alt={t("loading.logoAlt") || "Logo Où Sortir à Lisbonne"}
                  loading="lazy"
                  width="64"
                  height="64"
                  className="h-16 w-16 object-contain"
                />
              </div>

              {/* Desktop: Logo avec texte */}
              <div className="hidden md:flex items-center space-x-3">
                <img
                  src={logoSrc}
                  alt={t("loading.logoAlt") || "Logo Où Sortir à Lisbonne"}
                  loading="lazy"
                  width="48"
                  height="48"
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <h2 className="text-2xl font-bold font-garage text-white">
                    {t("footer.brandName")}
                  </h2>
                  <p className="text-emerald-400 text-xs font-medium">
                    {t("footer.brandTagline")}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-base leading-relaxed max-w-md text-center md:text-left">
                {t("footer.description")}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 md:space-y-3 text-center md:text-left">
                <a
                  href="mailto:contact@ousortiralisbonne.com"
                  className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-500/30 transition-colors">
                    <Mail className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm">contact@ousortiralisbonne.com</span>
                </a>
                <a
                  href="tel:+351966998827"
                  className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-500/30 transition-colors">
                    <Phone className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm">+351 966 998 827</span>
                </a>
                <div className="group flex items-center justify-center md:justify-start text-gray-300">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm">{t("footer.location")}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start space-x-4 md:space-x-3">
                <a
                  href="https://www.facebook.com/ousortiralisbonne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 md:w-10 md:h-10 bg-gray-800 hover:bg-blue-600 active:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 min-w-[48px] min-h-[48px] md:min-w-0 md:min-h-0"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </a>
                <a
                  href="https://www.instagram.com/sortiralisbonne/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 md:w-10 md:h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 active:from-purple-600 active:to-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 min-w-[48px] min-h-[48px] md:min-w-0 md:min-h-0"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </a>
                <a
                  href="https://www.youtube.com/@ousortiralisbonne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 md:w-10 md:h-10 bg-gray-800 hover:bg-red-600 active:bg-red-700 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 min-w-[48px] min-h-[48px] md:min-w-0 md:min-h-0"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 text-gray-300 group-hover:text-white" />
                </a>
                <a
                  href="https://chat.whatsapp.com/ByWcy4bKfAP7J3J9j8uLWN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 md:w-10 md:h-10 bg-gray-800 hover:bg-green-600 active:bg-green-700 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 min-w-[48px] min-h-[48px] md:min-w-0 md:min-h-0"
                  aria-label="WhatsApp"
                >
                  <svg
                    className="h-5 w-5 text-gray-300 group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@ousortiralisbonne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 md:w-10 md:h-10 bg-gray-800 hover:bg-black active:bg-gray-900 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 min-w-[48px] min-h-[48px] md:min-w-0 md:min-h-0"
                  aria-label="TikTok"
                >
                  <svg
                    className="h-5 w-5 text-gray-300 group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links - Hidden on mobile */}
            <div className="hidden md:block space-y-6 pt-20">
              <div>
                <h3 className="text-2xl font-bold font-garage mb-4 text-white">
                  {t("footer.categorieslabel")}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/restaurants"
                      className="group flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-lg">{t("categories.restaurants.name")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bars"
                      className="group flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-lg">{t("categories.bars.name")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/clubs"
                      className="group flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-lg">{t("categories.clubs.name")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/visites-guidees"
                      className="group flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-lg">{t("nav.activities_menu.tours")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/sur-mesure"
                      className="group flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-lg">{t("custom")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Legal & Info */}
            <div className="space-y-4 md:space-y-6 pt-6 md:pt-20 text-center md:text-left">
              <div>
                <h3 className="text-xl md:text-2xl font-bold font-garage mb-3 md:mb-4 text-white">
                  {t("footer.informations.label")}
                </h3>
                <ul className="space-y-1 md:space-y-3">
                  <li>
                    <Link
                      to="/a-propos"
                      className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors duration-300 py-2 md:py-0 min-h-[44px] md:min-h-0"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                      <span className="text-base md:text-lg">{t("footer.informations.about")}</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handlePartnerClick}
                      className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors duration-300 w-full py-2 md:py-0 min-h-[44px] md:min-h-0"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                      <span className="text-base md:text-lg">{t("footer.informations.becomepartner")}</span>
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/mentions-legales"
                      className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors duration-300 py-2 md:py-0 min-h-[44px] md:min-h-0"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                      <span className="text-base md:text-lg">{t("footer.informations.legal")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/politique-confidentialite"
                      className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors duration-300 py-2 md:py-0 min-h-[44px] md:min-h-0"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                      <span className="text-base md:text-lg">{t("footer.informations.privacy")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cgv"
                      className="group flex items-center justify-center md:justify-start text-gray-300 hover:text-emerald-400 active:text-emerald-500 transition-colors duration-300 py-2 md:py-0 min-h-[44px] md:min-h-0"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                      <span className="text-base md:text-lg">{t("footer.informations.cgv")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="text-gray-400 text-sm text-center lg:text-left">
                © {currentYear} {t("footer.brandName")}. {t("rightsreserved")}. | RNAVT 711/2022 | TRIANGULOS INSOLITOS LDA
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <span className="flex items-center">
                  {t("withlove")}&nbsp;
                  <a
                    href="https://propulseo-site.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300 flex items-center group ml-1"
                  >
                    Propul'SEO
                    <ExternalLink className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
