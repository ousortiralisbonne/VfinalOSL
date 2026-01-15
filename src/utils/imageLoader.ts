// Utilitaire pour le chargement optimisé des images
export const getImageUrl = (url: string, width: number = 800) => {
  if (url.includes('unsplash.com')) {
    // Optimisation des images Unsplash
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&q=80&auto=format`;
  }
  return url;
};

// Préchargement des images critiques
export const preloadCriticalImages = (images: string[]) => {
  images.forEach(url => {
    const img = new Image();
    img.src = getImageUrl(url);
  });
};