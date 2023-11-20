import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const getSearchResults = async (type: string, query: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=false&language=en-US&query=${query}`
    );
    return data && data.results;
  } catch (e) {
    console.log(e);
  }
};

export const getFavourites = async (uid?: string, accountId?: string) => {
  try {
    const { data } = await axios.get(
      `/api/favourite?uid=${uid}&accountId=${accountId}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
