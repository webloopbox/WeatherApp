import { CityImageResponse } from "../models/imageData.models";

export const getCityImage = async (
  city: string
): Promise<CityImageResponse> => {
  try {
    const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.REACT_APP_IMAGES_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch city image");
    }

    const data = await response.json();

    return {
      urls: data.results[0].urls,
      user: data.results[0].user,
    }
  } catch (error) {
    throw error;
  }
};
