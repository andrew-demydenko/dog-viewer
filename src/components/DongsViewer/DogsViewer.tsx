import { useEffect, useState } from "react";
import { useGetRandomImages } from "@/hooks/dogImages/useGetRandomImages";
import { useFavorites } from "@/hooks/favorites/useFavorites";
import { FavoritesList } from "@/components/FavoritesList";
import "./DogsViewer.css";

export const DogsViewer = () => {
  const { images, loading, error } = useGetRandomImages(10);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isFavorite, addFavorite } = useFavorites();

  useEffect(() => {
    if (!selectedImage && images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images, selectedImage]);

  const handleToggleFavorite = () => {
    if (!selectedImage) return;

    addFavorite(selectedImage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dogs-viewer-container">
      <div className="dogs-viewer-content">
        <div className="selected-image-container"></div>
        {selectedImage ? (
          <div className="main-image">
            <img
              src={selectedImage}
              alt="Selected Dog"
              className="selected-image"
            />
            {isFavorite(selectedImage) ? null : (
              <div className="image-controls">
                <button
                  className="favorite-button"
                  onClick={handleToggleFavorite}
                >
                  Add to Favorites
                </button>
              </div>
            )}
          </div>
        ) : null}
        <div className="thumbnails">
          {images?.map((image, index) => (
            <div
              className={`thumbnail ${
                image === selectedImage ? "selected" : ""
              }`}
              key={index}
              onClick={() => setSelectedImage(image)}
            >
              <div className="thumbnail-content">
                <img
                  key={index}
                  src={image}
                  alt={`Dog ${image}`}
                  className="dog-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <FavoritesList
        onSelectImage={setSelectedImage}
        selectedImage={selectedImage}
      />
    </div>
  );
};
