"use client";

import Navbar from "@/components/shared/navbar";
import {MovieDataProps} from "@/types";
import Banner from "@/components/shared/banner";
import MovieRow from "@/components/shared/movie/movie-row";

interface Props {
  moviesData: MovieDataProps[]
}

const Common = ({moviesData}: Props) => {
  return (
    <main className={"flex min-h-screen flex-col"}>
      <Navbar />

      <div className={"relative pl-4 pb-24 lg:space-y-24"}>
        <Banner movies={moviesData && moviesData[0].data} />

        <section className={"md:space-y-16"}>
          {moviesData && moviesData.map((movie => (
            <MovieRow
              title={movie.title}
              data={movie.data}
              key={movie.title}
            />
          )))}
        </section>
      </div>
    </main>
  );
};

export default Common;