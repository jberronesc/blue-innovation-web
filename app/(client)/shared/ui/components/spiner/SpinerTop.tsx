"use client";

import React from "react";
import { AppStore } from "../../reduxt-toolkit/store";
import { useSelector } from "react-redux";
import { Progress } from "../../shadcn/ui/progress";

export const SpinerTop = () => {
  const { isLoadingSide } = useSelector(
    (store: AppStore) => store.configSystem,
  );

  return (
    <>
      {isLoadingSide && (
        <div className="fixed left-0 top-0 z-50 block w-full bg-white bg-opacity-70">
          <Progress indeterminate={true} />
        </div>
      )}
    </>
  );
};
