import { useEffect, useState, useMemo } from "react";
import { useGetRandomImages } from "@/hooks/dogImages/useGetRandomImages";
import { useFavorites } from "@/hooks/favorites/useFavorites";
import { FavoritesList } from "@/components/FavoritesList";
import type { DogImage } from "@/api/dogImages";
import { Search } from "@/components/Search";
import "./DogsViewer.css";

export const DogsViewer = () => {
  const { images, loading, error } = useGetRandomImages(10);
  const [breed, setBreed] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<DogImage | null>(null);
  const { isFavorite, addFavorite } = useFavorites();
  const filteredImages = useMemo(() => {
    return breed ? images?.filter((img) => img.breed.includes(breed)) : images;
  }, [breed, images]);

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
        <div>
          <Search value={breed} onChange={setBreed} />
        </div>

        {selectedImage ? (
          <div className="main-image">
            <img
              src={selectedImage.image}
              alt="Selected Dog"
              className="selected-image"
            />

            <div className="image-controls">
              <div>{selectedImage.breed}</div>
              {isFavorite(selectedImage.image) ? null : (
                <button
                  className="favorite-button"
                  onClick={handleToggleFavorite}
                >
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ) : null}
        <div className="thumbnails">
          {filteredImages?.map((dogImage) => (
            <div
              className={`thumbnail ${
                dogImage.image === selectedImage?.image ? "selected" : ""
              }`}
              key={dogImage.image}
              onClick={() => setSelectedImage(dogImage)}
            >
              <div className="thumbnail-content">
                <img
                  src={dogImage.image}
                  alt={`Dog ${dogImage.image}`}
                  className="dog-image"
                />
              </div>
              <div title={dogImage.breed} className="dog-breed">
                {dogImage.breed}
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
