"use client";

import Link from "next/link";
import React, { JSX } from "react";
import { useDispatch } from "react-redux";
import ConfigSystemSlice from "../../reduxt-toolkit/slices/configSystemSlice";
import { useSearchParams } from "next/navigation";

export const ButtonLinkRoundedToGo = ({
  href,
  icon,
}: {
  href: string;
  icon?: JSX.Element;
}) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  return (
    <Link
      href={`${href}?${new URLSearchParams(searchParams).toString()}`}
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() =>
        dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
      }
    >
      {icon}
    </Link>
  );
};
