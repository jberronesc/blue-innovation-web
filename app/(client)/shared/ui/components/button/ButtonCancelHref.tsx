import React from "react";
import { Button } from "@nextui-org/react";
import ConfigSystemSlice from "@rdtkl/slices/configSystemSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

export const ButtonCancelHref = ({
  label = "Cancelar",
  btn = "danger",
  href,
}: {
  href: string;
  label?: string;
  btn?: "primary" | "danger" | "secondary" | "success";
  query?: string;
}) => {
  const dispatch = useDispatch();

  return (
    <Button color={btn} variant="shadow">
      <Link
        href={href}
        onClick={() =>
          dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
        }
      >
        {label}
      </Link>
    </Button>
  );
};
