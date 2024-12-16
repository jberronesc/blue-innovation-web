"use client"

import React from "react"
import { AppStore } from "../../reduxt-toolkit/store"
import { useSelector } from "react-redux"
import { Spinner } from "@nextui-org/react"

export const SpinerScreen = () => {
  const { isLoading } = useSelector((store: AppStore) => store.configSystem)

  return (
    <>
      {isLoading && (
        <div className="fixed left-0 top-0 z-[1000000] block h-full w-full bg-white bg-opacity-70 inset-0">
          <span className="r-4 relative top-1/3 mx-auto my-0 block h-0 w-64 text-green-500 opacity-75">
            <div className="text-center">
              <Spinner size="lg" className="font-bold" />
              <span className="sr-only">Loading...</span>
            </div>

            <div className="text-black mt-7 font-bold text-center">
              <p className="text-black">Procesando informacion...</p>
              <p>Por favor espero un momento...</p>
            </div>
          </span>
        </div>
      )}
    </>
  )
}
