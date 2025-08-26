import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("dogFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (imageUrl: string) => {
    if (!favorites.includes(imageUrl)) {
      const newFavorites = [...favorites, imageUrl];
      setFavorites(newFavorites);
      localStorage.setItem("dogFavorites", JSON.stringify(newFavorites));
    }
  };

  const isFavorite = (imageUrl: string): boolean => {
    return favorites.includes(imageUrl);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
