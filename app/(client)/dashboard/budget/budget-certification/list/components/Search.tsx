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
import {
  searchPCreateZObject,
  searchPDefaultValuesWithSelect,
} from "@utils/search-persist/searchPersist";
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit";
import BudgetCertificationConst from "@budget/budget-certification/domain/constantClient";
import DateRangeZod from "@utils/zod/dateRangeZod";
import { InputNumberSearchSimple } from "@component/input/InputNumberSearchSimple";
import { DateRanges } from "@component/date";

const constant = BudgetCertificationConst;

const {
  dateStartFunction,
  dateStartDestinty,
  dateEndFunction,
  dateEndDestinty,
} = DateRangeZod.refineData({
  dateStartName: constant.pQ.dateStart.key,
  dateEndName: constant.pQ.dateEnd.key,
});

const SearchSchema = z
  .object({
    ...searchPCreateZObject(constant.pQ),
  })
  .refine(dateStartFunction, dateStartDestinty)
  .refine(dateEndFunction, dateEndDestinty);

type SearchType = z.infer<typeof SearchSchema>;

const BudgetCertificationSearch = ({
  provokeBack,
}: {
  provokeBack?: string;
}) => {
  const searchParams = useSearchParams();
  const page = searchParams.get(constant.pQ.page.type) || "1";
  const { permissions } = useSelector((store: AppStore) => store.auth);

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValuesWithSelect({
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
    setValueWithSelect: setValue,
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
          <InputNumberSearchSimple
            label="Secuencia..."
            register={{ ...register(constant.pQ.sequence.key) }}
          />
          <DateRanges
            register={register}
            dateStartName={constant.pQ.dateStart.key}
            dateEndName={constant.pQ.dateEnd.key}
            errors={errors}
          />
        </div>
        <div className="mt-3 flex items-center justify-end">
          <SearchButtomsSimple handleClean={handleClean} />
          {permissions?.addBudgetcertification && (
            <span className="ml-3">
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default BudgetCertificationSearch;
