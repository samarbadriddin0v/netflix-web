import React, {Dispatch, SetStateAction} from 'react';
import {AiOutlineSearch} from "react-icons/ai";

interface Props{
  setShowSearchBar: Dispatch<SetStateAction<boolean>>
}
const SearchBar = ({setShowSearchBar}: Props) => {
  return (
    <div className={"hidden md:flex justify-center items-center text-center"}>
      <div className="bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%,100%,0.5)] rounded-sm pr-2 items-center text-center flex">
        <div className={"order-2"}>
          <input
            placeholder={"Search Movies, TV and Dramas"}
            className="bg-transparent text-[14px] font-medium h-[34px] py-2 placeholder:text-[14px] font-md text-white outline-none w-[210px]"
          />
        </div>
        <button className="px-2.5">
          <AiOutlineSearch
            onClick={() => setShowSearchBar(false)}
            className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;