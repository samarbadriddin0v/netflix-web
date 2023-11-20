"use client";

import React from "react";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Common from "@/components/shared/common";
import data from "@/db.json";
import { MovieDataProps } from "@/types";

const Page = () => {
  const moviesData = [
    { title: "Family", data: data.family_movie },
    { title: "Document", data: data.documentary_movie },
    { title: "Drama", data: data.drama_movie },
    { title: "Actions", data: data.animation_movie },
    { title: "Comedy", data: data.comedy_movie },
    { title: "Crime", data: data.crime_movie },
  ];

  const { account } = useGlobalContext();
  const { data: session } = useSession();

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;

  return <Common moviesData={moviesData as unknown as MovieDataProps[]} />;
};

export default Page;
