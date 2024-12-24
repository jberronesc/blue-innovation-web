"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { ButtonLink } from "@component/button";
import { InputSearchSimple } from "@component/input";
import { SearchButtomsSimple } from "@component/search";
import { AppStore } from "@rdtkl/store";
import BodyConst from "@security/menu/domain/constantClient";
import {
  searchPCreateZObject,
  searchPDefaultValues,
} from "@utils/search-persist/searchPersist";
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit";

const constant = BodyConst;

const SearchSchema = z.object({
  ...searchPCreateZObject(constant.pQ),
});

type SearchType = z.infer<typeof SearchSchema>;

const BodySearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get(constant.pQ.page.key) || "1";
  const { permissions } = useSelector((store: AppStore) => store.auth);

  const { register, handleSubmit, setValue } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValues({
      searchParams,
      persist: constant.pQ,
      defaultInitial: {
        [constant.pQ.page.key]: page,
      },
    }),
  });

  const { onSubmit, handleClean, handleCleanFields } = ViewModelSearchPersist({
    perstQ: constant.pQ,
    persistWhenClean: constant.persistWhenClean,
    setValue,
  });

  useEffect(() => {
    setValue(constant.pQ.page.key, page);
  }, [page]);

  useEffect(() => {
    if (!searchParams.get(constant.pQ.page.key)) handleCleanFields();
  }, [provokeBack]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-row justify-between">
        <div className="grid grid-cols-3 gap-6">
          <InputSearchSimple
            label="Busqueda..."
            register={{ ...register(constant.pQ.query.key) }}
          />
        </div>
        <div className="mt-3 flex items-center justify-end">
          <SearchButtomsSimple handleClean={handleClean} />
          {permissions?.addBody && (
            <span className="ml-3">
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default BodySearch;
