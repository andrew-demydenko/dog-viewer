import { createContext } from "react";
import type { DogImage } from "@/api/dogImages";

export interface FavoritesContextType {
  favorites: DogImage[];
  addFavorite: (dogImage: DogImage) => void;
  removeFavorite: (imageUrl: string) => void;
  isFavorite: (imageUrl: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);
