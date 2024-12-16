"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useDispatch } from "react-redux"
import ConfigSystemSlice from "../../reduxt-toolkit/slices/configSystemSlice"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { getInfoPagination } from "../../../utils/pagination/pagination"

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export function Pagination({
  itemCount,
  pageName = "page",
}: {
  itemCount: number
  pageName?: string
}) {
  const totalPages = getInfoPagination({ count: +itemCount }).totalPages
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get(pageName)) || 1
  const allPages = generatePagination(currentPage, totalPages)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set(pageName, pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // NOTE: comment in this code when you get to this point in the course

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined

            if (index === 0) position = "first"
            if (index === allPages.length - 1) position = "last"
            if (allPages.length === 1) position = "single"
            if (page === "...") position = "middle"

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            )
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string
  href: string
  position?: "first" | "last" | "middle" | "single"
  isActive: boolean
}) {
  const dispatch = useDispatch()

  /*
  "rounded-l-full": position === "first" || position === "single",
      "rounded-r-full": position === "last" || position === "single",
  */

  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border text-black font-bold rounded-full",
    {
      "z-10 bg-blue-600 border-blue-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  )

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link
      href={href}
      className={className}
      onClick={() =>
        dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
      }
    >
      {page}
    </Link>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string
  direction: "left" | "right"
  isDisabled?: boolean
}) {
  const dispatch = useDispatch()

  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-full border text-black font-bold",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  )

  const icon =
    direction === "left" ? (
      <IconArrowLeft className="w-4" />
    ) : (
      <IconArrowRight className="w-4" />
    )

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link
      className={className}
      href={href}
      onClick={() =>
        dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
      }
    >
      {icon}
    </Link>
  )
}
