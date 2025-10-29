import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type { DogImage } from "@/api/dogImages";

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<DogImage[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("dogFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (dogImage: DogImage) => {
    if (!favorites.find((fav) => fav.image === dogImage?.image)) {
      const newFavorites = [...favorites, dogImage];
      setFavorites(newFavorites);
      localStorage.setItem("dogFavorites", JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (imageUrl: string) => {
    const newFavorites = favorites.filter((fav) => fav.image !== imageUrl);
    setFavorites(newFavorites);
    localStorage.setItem("dogFavorites", JSON.stringify(newFavorites));
  };

  const isFavorite = (imageUrl: string): boolean => {
    return favorites.find((fav) => fav.image === imageUrl) !== undefined;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
