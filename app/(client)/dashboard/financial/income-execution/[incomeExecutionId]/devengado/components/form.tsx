"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { ButtonsEdit, ButtonsEditCancel } from "@component/button"
import IncomeExecutionConstCli from "@financial/income-execution/domain/constantClient"
import { IncomeExecutionGetEntity } from "@financial/income-execution/domain/interfaces/IncomeExecutionGetEntity"
import {
  IncomeExecutionDevengadoFormTypeClient,
  IncomeExecutionDevengadoFormSchemaClient,
} from "@financial/income-execution/domain/schemas"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

export default function IncomeExecutionForm({
  registerToEdit,
}: {
  registerToEdit: IncomeExecutionGetEntity
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const {
    formState: { errors },
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<IncomeExecutionDevengadoFormTypeClient>({
    resolver: zodResolver(IncomeExecutionDevengadoFormSchemaClient),
  })

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: `/v1/income-executions/${registerToEdit.id}/devengado`,
          body: {
            ...data,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro actualizado con exito!" })
          replace(
            `${IncomeExecutionConstCli.listUrl({})}?${getParamsToBack(
              searchParams,
              IncomeExecutionConstCli.getPerst()
            )}`
          )
        }
      )
    },
  })

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs"></div>
        <ButtonsEdit>
          <ButtonsEditCancel
            href={`${IncomeExecutionConstCli.listUrl({})}`}
            query={getParamsToBack(
              searchParams,
              IncomeExecutionConstCli.getPerst()
            )}
          />
        </ButtonsEdit>
      </form>
    </>
  )
}
