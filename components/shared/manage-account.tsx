"use client";

import Image from "next/image";
import {useState} from "react";
import {LockKeyhole, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import CreateAccountForm from "@/components/form/create-account-form";
import LoginAccountForm from "@/components/form/login-account-form";

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<"login" | "create">("create")

  return (
    <div className={"min-h-screen flex justify-center flex-col items-center relative"}>

      <div className={"flex justify-center flex-col items-center"}>
        <h1 className={"text-white font-bold text-5xl my-12"}>Who's Watching?</h1>

        <ul className={"flex p-0 my-12"}>
          <li
            onClick={() => {
              setOpen(true)
              setState("login")
            }}
            className={"max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"}
          >
            <div className="relative">
              <div className={"max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative"}>
                <Image
                  src={"https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"}
                  alt={"account"}
                  fill
                />
              </div>
              {isDelete ? (
                <div className={"absolute transform bottom-0 z-10 cursor-pointer"}>
                  <Trash2 className={"w-8 h-8 text-red-600"} />
                </div>
              ) : null}
            </div>
            <div className={"flex items-center gap-1"}>
              <span className={"font-mono font-bold text-xl"}>Samar</span>
              <LockKeyhole />
            </div>
          </li>

          <li
            onClick={() => {
              setOpen(true)
              setState("create")
            }}
            className={"border bg-[#e5b109] font-bold text-xl border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"}
          >
            Add account
          </li>
        </ul>

        <Button
          onClick={() => setIsDelete(prev => !prev)}
          className={"bg-transparent rounded-none hover:bg-transparent !text-white border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]"}
        >
          Manage Profiles
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {state === "login" && <LoginAccountForm />}
          {state === "create" && <CreateAccountForm />}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ManageAccount;