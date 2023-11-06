import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL

export const getTrendingMovies = async (type: string) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`)
    return data && data.results;
  }catch (e) {
    console.log(e)
  }
}

export const getTopratedMovies = async (type: string) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`)
    return data && data.results;
  }catch (e) {
    console.log(e)
  }
}

export const getPopularMovies = async (type: string) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`)
    return data && data.results;
  }catch (e) {
    console.log(e)
  }
}