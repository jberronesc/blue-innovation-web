"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { ButtonLink } from "@component/button";
import { SearchButtomsSimple } from "@component/search";
import { AppStore } from "@rdtkl/store";
import DecentralizedUnitConst from "@poaparameter/decentralized-unit/domain/constantClient";
import {
  searchPCreateZObject,
  searchPDefaultValues,
} from "@utils/search-persist/searchPersist";
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit";
import { Form } from "@/app/(client)/shared/ui/shadcn/ui/form";
import { InputSearchSimpleShadow } from "@component/input/InputSearchSimpleShadow";

const constant = DecentralizedUnitConst;

const SearchSchema = z.object({
  ...searchPCreateZObject(constant.pQ),
});

type SearchType = z.infer<typeof SearchSchema>;

const DecentralizedUnitSearch = ({ provokeBack }: { provokeBack?: string }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get(constant.pQ.page.key) || "1";
  const { permissions } = useSelector((store: AppStore) => store.auth);

  const form = useForm<SearchType>({
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
    setValue: form.setValue,
  });

  useEffect(() => {
    form.setValue(constant.pQ.page.key, page);
  }, [page]);

  useEffect(() => {
    if (!searchParams.get(constant.pQ.page.key)) handleCleanFields();
  }, [provokeBack]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-row justify-between">
          <div className="grid grid-cols-3 gap-6">
            <InputSearchSimpleShadow
              control={form.control}
              label="Busqueda..."
              input={{ name: constant.pQ.query.key }}
            />
          </div>
          <div className="mt-3 flex items-center justify-end">
            <SearchButtomsSimple handleClean={handleClean} />
            {permissions?.addDecentralizedunit && (
              <span className="ml-3">
                <ButtonLink href={constant.createUrl({})} />
              </span>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DecentralizedUnitSearch;