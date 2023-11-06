"use client";

import {createContext, useContext, useEffect, useState} from "react";
import {AccountProps, ChildProps, ContextType} from "@/types";

export const Context = createContext<ContextType | null>(null)

const GlobalContext = ({children}: ChildProps) => {
  const [account, setAccount] = useState<AccountProps | null>(null)
  const [pageLoader, setPageLoader] = useState(true)

  useEffect(() => {
    setAccount(JSON.parse(sessionStorage.getItem("account")!))
  }, [])
  
  return (
    <Context.Provider value={{account, setAccount, pageLoader, setPageLoader}}>
      {children}
    </Context.Provider>
  );
};

export default GlobalContext;

export const useGlobalContext = () => {
  const context = useContext(Context)
  if (context === null) {
    throw new Error('useGlobalContext must be used within a GlobalContext')
  }
  return context
}