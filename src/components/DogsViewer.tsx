import { useEffect, useState } from "react";
import { useGetRandomImages } from "@/hooks/dogImages/useGetRandomImages";
import "./DogsViewer.css";

export const DogsViewer = () => {
  const { images, loading, error } = useGetRandomImages(10);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage && images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images, selectedImage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="selected-image-container"></div>
      {selectedImage ? (
        <div className="main-image">
          <img
            src={selectedImage}
            alt="Selected Dog"
            className="selected-image"
            onClick={() => setSelectedImage(null)}
          />
        </div>
      ) : null}
      <div className="thumbnails">
        {images?.map((image, index) => (
          <div
            className={`thumbnail ${image === selectedImage ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedImage(image)}
          >
            <div className="thumbnail-content">
              <img
                key={index}
                src={image}
                alt={`Dog ${index + 1}`}
                className="dog-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
