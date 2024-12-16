"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { ButtonsCreate, ButtonsEditCancel } from "@component/button"
import FormFields from "@contad/supplier/components/FormFields"
import SupplierConstCli from "@contad/supplier/domain/constantClient"
import {
  SupplierCreateFormTypeClient,
  SupplierCreateFormSchemaClient,
} from "@contad/supplier/domain/schemas"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

export default function SupplierCreateForm() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<SupplierCreateFormTypeClient>({
    resolver: zodResolver(SupplierCreateFormSchemaClient),
  })

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: "/v1/suppliers",
          body: {
            ...data,
            typeContributor: data.typeContributor.value,
            typeIdentification: data.typeIdentification.value,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          replace(
            `${SupplierConstCli.listUrl({})}?${getParamsToBack(
              searchParams,
              SupplierConstCli.getPerst()
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
        <div className="form-sections-inputs">
          <FormFields register={register} control={control} errors={errors} />
        </div>
        <ButtonsCreate>
          <ButtonsEditCancel
            href={`${SupplierConstCli.listUrl({})}`}
            query={getParamsToBack(searchParams, SupplierConstCli.getPerst())}
          />
        </ButtonsCreate>
      </form>
    </>
  )
}
