import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Helper pour injecter le JSON-LD
const injectBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const scriptId = "breadcrumb-schema";

  // Supprimer l'ancien script s'il existe
  const existing = document.getElementById(scriptId);
  if (existing) {
    existing.remove();
  }

  if (items.length === 0) return;

  const baseUrl = "https://ousortiralisbonne.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${baseUrl}${item.path}`
    }))
  };

  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);

  return () => {
    const el = document.getElementById(scriptId);
    if (el) el.remove();
  };
};

// Map des routes vers les clés de traduction
const routeTranslations: Record<string, string> = {
  "/restaurants": "nav.restaurants",
  "/bars": "nav.bars",
  "/clubs": "nav.clubs",
  "/hotels": "nav.hotels",
  "/events": "nav.events",
  "/visites-guidees": "nav.guidedTours",
  "/bateaux-lisbonne": "nav.boats",
  "/blog": "nav.blog",
  "/a-propos": "nav.about",
  "/sur-mesure": "nav.customTours",
  "/transfers": "nav.transfers",
  "/activities/sports": "nav.sports",
  "/more-activities": "nav.moreActivities",
  "/explore-more": "nav.exploreMore",
  "/mentions-legales": "footer.legalNotice",
  "/politique-confidentialite": "footer.privacy",
  "/cgv": "footer.terms",
};

const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Générer automatiquement les breadcrumbs si non fournis
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const result: BreadcrumbItem[] = [{ label: t("nav.home"), path: "/" }];

    let currentPath = "";
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const translationKey = routeTranslations[currentPath];
      const label = translationKey ? t(translationKey) : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      result.push({ label, path: currentPath });
    }

    return result;
  })();

  // Injecter le schema JSON-LD
  useEffect(() => {
    return injectBreadcrumbSchema(breadcrumbItems);
  }, [breadcrumbItems]);

  // Ne pas afficher si on est sur la page d'accueil
  if (location.pathname === "/") return null;

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`py-3 px-4 bg-gray-50 border-b border-gray-200 ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1 text-sm max-w-7xl mx-auto">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1 flex-shrink-0" />
              )}
              {isLast ? (
                <span className="text-gray-600 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-[#2a2765] hover:text-[#37b7ab] transition-colors flex items-center"
                >
                  {isFirst && <Home className="h-4 w-4 mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
