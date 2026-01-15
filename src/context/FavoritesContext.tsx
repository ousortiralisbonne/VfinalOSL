import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { getStorageItem, setStorageItem } from "../utils/storage";

interface FavoriteItem {
  id: string;
  name: string;
  type: string;
  image: string;
  price?: string;
  description?: string;
  title?: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
}

const STORAGE_KEY = "favorites";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    return getStorageItem<FavoriteItem[]>(STORAGE_KEY, []);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEY, favorites);
  }, [favorites]);

  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      // Prevent duplicates
      if (prev.some((f) => f.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((item) => item.id === id);
    },
    [favorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      clearFavorites,
    }),
    [favorites, addFavorite, removeFavorite, isFavorite, clearFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
