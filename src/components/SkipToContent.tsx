// Skip to Content Link for Accessibility
// Permet aux utilisateurs clavier de passer directement au contenu principal

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:bg-[#2a2765] focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#37b7ab] focus:ring-offset-2 transition-all"
    >
      Aller au contenu principal
    </a>
  );
};

export default SkipToContent;
