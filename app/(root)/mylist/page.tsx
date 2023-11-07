"use client";

import {useSession} from "next-auth/react";
import {useGlobalContext} from "@/context";
import {useEffect, useState} from "react";
import {FavouriteProps, MovieProps} from "@/types";
import {toast} from "@/components/ui/use-toast";
import {getFavourites} from "@/lib/api";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Loader from "@/components/shared/loader";
import MovieItem from "@/components/shared/movie/movie-item";
import Navbar from "@/components/shared/navbar";
import Banner from "@/components/shared/banner";

const Page = () => {
  const [favourites, setFavourites] = useState<FavouriteProps[]>([])

  const {data: session}: any = useSession()
  const {account, setPageLoader, pageLoader} = useGlobalContext()

  useEffect(() => {
    const getData = async () => {
      try {
        const {data} = await getFavourites(session?.user?.uid, account?._id)
        setFavourites(data)
      } catch (e) {
        return toast({
          title: "Error",
          description: "Something went wrong, please try again later",
          variant: "destructive"
        })
      } finally {
        setPageLoader(false)
      }
    }
    if (session && account) {
      getData()
    }
  }, [account, session]);

  if (session === null) return <Login/>
  if (account === null) return <ManageAccount/>
  if (pageLoader) return <Loader/>

  return (
    <main className={"flex min-h-screen flex-col"}>
      <Navbar/>
      <div className={"md:px-12 px-4"}>
        {favourites && favourites.length === 0 ? (
          <div>Not found</div>
        ) : (
          <>
            {/*@ts-ignore*/}
            <Banner movies={favourites as MovieProps[]} />
            <div className={"h-40 space-y-0.5 md:space-y-2 px-4"}>
              <h2
                className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
                My list
              </h2>

              <div className={"group relative md:-ml-2 pb-12"}>
                <div className={"grid grid-cols-5 gap-4"}>
                  {favourites && favourites.map(((fav: FavouriteProps) => (
                    <MovieItem
                      key={fav.movieId}
                      movie={{
                        backdrop_path: fav.backdrop_path,
                        poster_path: fav.poster_path,
                        id: +fav.movieId as number,
                        type: fav.type,
                        title: fav.title,
                        overview: fav.overview,
                      } as MovieProps}
                      favouriteId={fav?._id}
                      setFavourites={setFavourites}
                    />
                  )))}
                </div>
              </div>
            </div>
          </>

        )}
      </div>
    </main>
  );
};

export default Page;
