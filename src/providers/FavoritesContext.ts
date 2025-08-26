import { createContext } from "react";

export interface FavoritesContextType {
  favorites: string[];
  addFavorite: (imageUrl: string) => void;
  isFavorite: (imageUrl: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);
