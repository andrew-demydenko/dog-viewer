import { useContext } from "react";
import { FavoritesContext } from "@/providers/FavoritesContext";

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("Component must be wrapped with FavoritesProvider");
  }
  return context;
};
