"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React from "react"
import { IconArrowLeft } from "@tabler/icons-react"
import ConfigSystemSlice from "../../reduxt-toolkit/slices/configSystemSlice"
import { useDispatch } from "react-redux"
import { getParamsToBack } from "../../../utils/back-params/backParams"

interface PropsParams {
  url: string
  persists: { [x: string]: { key: string; type: string } }[]
}

export const BreadcrumbBtnBack = (props: PropsParams) => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()

  //  className="w-6 h-5 me-2 -ms-1"
  return (
    <Link
      href={`${props.url}?${getParamsToBack(
        searchParams,
        props.persists || []
      )}`}
      onClick={() =>
        dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
      }
    >
      <button
        type="button"
        className="text-black border border-none focus:ring-4 focus:outline-none  font-medium rounded-full text-sm ps-4 pe-5 py-[0.4rem] text-center inline-flex items-center focus:ring-gray-600 bg-gray-100 border-gray-700 hover:bg-gray-200 mb-2"
      >
        <IconArrowLeft className="w-6 h-4 me-2 -ms-1" />
        Atras
      </button>
    </Link>
  )
}
