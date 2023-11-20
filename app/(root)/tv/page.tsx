"use client";

import React from "react";
import { MovieDataProps, MovieProps } from "@/types";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import Common from "@/components/shared/common";
import data from "@/db.json";

const Page = () => {
  const moviesData = [
    { title: "Document", data: data.documentary_tv },
    { title: "Drama", data: data.drama_tv },
    { title: "Family", data: data.family_tv },
    { title: "War", data: data.war_tv },
    { title: "Actions", data: data.action_tv },
    { title: "Comedy", data: data.comedy_tv },
    { title: "Crime", data: data.crime_tv },
  ];

  const { account } = useGlobalContext();
  const { data: session } = useSession();

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;

  return <Common moviesData={moviesData as MovieDataProps[]} />;
};

export default Page;
