import {Dispatch, ReactNode, SetStateAction} from "react";

export interface ContextType {
  account: AccountProps | null
  setAccount: Dispatch<SetStateAction<AccountProps | null>>
  pageLoader: boolean
  setPageLoader: Dispatch<SetStateAction<boolean>>
}

export interface AccountProps {
  _id: string
  uid: string
  name: string
  pin: string
}

export interface ChildProps {
  children: ReactNode
}

export interface AxiosResponse {
  success: boolean
  message?: string
}

export interface AccountResponse extends AxiosResponse{
  data: AccountProps[] | AccountProps
}

export interface MenuItemProps{
  id: string
  title: string
  path: string
}

export interface MovieDataProps {
  title: string,
  data: MovieProps[]
}

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  type: string;
  vote_average: number;
  vote_count: number;
  title: string;
  addedToFavorites: boolean;
  movieID: number;
}