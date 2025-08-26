import { useFavorites } from "@/hooks/favorites/useFavorites";
import "./FavoritesList.css";

interface FavoritesListProps {
  onSelectImage: (imageUrl: string) => void;
  selectedImage: string | null;
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
        {favorites.map((imageUrl, index) => (
          <div
            key={`favorite-${index}`}
            className={`favorite-item ${
              imageUrl === selectedImage ? "selected" : ""
            }`}
          >
            <img
              src={imageUrl}
              alt={`Favorite ${index + 1}`}
              onClick={() => onSelectImage(imageUrl)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
