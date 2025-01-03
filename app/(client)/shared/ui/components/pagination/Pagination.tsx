"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getInfoPagination } from "../../../utils/pagination/pagination";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationShadcn,
} from "../../shadcn/ui/pagination";
import React, { useId } from "react";
import ConfigSystemSlice from "@rdtkl/slices/configSystemSlice";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
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
  ];
};

export function Pagination({
  itemCount,
  pageName = "page",
}: {
  itemCount: number;
  pageName?: string;
}) {
  const totalPages = getInfoPagination({ count: +itemCount }).totalPages;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get(pageName)) || 1;
  const allPages = generatePagination(currentPage, totalPages);
  const dispatch = useDispatch();
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(pageName, pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // NOTE: comment in this code when you get to this point in the course
  const isDisabledLeft = currentPage <= 1;
  const isDisabledRight = currentPage >= totalPages;

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <PaginationShadcn>
        <PaginationContent>
          <PaginationItem key={v4()}>
            <PaginationPrevious
              href="#"
              className={clsx({
                "pointer-events-none text-gray-300": isDisabledLeft,
                "hover:bg-gray-100": !isDisabledLeft,
              })}
              onClick={() => {
                replace(createPageURL(currentPage - 1));
                dispatch(ConfigSystemSlice.actions.updateLoadingSide(true));
              }}
            />
          </PaginationItem>

          {allPages.map((page) => {
            if (page === "...")
              return (
                <PaginationItem key={v4()}>
                  <PaginationEllipsis />
                </PaginationItem>
              );

            return (
              <PaginationItem key={v4()}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={() => {
                    replace(createPageURL(page));
                    dispatch(ConfigSystemSlice.actions.updateLoadingSide(true));
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem key={v4()}>
            <PaginationNext
              href="#"
              className={clsx({
                "pointer-events-none text-gray-300": isDisabledRight,
                "hover:bg-gray-100": !isDisabledRight,
              })}
              onClick={() => {
                replace(createPageURL(currentPage + 1));
                dispatch(ConfigSystemSlice.actions.updateLoadingSide(true));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationShadcn>
    </>
  );
}
