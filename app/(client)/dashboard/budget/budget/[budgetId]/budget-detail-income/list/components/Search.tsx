"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSearchSimple } from "@component/input";
import { SearchButtomsSimple } from "@component/search";
import {
  searchPCreateZObject,
  searchPDefaultValuesWithSelect,
} from "@utils/search-persist/searchPersist";
import { ViewModelSearchPersist } from "@viewM/ViewModelSearchPersit";
import BudgetDetailIncomeConst from "../../domain/constantClient";
import { BudgetPartidaTypePertainOptionsEmpty } from "@budget/budget-partida/domain/constantClient";
import { SelectSearchReactCustom } from "@component/select";
import { LabelSimple } from "@component/label";
import SelectZod from "@utils/zod/selectZod";

const constant = BudgetDetailIncomeConst;

const SearchSchema = z.object({
  ...searchPCreateZObject(constant.pQ),
  [constant.pQ.typePertain.key]: SelectZod.objectOptionalString,
});

type SearchType = z.infer<typeof SearchSchema>;

const BudgetDetailIncomeSearch = ({
  provokeBack,
}: {
  provokeBack?: string;
  params: { budgetId: string };
}) => {
  const searchParams = useSearchParams();
  const page = searchParams.get(constant.pQ.page.key) || "1";
  const typePertain = searchParams.get(constant.pQ.typePertain.key) || "";

  const { register, handleSubmit, setValue, control } = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: searchPDefaultValuesWithSelect({
      searchParams,
      persist: constant.pQ,
      defaultInitial: {
        [constant.pQ.page.key]: page,
        [constant.pQ.typePertain.key]:
          BudgetPartidaTypePertainOptionsEmpty.find(
            (elem) => elem.value == typePertain,
          ),
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
          <InputSearchSimple
            label="Busqueda... partida, nombre, descriccion"
            register={{ ...register(constant.pQ.query.key) }}
          />

          <SelectSearchReactCustom
            label={
              <LabelSimple
                name={constant.pQ.typePertain.key}
                label="Tipo pertenece"
              />
            }
            name={constant.pQ.typePertain.key}
            control={control}
            options={BudgetPartidaTypePertainOptionsEmpty}
          />
        </div>
        <div className="mt-3 flex items-center justify-end">
          <SearchButtomsSimple handleClean={handleClean} />
        </div>
      </div>
    </form>
  );
};

export default BudgetDetailIncomeSearch;
