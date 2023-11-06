"use client";

import Navbar from "@/components/shared/navbar";
import {MovieDataProps} from "@/types";

interface Props {
  mvoiesData: MovieDataProps[]
}

const Common = ({mvoiesData}: Props) => {
  return (
    <main className={"flex min-h-screen flex-col"}>
      <Navbar />
    </main>
  );
};

export default Common;