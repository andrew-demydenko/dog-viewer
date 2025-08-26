import { useEffect, useState, useCallback } from "react";
import { getRandomDogs } from "@/api/dogImages";

export const useGetRandomImages = (count: number) => {
  const [images, setImages] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRandomDogs(count);
      setImages(data);
    } catch (e) {
      setError(`Failed to fetch dog images ${e}`);
    } finally {
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchImages();
  }, [count, fetchImages]);

  return { images, loading, error };
};
