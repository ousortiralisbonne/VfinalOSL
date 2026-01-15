import { SEOMetadata, Language } from '../types';

export const generateMetadata = (
  path: string,
  language: Language,
  data: Record<string, any>
): SEOMetadata => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const canonical = `${baseUrl}/${language}${path}`;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    ogImage: data.ogImage,
    canonical
  };
};