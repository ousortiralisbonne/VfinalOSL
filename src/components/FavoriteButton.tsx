import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { pixelEvents } from "../utils/analytics";

interface FavoriteItem {
  id: string;
  name: string;
  type: string;
  image: string;
  price?: string;
  description?: string;
}

interface FavoriteButtonProps {
  item: FavoriteItem;
  className?: string;
}

const FavoriteButton = ({ item, className = "" }: FavoriteButtonProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isItemFavorite = isFavorite(item.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemFavorite) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
      // Track l'événement AddToWishlist
      pixelEvents.addToWishlist(item);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isItemFavorite ? "text-[#ea3e4e]" : "text-gray-400 hover:text-[#ea3e4e]"
      } ${className}`}
    >
      <Heart className={`h-5 w-5 ${isItemFavorite ? "fill-current" : ""}`} />
    </button>
  );
};

export default FavoriteButton;
