"use client";

import React, { JSX, useEffect } from "react";
import { useDispatch } from "react-redux";
import ConfigSystemSlice from "../../reduxt-toolkit/slices/configSystemSlice";

interface PropsParams {
  children: JSX.Element;

  title: string;
  headerExtra?: JSX.Element;

  info?: JSX.Element;
  searchBtnCreate?: JSX.Element;

  pagination?: JSX.Element;

  provokeBack?: string;

  breadcrumbs?: JSX.Element;
}

export const ListBase = ({ provokeBack = "", ...props }: PropsParams) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ConfigSystemSlice.actions.updateLoadingSide(false));
  }, [provokeBack]);

  return (
    <>
      <div className="w-full pb-10 pe-16 ps-10 pt-5">
        {props.breadcrumbs}

        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-default-900 lg:text-3xl">
            {props.title}
          </h1>
          {props.headerExtra}
        </div>

        <div className="mt-4 flex w-full items-center justify-between gap-2 md:mt-8">
          {props.info}
          {props.searchBtnCreate}
        </div>

        {props.children}

        <div className="mt-5 flex w-full justify-center">
          {props.pagination}
        </div>
      </div>
    </>
  );
};
