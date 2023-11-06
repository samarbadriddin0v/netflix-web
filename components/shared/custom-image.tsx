"use client";

import {useState} from "react";
import Image from "next/image";
import {cn} from "@/lib/utils";

interface Props {
  image: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}


const CustomImage = ({image, alt, className, onClick}: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Image
      src={image}
      alt={alt}
      className={cn(
        "object-cover duration-700 ease-in-out",
        isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
        className
      )}
      fill
      onLoadingComplete={() => setIsLoading(false)}
      onClick={onClick}
    />
  );
};

export default CustomImage;