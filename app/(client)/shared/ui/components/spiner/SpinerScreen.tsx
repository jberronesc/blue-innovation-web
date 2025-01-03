"use client";

import React from "react";
import { AppStore } from "../../reduxt-toolkit/store";
import { useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";

export const SpinerScreen = () => {
  const { isLoading } = useSelector((store: AppStore) => store.configSystem);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 left-0 top-0 z-[1000000] block h-full w-full bg-white bg-opacity-70">
          <span className="r-4 relative top-1/3 mx-auto my-0 block h-0 w-64 text-green-500 opacity-75">
            {/* 
              <LoaderCircle className={cn("animate-spin")} size={70} />
            */}

            <div className="flex justify-center">
              <LoaderIcon className="animate-spin" size={70} />
            </div>

            <div className="mt-7 text-center font-bold text-black">
              <p className="text-black">Procesando informacion...</p>
              <p>Por favor espero un momento.</p>
            </div>
          </span>
        </div>
      )}
    </>
  );
};
