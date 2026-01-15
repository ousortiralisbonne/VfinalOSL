import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: string;
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  image,
  imageWidth = 1200,
  imageHeight = 630,
  type = 'website',
  noindex = false
}: SEOProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const baseUrl = 'https://ousortiralisbonne.com';
  // Canonical URL propre sans paramètres de langue
  const cleanPath = location.pathname.replace(/\/$/, '') || '/';
  const currentUrl = `${baseUrl}${cleanPath}`;

  const defaultTitle = 'Où sortir à Lisbonne | Guide des meilleures expériences';
  const defaultDescription = 'Découvrez les meilleurs restaurants, bars, événements et activités à Lisbonne. Guide local authentique pour explorer la ville comme un habitant.';
  const defaultImage = 'https://lh3.googleusercontent.com/pw/AP1GczOHiBiR5m7EEPMjBcBh4PbiCcVyy5C3GjOIvrXOIcSqLwOl9leaCrxHJIZnB3MCaAWABoUfNCK9BjHvQVhK6ofF3PSUKslxDhn0f4c3tPRHE7ruRxk8HWW9fuzh7Xec64tCbRwJs6QBJS0CEdHKeFg9=w1200-h630-s-no-gm';
  const defaultKeywords = 'Lisbonne, restaurants, bars, événements, activités, guide local, tourisme, sorties, visites guidées, expériences, Lisboa, Portugal';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  // Assurer que l'image est une URL absolue
  const finalImage = image?.startsWith('http') ? image : (image ? `${baseUrl}${image}` : defaultImage);
  const finalKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);

    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:image:width', imageWidth.toString(), true);
    updateMetaTag('og:image:height', imageHeight.toString(), true);
    updateMetaTag('og:image:alt', finalTitle, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Où Sortir à Lisbonne', true);
    updateMetaTag('og:locale', currentLang === 'fr' ? 'fr_FR' : currentLang === 'en' ? 'en_GB' : 'pt_PT', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:site', '@ousortirlisbonne', true);
    updateMetaTag('twitter:title', finalTitle, true);
    updateMetaTag('twitter:description', finalDescription, true);
    updateMetaTag('twitter:image', finalImage, true);
    updateMetaTag('twitter:image:alt', finalTitle, true);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;

    // Update hreflang links
    const updateHreflang = (lang: string, url: string) => {
      let hreflang = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', lang);
        document.head.appendChild(hreflang);
      }
      hreflang.href = url;
    };

    updateHreflang('fr', `${currentUrl}?lang=fr`);
    updateHreflang('en', `${currentUrl}?lang=en`);
    updateHreflang('pt', `${currentUrl}?lang=pt`);
    updateHreflang('x-default', currentUrl);

  }, [finalTitle, finalDescription, finalImage, finalKeywords, currentUrl, type, noindex, currentLang, imageWidth, imageHeight]);

  return null;
};

export default SEO;
