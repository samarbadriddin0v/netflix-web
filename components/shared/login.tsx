import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";

const Login = () => {
  return (
    <div className={"w-full h-screen"}>
      <div className={"absolute inset-0"}>
        <Image
          src={"https://repository-images.githubusercontent.com/299409710/b42f7780-0fe1-11eb-8460-e459acd20fb4"}
          alt={"bg"}
          fill
        />
      </div>
      <div className={"relative z-10 rounded-md w-[500px] bg-black/60 h-[50vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4"}>
        <div className={"flex h-full items-center justify-center flex-col"}>
          <Button
            className={"mt-4 flex items-center gap-2 w-full h-[56px] bg-red-600 !text-white hover:bg-red-500"}
            onClick={() => signIn("github")}
          >
            <AiFillGithub className={"w-7 h-7"} />
            Sign in with Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;