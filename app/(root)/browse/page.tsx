"use client";

import { useGlobalContext } from "@/context";
import Login from "@/components/shared/login";
import { useSession } from "next-auth/react";
import ManageAccount from "@/components/shared/manage-account";
import Common from "@/components/shared/common";
import data from "@/db.json";
import { MovieDataProps } from "@/types";

const Page = () => {
  const moviesData = [
    { title: "Trending Movies", data: data.trending_movie },
    { title: "Top Rated Movies", data: data.top_rated_movie },
    { title: "Popular Movies", data: data.popular_movie },
    { title: "Trending TV Shows", data: data.trending_tv },
    { title: "Top Rated TV Shows", data: data.top_rated_tv },
    { title: "Popular TV Shows", data: data.popular_tv },
  ];

  const { account } = useGlobalContext();
  const { data: session } = useSession();

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;

  return <Common moviesData={moviesData as MovieDataProps[]} />;
};

export default Page;
