"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {LockKeyhole, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import CreateAccountForm from "@/components/form/create-account-form";
import LoginAccountForm from "@/components/form/login-account-form";
import {AccountProps, AccountResponse} from "@/types";
import axios from "axios";
import {useSession} from "next-auth/react";
import {toast} from "@/components/ui/use-toast";
import Loader from "@/components/shared/loader";

const ManageAccount = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<"login" | "create">("create")
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [currentAccount, setCurrentAccount] = useState<AccountProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const {data: session}: any = useSession()

  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const {data} = await axios.get<AccountResponse>(`/api/account?uid=${session.user.uid}`)
        data.success && setAccounts(data.data as AccountProps[]);
      }catch (e) {
        return toast({
          title: "Error",
          description: "An error occurred while fetching your accounts",
          variant: "destructive"
        })
      }finally {
        setIsLoading(false)
      }
    }

    getAllAccounts()
  }, [session])


  const onDelete = async (id: string) => {
    try {
      const isConfirmed = confirm("Are you sure you want to delete this account?")
      if(isConfirmed) {
        const {data} = await  axios.delete<AccountResponse>(`/api/account?id=${id}`)
        if(data.success) {
          setAccounts(accounts.filter(account => account._id !== id))
          return toast({
            title: "Account deleted successfully",
            description: "Your account has been deleted successfully",
          })
        }else {
          return toast({
            title: "Error",
            description: data.message,
            variant: "destructive"
          })
        }
      }
    }catch (e) {
      return toast({
        title: "Error",
        description: "An error occurred while deleting your account",
        variant: "destructive"
      })
    }
  }

  if(isLoading) return <Loader />

  return (
    <div className={"min-h-screen flex justify-center flex-col items-center relative"}>

      <div className={"flex justify-center flex-col items-center"}>
        <h1 className={"text-white font-bold text-5xl my-12"}>Who's Watching?</h1>

        <ul className={"flex p-0 my-12 gap-4"}>
          {isLoading ? null : (
            <>
              {accounts && accounts.map(account => (
                <li
                  key={account._id}
                  onClick={() => {
                    if(isDelete) return
                    setOpen(true)
                    setState("login")
                    setCurrentAccount(account)
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
                      <div
                        className={"absolute transform bottom-0 z-10 cursor-pointer"}
                        onClick={() => onDelete(account._id)}
                      >
                        <Trash2 className={"w-8 h-8 text-red-600"} />
                      </div>
                    ) : null}
                  </div>
                  <div className={"flex items-center gap-1"}>
                    <span className={"font-mono font-bold text-xl"}>{account.name}</span>
                    <LockKeyhole />
                  </div>
                </li>
              ))}
              {accounts && accounts.length < 4 ? (
                <li
                  onClick={() => {
                    setOpen(true)
                    setState("create")
                  }}
                  className={"border bg-[#e5b109] font-bold text-xl border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"}
                >
                  Add account
                </li>
              ) : null}
            </>
          )}
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
          {state === "login" && <LoginAccountForm currentAccount={currentAccount} />}
          {state === "create" && <CreateAccountForm
              uid={session?.user?.uid}
              setOpen={setOpen}
              setAccounts={setAccounts}
              accounts={accounts}
          />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAccount;