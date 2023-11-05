"use client";

import {useGlobalContext} from "@/context";
import Login from "@/components/shared/login";
import {useSession} from "next-auth/react";
import ManageAccount from "@/components/shared/manage-account";

const Page = () => {
  const {account} = useGlobalContext();
  const {data: session} = useSession()

  console.log(session);

  if(session === null) return <Login />
  if(account === null) return <ManageAccount />

  return (
    <div>
      Browse Page
    </div>
  );
};

export default Page;