"use client";

import Image from "next/image";
import {menuItems} from "@/constants";
import {AiOutlineSearch} from "react-icons/ai";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useGlobalContext} from "@/context";
import {signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import SearchBar from "@/components/shared/navbar/search-bar";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import MoviePopup from "@/components/shared/movie/movie-popup";
import axios from "axios";
import {AccountProps, AccountResponse} from "@/types";
import {toast} from "@/components/ui/use-toast";
import {Loader2} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [accounts, setAccounts] = useState<AccountProps[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const {account, setAccount, setPageLoader} = useGlobalContext()
  const {data: session}: any = useSession()
  const router = useRouter()

  useEffect(() => {
    const getAllAccounts = async () => {
      setIsLoading(true)
      try {
        const {data} = await axios.get<AccountResponse>(`/api/account?uid=${session.user.uid}`)
        data.success && setAccounts(data.data as AccountProps[]);
      } catch (e) {
        return toast({
          title: "Error",
          description: "An error occurred while fetching your accounts",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    getAllAccounts()

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, []);

  const logout = () => {
    sessionStorage.removeItem("account");
    signOut()
    setAccount(null)
  }

  return (
    <div className={"relative"}>
      <header className={cn("header h-[10vh] hover:bg-black transition-all duration-400 ease-in-out", isScrolled && "bg-black")}>
        <div className={"flex items-center h-full space-x-2 md:space-x-10"}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={120}
            height={120}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
            onClick={() => {
              router.push("/browse")
              setPageLoader(true)
            }}
          />
          <ul className={"hidden md:space-x-4 md:flex cursor-pointer"}>
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  router.push(item.path)
                  setPageLoader(true)
                }}
                key={item.path}
                className={"cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <MoviePopup />

        <div className={"font-light flex items-center space-x-4 text-sm"}>
          {showSearchBar ? (
            <SearchBar setShowSearchBar={setShowSearchBar} />
          ) : (
           <AiOutlineSearch
            onClick={() => setShowSearchBar(prev => !prev)}
            className={"hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"}
           />
          )}

          <Popover>
            <PopoverTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <img
                  src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                  alt="Current Profile"
                  className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                />
                <p>{account && account.name}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {isLoading ? (
                <div className={"flex flex-col space-y-4"}>
                  {[1, 2].map((_, i) => (
                    <Skeleton className={"w-full h-14"} />
                  ))}
                </div>
              ) : (
                accounts && accounts.map(account => (
                  <div
                    className={"cursor-pointer flex gap-3 h-14 hover:bg-slate-800 rounded-md items-center px-4 py-2"}
                    key={account._id}
                    onClick={() => {
                      setAccount(null)
                      sessionStorage.removeItem("account")
                    }}
                  >
                    <img
                      src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                      alt="Current Profile"
                      className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                    />
                    <p>{account.name}</p>
                  </div>
                ))
              )}

              <button
                onClick={logout}
                className={"mt-4 text-center w-full text-sm font-light hover:bg-slate-800 rounded-md py-2 border border-white/40 h-[56px]"}
              >
                Sign out of Netflix
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  );
};

export default Navbar;