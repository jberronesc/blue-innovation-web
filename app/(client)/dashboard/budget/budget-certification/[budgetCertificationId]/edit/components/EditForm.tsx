"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import BudgetCertificationConst from "@budget/budget-certification/domain/constantClient"
import { BudgetCertificationFindEntity } from "@budget/budget-certification/domain/interfaces/BudgetCertificationFindEntity"
import {
  BudgetCertificationEditType,
  BudgetCertificationEditSchema,
} from "@budget/budget-certification/domain/schemas"
import { ButtonCancelHref, ButtonsEdit } from "@component/button"
import { DateSimple } from "@component/date"
import { ErrorField } from "@component/form"
import { InputSimple } from "@component/input"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { ViewModelBackUrl } from "@viewM/index"

const constant = BudgetCertificationConst

export default function BudgetCertificationEditForm({
  registerToEdit,
}: {
  registerToEdit: BudgetCertificationFindEntity
}) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<BudgetCertificationEditType>({
    resolver: zodResolver(BudgetCertificationEditSchema),
    defaultValues: {
      ...registerToEdit,
    },
  })

  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPATCHTokenBlueI({
          url: `/budget/v1/budget-certifications/${registerToEdit.id}/update`,
          body: {
            ...data,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro actualizado con exito!" })
          vmBackUrl.goBackSimple()
        }
      )
    },
  })

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs">
          <DateSimple
            label="Fecha"
            register={{ ...register("date") }}
            errors={<ErrorField field={errors.date} />}
          />
          <InputSimple
            label="Documento de referencia"
            register={{ ...register("documentReference") }}
            errors={<ErrorField field={errors.documentReference} />}
          />
          <InputSimple
            label="Concepto"
            register={{ ...register("concept") }}
            errors={<ErrorField field={errors.concept} />}
          />
        </div>
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  )
}
