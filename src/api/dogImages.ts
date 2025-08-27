const DOGS_API_URL = "https://dog.ceo/api";

export interface DogImage {
  image: string;
  breed: string;
}

export const getRandomDogs = async (count: number) => {
  const response = await fetch(`${DOGS_API_URL}/breeds/image/random/${count}`);
  if (!response.ok) {
    throw new Error("Failed to fetch dog images");
  }
  const data = await response.json();
  return data.message.map((imageUrl: string) => {
    const urlParts = imageUrl.split("/");
    const breed = urlParts[urlParts.indexOf("breeds") + 1];

    return {
      image: imageUrl,
      breed: breed,
    };
  });
};
