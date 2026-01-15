// Structured Data Components for Schema.org JSON-LD
import { useEffect } from 'react';

// Helper function to inject JSON-LD script
const injectJsonLd = (schema: object, id: string) => {
  // Remove existing script with same id
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);

  return () => {
    const scriptToRemove = document.getElementById(id);
    if (scriptToRemove) {
      scriptToRemove.remove();
    }
  };
};

// Restaurant Schema
interface RestaurantSchemaProps {
  name: string;
  image: string;
  address: string;
  latitude?: number;
  longitude?: number;
  telephone?: string;
  priceRange: string;
  cuisine?: string;
  rating?: number;
  reviewCount?: number;
  slug?: string;
  openingHours?: string;
}

export const RestaurantSchema = ({
  name,
  image,
  address,
  latitude,
  longitude,
  telephone,
  priceRange,
  cuisine,
  rating,
  reviewCount,
  slug,
  openingHours,
}: RestaurantSchemaProps) => {
  useEffect(() => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": name,
      "image": image,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address,
        "addressLocality": "Lisboa",
        "addressCountry": "PT"
      },
      "priceRange": priceRange,
    };

    if (latitude && longitude) {
      schema.geo = {
        "@type": "GeoCoordinates",
        "latitude": latitude,
        "longitude": longitude
      };
    }

    if (slug) {
      schema.url = `https://ousortiralisbonne.com/restaurants/${slug}`;
    }

    if (telephone) {
      schema.telephone = telephone;
    }

    if (cuisine) {
      schema.servesCuisine = cuisine;
    }

    if (openingHours) {
      schema.openingHours = openingHours;
    }

    if (rating && reviewCount) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": rating,
        "reviewCount": reviewCount,
        "bestRating": 5,
        "worstRating": 1
      };
    }

    return injectJsonLd(schema, `restaurant-schema-${slug || name.replace(/\s/g, '-')}`);
  }, [name, image, address, latitude, longitude, telephone, priceRange, cuisine, rating, reviewCount, slug, openingHours]);

  return null;
};

// Hotel Schema
interface HotelSchemaProps {
  name: string;
  image: string;
  address: string;
  latitude?: number;
  longitude?: number;
  starRating?: number;
  priceRange: string;
  slug?: string;
  rating?: number;
  reviewCount?: number;
  amenities?: string[];
}

export const HotelSchema = ({
  name,
  image,
  address,
  latitude,
  longitude,
  starRating,
  priceRange,
  slug,
  rating,
  reviewCount,
  amenities,
}: HotelSchemaProps) => {
  useEffect(() => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": name,
      "image": image,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address,
        "addressLocality": "Lisboa",
        "addressCountry": "PT"
      },
      "priceRange": priceRange,
    };

    if (latitude && longitude) {
      schema.geo = {
        "@type": "GeoCoordinates",
        "latitude": latitude,
        "longitude": longitude
      };
    }

    if (slug) {
      schema.url = `https://ousortiralisbonne.com/hotels/${slug}`;
    }

    if (starRating) {
      schema.starRating = {
        "@type": "Rating",
        "ratingValue": starRating
      };
    }

    if (rating && reviewCount) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": rating,
        "reviewCount": reviewCount,
        "bestRating": 5,
        "worstRating": 1
      };
    }

    if (amenities && amenities.length > 0) {
      schema.amenityFeature = amenities.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity
      }));
    }

    return injectJsonLd(schema, `hotel-schema-${slug || name.replace(/\s/g, '-')}`);
  }, [name, image, address, latitude, longitude, starRating, priceRange, slug, rating, reviewCount, amenities]);

  return null;
};

// Bar Schema
interface BarSchemaProps {
  name: string;
  image: string;
  address: string;
  latitude?: number;
  longitude?: number;
  telephone?: string;
  priceRange: string;
  rating?: number;
  reviewCount?: number;
  slug?: string;
  openingHours?: string;
}

export const BarSchema = ({
  name,
  image,
  address,
  latitude,
  longitude,
  telephone,
  priceRange,
  rating,
  reviewCount,
  slug,
  openingHours,
}: BarSchemaProps) => {
  useEffect(() => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "BarOrPub",
      "name": name,
      "image": image,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address,
        "addressLocality": "Lisboa",
        "addressCountry": "PT"
      },
      "priceRange": priceRange,
    };

    if (latitude && longitude) {
      schema.geo = {
        "@type": "GeoCoordinates",
        "latitude": latitude,
        "longitude": longitude
      };
    }

    if (slug) {
      schema.url = `https://ousortiralisbonne.com/bars/${slug}`;
    }

    if (telephone) {
      schema.telephone = telephone;
    }

    if (openingHours) {
      schema.openingHours = openingHours;
    }

    if (rating && reviewCount) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": rating,
        "reviewCount": reviewCount,
        "bestRating": 5,
        "worstRating": 1
      };
    }

    return injectJsonLd(schema, `bar-schema-${slug || name.replace(/\s/g, '-')}`);
  }, [name, image, address, latitude, longitude, telephone, priceRange, rating, reviewCount, slug, openingHours]);

  return null;
};

// Tour/Activity Schema
interface TourSchemaProps {
  name: string;
  description: string;
  image: string;
  price: string | number;
  duration?: string;
  maxParticipants?: number;
  slug?: string;
  highlights?: string[];
}

export const TourSchema = ({
  name,
  description,
  image,
  price,
  duration,
  maxParticipants,
  slug,
  highlights,
}: TourSchemaProps) => {
  useEffect(() => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": name,
      "description": description,
      "image": image,
      "touristType": "Cultural tourism",
      "provider": {
        "@type": "TravelAgency",
        "name": "Où Sortir à Lisbonne",
        "url": "https://ousortiralisbonne.com"
      },
    };

    if (typeof price === 'number' || !isNaN(parseFloat(price as string))) {
      schema.offers = {
        "@type": "Offer",
        "price": typeof price === 'number' ? price : parseFloat(price as string),
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      };
    }

    if (duration) {
      schema.duration = duration;
    }

    if (maxParticipants) {
      schema.maximumAttendeeCapacity = maxParticipants;
    }

    if (slug) {
      schema.url = `https://ousortiralisbonne.com/visites-guidees/${slug}`;
    }

    if (highlights && highlights.length > 0) {
      schema.itinerary = highlights.map((highlight, index) => ({
        "@type": "ItemListElement",
        "position": index + 1,
        "name": highlight
      }));
    }

    return injectJsonLd(schema, `tour-schema-${slug || name.replace(/\s/g, '-')}`);
  }, [name, description, image, price, duration, maxParticipants, slug, highlights]);

  return null;
};

// Cruise/Boat Trip Schema
interface CruiseSchemaProps {
  name: string;
  description: string;
  image: string;
  price: string | number;
  duration?: string;
  capacity?: number;
  slug?: string;
  departures?: string[];
}

export const CruiseSchema = ({
  name,
  description,
  image,
  price,
  duration,
  capacity,
  slug,
  departures,
}: CruiseSchemaProps) => {
  useEffect(() => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": name,
      "description": description,
      "image": image,
      "touristType": "Boat tour",
      "provider": {
        "@type": "TravelAgency",
        "name": "Où Sortir à Lisbonne",
        "url": "https://ousortiralisbonne.com"
      },
    };

    if (typeof price === 'number' || !isNaN(parseFloat(price as string))) {
      schema.offers = {
        "@type": "Offer",
        "price": typeof price === 'number' ? price : parseFloat(price as string),
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      };
    }

    if (duration) {
      schema.duration = duration;
    }

    if (capacity) {
      schema.maximumAttendeeCapacity = capacity;
    }

    if (slug) {
      schema.url = `https://ousortiralisbonne.com/croisieres/${slug}`;
    }

    return injectJsonLd(schema, `cruise-schema-${slug || name.replace(/\s/g, '-')}`);
  }, [name, description, image, price, duration, capacity, slug, departures]);

  return null;
};

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  pageId?: string;
}

export const FAQSchema = ({ faqs, pageId = 'default' }: FAQSchemaProps) => {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return injectJsonLd(schema, `faq-schema-${pageId}`);
  }, [faqs, pageId]);

  return null;
};

// Local Business Schema (for the company itself)
interface LocalBusinessSchemaProps {
  type?: 'TravelAgency' | 'TouristInformationCenter';
}

