import React from 'react';

interface SanityImageProps {
  imageId: string;
  fallbackSrc: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any; // Pour les autres props HTML
}

const SanityImage: React.FC<SanityImageProps> = ({
  imageId,
  fallbackSrc,
  alt,
  className,
  style,
  ...props
}) => {
  // Pour l'instant, utiliser directement les fallbacks
  // TODO: Intégrer Sanity une fois les données ajoutées
  const imageSrc = fallbackSrc;
  const imageAlt = alt || '';

  return (
    <img
      src={imageSrc}
      alt={imageAlt || "Image - Où Sortir à Lisbonne"}
      loading="lazy"
      className={className}
      style={style}
      {...props}
    />
  );
};

export default SanityImage;
