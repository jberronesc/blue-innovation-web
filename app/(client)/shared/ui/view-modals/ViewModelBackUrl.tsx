"use client";

import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { getParamsToBack } from "@utils/back-params/backParams";
import { useState } from "react";
import ConfigSystemSlice from "@rdtkl/slices/configSystemSlice";

export const ViewModelBackUrl = ({
  urlBack,
  persists,
}: {
  urlBack: string;
  persists: { [x: string]: { key: string; type: string } }[];
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [urlCompleteBack, _] = useState(
    `${urlBack}?${getParamsToBack(searchParams, persists)}`,
  );

  const dispatch = useDispatch();

  const goBackSimple = () => {
    dispatch(ConfigSystemSlice.actions.updateLoadingSide(true));
    replace(urlCompleteBack);
  };

  return {
    goBackSimple,
    urlCompleteBack,
  };
};
