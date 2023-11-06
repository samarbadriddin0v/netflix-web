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

export const getMoviesByGenre = async(type: string, id: number) => {
  try {
   const {data} = await axios.get(`${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`)
    return data && data.results;
  }catch (e) {
    console.log(e)
  }
}

export const getMovieDetails = async (type?: string, id?: number) => {
  try{
    const {data} = await  axios.get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`)
    return {data, type};
  }catch (e) {
    console.log(e)
  }
}


export const getSimilarMovies = async (type?: string, id?: number) => {
  try {
    const {data} = await  axios.get(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`)
    return data && data.results;
  }catch (e) {
    console.log(e)
  }
}