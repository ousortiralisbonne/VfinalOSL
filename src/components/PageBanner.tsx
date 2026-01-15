import React from 'react';

interface PageBannerProps {
  pageId: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackImage?: string;
  height?: string;
  titleHighlight?: string;
  subtitleHighlight?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({
  pageId,
  fallbackTitle,
  fallbackSubtitle,
  fallbackImage,
  height = "h-[40vh]",
  titleHighlight,
  subtitleHighlight
}) => {
  // Pour l'instant, utiliser directement les fallbacks
  // TODO: Intégrer Sanity une fois les données ajoutées
  const title = fallbackTitle || '';
  const subtitle = fallbackSubtitle || '';

  // Fonction pour rendre le texte avec le mot en surbrillance
  const renderHighlightedText = (text: string, highlight?: string) => {
    if (!highlight || !text.includes(highlight)) {
      return text;
    }
    const parts = text.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          {highlight}
        </span>
        {parts[1]}
      </>
    );
  };
  const imageUrl = fallbackImage || '';

  if (!imageUrl) {
    return (
      <div className={`relative bg-gray-200 ${height}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
              {renderHighlightedText(title, titleHighlight)}
            </h1>
            {subtitle && (
              <p className="text-xl text-white/80">
                {renderHighlightedText(subtitle, subtitleHighlight)}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-cover bg-center ${height}`}
      style={{
        backgroundImage: `url("${imageUrl}")`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-garage">
            {renderHighlightedText(title, titleHighlight)}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/80">
              {renderHighlightedText(subtitle, subtitleHighlight)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
