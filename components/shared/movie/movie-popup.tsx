"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGlobalContext } from "@/context";
import { useState } from "react";
import ReactStars from "react-stars";
import MovieItem from "@/components/shared/movie/movie-item";
import { Skeleton } from "@/components/ui/skeleton";
import CustomImage from "../custom-image";
import data from "@/db.json";

const MoviePopup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { open, setOpen, movie } = useGlobalContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={
          "max-w-6xl max-h-[90vh] overflow-y-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-red-600"
        }
      >
        {isLoading ? (
          <>
            <Skeleton className={"w-full pt-[56.25%]"} />

            <Skeleton className={"w-1/2 h-8"} />

            <Skeleton className={"w-full h-4"} />
            <Skeleton className={"w-full h-4"} />
            <Skeleton className={"w-full h-4"} />

            <div className={"bg-black p-4 rounded-md shadow-2xl"}>
              <Skeleton className={"w-1/2 h-4"} />

              <div className="grid mt-5 grid-cols-4 gap-3 items-center scrollbar-hide md:p-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
                  <Skeleton className={"w-full h-[150px]"} key={i} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"relative pt-[40.25%]"}>
              <CustomImage
                image={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${
                  movie?.backdrop_path || movie?.poster_path
                }`}
                alt={"Image"}
                className="rounded sm object-cover md:rounded hover:rounded-sm"
              />
            </div>

            <div className={"flex flex-col space-y-4"}>
              <h1
                className={
                  "text-2xl md:text-4xl lg:text-4xl font-bold line-clamp-1"
                }
              >
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <p className="text-shadow-md text-sm text-slate-500">
                {movie?.overview}
              </p>
              <div className={"flex flex-row items-center flex-wrap gap-2"}>
                <ReactStars
                  value={Number(movie?.vote_average) / 2}
                  count={5}
                  edit={false}
                  color2={"#e5b109"}
                />
                <p className={"text-[#e5b109]"}>({movie?.vote_count})</p>
                <span className={"text-green-400 font-semibold"}>2023</span>
                <div className="inline-flex border-2 border-white/40 text-green-400 font-semibold rounded px-2">
                  HD
                </div>
              </div>
            </div>

            <div className={"bg-black p-4 rounded-md shadow-2xl"}>
              <h2 className="mt-2 mb-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
                More Like This
              </h2>

              <div
                className="flex flex-wrap items-center scrollbar-hide"
                style={{ rowGap: 20 }}
              >
                {data.trending_movie.map((movie) => (
                  <MovieItem movie={movie as any} key={movie.id} />
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MoviePopup;
