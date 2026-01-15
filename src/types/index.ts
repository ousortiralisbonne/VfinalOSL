// Form types
export * from './forms';

// Language types
export type Language = 'en' | 'fr' | 'pt';

// Multilingual content type
export interface MultilingualContent {
  en: string;
  fr: string;
  pt: string;
}

// SEO types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// Route types
export interface RouteDefinition {
  path: string;
  translations: Record<Language, string>;
  component: React.ComponentType;
  children?: RouteDefinition[];
}

// Sanity Image type
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// Blog types
export interface BlogPost {
  _id: string;
  id: string;
  title: MultilingualContent;
  excerpt: MultilingualContent;
  content: {
    en: any[];
    fr: any[];
    pt: any[];
  };
  image: SanityImage;
  date: string;
  readTime: string;
  author: string;
  slug: string;
  category: {
    _ref: string;
    _type: 'reference';
  };
}

// Restaurant types
export interface Restaurant {
  _id: string;
  id: number;
  name: string;
  cuisine: {
    _ref: string;
    _type: 'reference';
  };
  priceRange: string;
  rating: number;
  reviews: number;
  address: string;
  openingHours: string;
  phone: string;
  image: SanityImage;
  specialties: MultilingualContent;
}

// Event types
export interface Event {
  _id: string;
  id: number;
  title: MultilingualContent;
  category: {
    _ref: string;
    _type: 'reference';
  };
  date: string;
  time: string;
  location: string;
  image: SanityImage;
  price: string;
}

// Bar types
export interface Bar {
  _id: string;
  id: number;
  name: string;
  category: {
    _ref: string;
    _type: 'reference';
  };
  priceRange: string;
  rating: number;
  reviews: number;
  address: string;
  openingHours: string;
  phone: string;
  image: SanityImage;
  specialties: MultilingualContent;
}

// Club types
export interface Club {
  _id: string;
  id: number;
  name: string;
  category: {
    _ref: string;
    _type: 'reference';
  };
  priceRange: string;
  rating: number;
  reviews: number;
  address: string;
  openingHours: string;
  phone: string;
  image: SanityImage;
  specialties: MultilingualContent;
}

// Hotel types
export interface Hotel {
  _id: string;
  id: number;
  name: string;
  category: {
    _ref: string;
    _type: 'reference';
  };
  priceRange: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  image: SanityImage;
  amenities: MultilingualContent;
}

// Guided Tour types
export interface GuidedTour {
  _id: string;
  id: number;
  title: MultilingualContent;
  description: MultilingualContent;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image: SanityImage;
  highlights: MultilingualContent;
}

// Sports types
export interface Sport {
  _id: string;
  id: number;
  name: string;
  description: MultilingualContent;
  price: string;
  rating: number;
  reviews: number;
  image: SanityImage;
  location: string;
}

// Boat Trip types
export interface BoatTripCruise {
  _id: string;
  id: number;
  name: string;
  description: MultilingualContent;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image: SanityImage;
  location: {
    _ref: string;
    _type: 'reference';
  };
  cruiseType: {
    _ref: string;
    _type: 'reference';
  };
}

// Vehicle types
export interface Vehicle {
  _id: string;
  id: number;
  name: string;
  type: string;
  capacity: number;
  price: string;
  image: SanityImage;
  features: MultilingualContent;
}

// Service types
export interface Service {
  _id: string;
  id: number;
  name: string;
  description: MultilingualContent;
  price: string;
  image: SanityImage;
  features: MultilingualContent;
}

// Category types
export interface Category {
  _id: string;
  name: MultilingualContent;
  description?: MultilingualContent;
  image?: SanityImage;
}

// Page Banner types
export interface PageBanner {
  _id: string;
  pageId: string;
  title: MultilingualContent;
  subtitle?: MultilingualContent;
  bannerImage: SanityImage;
  isActive: boolean;
  order?: number;
}

// Site Images types
export interface SiteImage {
  _id: string;
  imageId: string;
  title: MultilingualContent;
  description?: MultilingualContent;
  image: SanityImage;
  category: 'hero' | 'about' | 'experiences' | 'banners' | 'general';
  altText?: MultilingualContent;
  isActive: boolean;
  order?: number;
}