"use client";

import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import ConfigSystemSlice from "../../reduxt-toolkit/slices/configSystemSlice";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";

export const ButtonLink = ({
  href,
  label = "Nuevo registro",
  btn = "primary",
  query,
}: {
  href: string;
  label?: string;
  btn?: "primary" | "danger" | "secondary" | "success";
  query?: string;
}) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const getQuery = () => {
    if (query) return `?${query}`;
    return `?${new URLSearchParams(searchParams).toString()}`;
  };

  return (
    <>
      <Button color={btn} variant="shadow">
        <Link
          href={`${href}${getQuery()}`}
          onClick={() =>
            dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
          }
        >
          {label}
        </Link>
      </Button>
    </>
  );
};