export const LocalBusinessSchema = ({ type = 'TravelAgency' }: LocalBusinessSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": type,
      "name": "Où Sortir à Lisbonne",
      "url": "https://ousortiralisbonne.com",
      "logo": "https://ousortiralisbonne.com/logo.png",
      "image": "https://ousortiralisbonne.com/logo.png",
      "description": "Guide local expert pour découvrir Lisbonne : restaurants, bars, visites guidées en français, croisières sur le Tage et expériences uniques.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lisboa",
        "addressCountry": "PT"
      },
      "email": "contact@ousortiralisbonne.com",
      "telephone": "+351966998827",
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://www.instagram.com/ousortiralisbonne",
        "https://www.facebook.com/ousortiralisbonne"
      ],
      "areaServed": {
        "@type": "City",
        "name": "Lisboa"
      },
      "knowsLanguage": ["fr", "en", "pt"]
    };

    return injectJsonLd(schema, 'local-business-schema');
  }, [type]);

  return null;
};

// Event Schema
interface EventSchemaProps {
  name: string;
  description?: string;
  image: string;
  startDate: string;
  endDate?: string;
  location: string;
  price?: string | number;
  slug?: string;
}

export const EventSchema = ({
  name,
  description,
  image,
  startDate,
  endDate,
  location,
  price,
  slug,
}: EventSchemaProps) => {
  useEffect(() => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": name,
      "image": image,
      "startDate": startDate,
      "location": {
        "@type": "Place",
        "name": location,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lisboa",
          "addressCountry": "PT"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Où Sortir à Lisbonne",
        "url": "https://ousortiralisbonne.com"
      }
    };

    if (description) {
      schema.description = description;
    }

    if (endDate) {
      schema.endDate = endDate;
    }

    if (typeof price === 'number' || (typeof price === 'string' && !isNaN(parseFloat(price)))) {
      schema.offers = {
        "@type": "Offer",
        "price": typeof price === 'number' ? price : parseFloat(price),
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      };
    }

    if (slug) {
      schema.url = `https://ousortiralisbonne.com/evenements/${slug}`;
    }

    return injectJsonLd(schema, `event-schema-${slug || name.replace(/\s/g, '-')}`);
  }, [name, description, image, startDate, endDate, location, price, slug]);

  return null;
};

// Article Schema for Blog Posts
interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  slug: string;
  category?: string;
}

export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "Où Sortir à Lisbonne",
  slug,
  category,
}: ArticleSchemaProps) => {
  useEffect(() => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "description": description,
      "image": image,
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "author": {
        "@type": "Organization",
        "name": author,
        "url": "https://ousortiralisbonne.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Où Sortir à Lisbonne",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ousortiralisbonne.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://ousortiralisbonne.com/blog/${slug}`
      }
    };

    if (category) {
      schema.articleSection = category;
    }

    return injectJsonLd(schema, `article-schema-${slug}`);
  }, [headline, description, image, datePublished, dateModified, author, slug, category]);

  return null;
};

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  useEffect(() => {
    if (!items || items.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    return injectJsonLd(schema, 'breadcrumb-schema');
  }, [items]);

  return null;
};

// ItemList Schema for listing pages
interface ItemListItem {
  name: string;
  url: string;
  image?: string;
  description?: string;
}

interface ItemListSchemaProps {
  items: ItemListItem[];
  listName: string;
  listUrl: string;
}

export const ItemListSchema = ({ items, listName, listUrl }: ItemListSchemaProps) => {
  useEffect(() => {
    if (!items || items.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": listName,
      "url": listUrl,
      "numberOfItems": items.length,
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "url": item.url,
        ...(item.image && { "image": item.image }),
        ...(item.description && { "description": item.description })
      }))
    };

    return injectJsonLd(schema, `itemlist-schema-${listName.replace(/\s/g, '-')}`);
  }, [items, listName, listUrl]);

  return null;
};

export default {
  RestaurantSchema,
  HotelSchema,
  BarSchema,
  TourSchema,
  CruiseSchema,
  FAQSchema,
  LocalBusinessSchema,
  EventSchema,
  BreadcrumbSchema,
  ArticleSchema,
  ItemListSchema,
};
