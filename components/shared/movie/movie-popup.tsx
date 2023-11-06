"use client";

import {Dialog, DialogContent} from "@/components/ui/dialog";
import {useGlobalContext} from "@/context";
import {useEffect, useState} from "react";
import {getMovieDetails, getSimilarMovies} from "@/lib/api";
import {MovieDetailsProps, MovieProps} from "@/types";
import ReactStars from 'react-stars'
import MovieItem from "@/components/shared/movie/movie-item";
import ReactPlayer from "react-player";

const MoviePopup = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieProps[]>([])
  const [key, setKey] = useState<string>()

  const {open, setOpen, movie} = useGlobalContext()


  useEffect(() => {
    const getMovie = async () => {
      try {
        const extractMovieDetails = await getMovieDetails(movie?.type, movie?.id)
        const similarMovies = await getSimilarMovies(movie?.type, movie?.id)

        const results = similarMovies.map((movie: MovieProps) => ({...movie, type: extractMovieDetails?.type, addedToFavorites: false}))

        setMovieDetails(extractMovieDetails?.data)
        setSimilarMovies(results)

        const findIndexOfTrailer = extractMovieDetails?.data?.videos?.results?.length ?
          extractMovieDetails?.data?.videos?.results?.findIndex((item: {type: string}) => item.type === "Trailer") : -1

        const findIndexOfClip = extractMovieDetails?.data?.videos?.results?.length ?
          extractMovieDetails?.data?.videos?.results?.findIndex((item: {type: string}) => item.type === "Clip") : -1

        const key = findIndexOfTrailer !== -1 ? extractMovieDetails?.data?.videos?.results[findIndexOfTrailer]?.key :
          findIndexOfClip !== -1 ? extractMovieDetails?.data?.videos?.results[findIndexOfClip]?.key : null

        setKey(key)

      } catch (e) {
        console.log(e)
      } finally {

      }
    }

    if(movie !== null) {
      getMovie()
    }
  }, [movie]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={"max-w-6xl max-h-[90vh] overflow-y-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-red-600"}>
        <div className={"relative pt-[56.25%]"}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${key}`}
            width={"100%"}
            height={"100%"}
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            controls
          />
        </div>

        <div className={"flex flex-col space-y-4"}>
          <h1 className={"text-2xl md:text-4xl lg:text-4xl font-bold line-clamp-1"}>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="text-shadow-md text-sm text-slate-500">
            {movie?.overview}
          </p>
          <div className={"flex flex-row items-center flex-wrap gap-2"}>
            <ReactStars value={movieDetails?.vote_average} count={10} edit={false} color2={"#e5b109"}/>
            <p className={"text-[#e5b109]"}>({movieDetails?.vote_count})</p>
            <span
              className={"text-green-400 font-semibold"}>{movieDetails?.release_date ? movieDetails?.release_date.split("-")[0] : "2023"}</span>
            <div className="inline-flex border-2 border-white/40 text-green-400 font-semibold rounded px-2">HD</div>
          </div>
        </div>

        <div className={"bg-black p-4 rounded-md shadow-2xl"}>
          <h2
            className="mt-2 mb-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
            More Like This
          </h2>

          <div className="grid grid-cols-4 gap-3 items-center scrollbar-hide md:p-2">
            {similarMovies && similarMovies.length && similarMovies
              .filter(item => item.backdrop_path !== null && item.poster_path !== null)
              .map(movie => (
                <MovieItem movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoviePopup;