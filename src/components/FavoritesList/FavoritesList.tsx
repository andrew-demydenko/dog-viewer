import { useFavorites } from "@/hooks/favorites/useFavorites";
import type { DogImage } from "@/api/dogImages";
import "./FavoritesList.css";

interface FavoritesListProps {
  onSelectImage: (dogImage: DogImage) => void;
  selectedImage: DogImage | null;
}

export const FavoritesList = ({
  onSelectImage,
  selectedImage,
}: FavoritesListProps) => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h3 className="favorites-title">Favorites</h3>
        <p className="no-favorites">No favorite images yet</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h3 className="favorites-title">Favorites</h3>
      <div className="favorites-list">
        {favorites.map((dogImage, index) => (
          <div
            key={`favorite-${index}`}
            onClick={() => onSelectImage(dogImage)}
            className={`favorite-item ${
              dogImage.image === selectedImage?.image ? "selected" : ""
            }`}
          >
            <img src={dogImage.image} alt={`Favorite ${index + 1}`} />
            {/* toDo remove from favorites */}
          </div>
        ))}
      </div>
    </div>
  );
};
