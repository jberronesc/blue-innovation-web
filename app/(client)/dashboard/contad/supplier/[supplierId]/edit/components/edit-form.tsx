"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { ButtonsEdit, ButtonsEditCancel } from "@component/button"
import FormFields from "@contad/supplier/components/FormFields"
import SupplierConstCli, {
  SupplierTypeContributorOptions,
  SupplierTypeIdentificationOptions,
} from "@contad/supplier/domain/constantClient"
import { SupplierGetEntity } from "@contad/supplier/domain/interfaces/SupplierGetEntity"
import {
  SupplierEditFormTypeClient,
  SupplierEditFormSchemaClient,
} from "@contad/supplier/domain/schemas"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"

export default function SupplierEditForm({
  registerToEdit,
}: {
  registerToEdit: SupplierGetEntity
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<SupplierEditFormTypeClient>({
    resolver: zodResolver(SupplierEditFormSchemaClient),
    defaultValues: {
      ...registerToEdit,
      typeContributor: SupplierTypeContributorOptions.find(
        (elem) => elem.value == registerToEdit.typeContributor
      ),
      typeIdentification: SupplierTypeIdentificationOptions.find(
        (elem) => elem.value == registerToEdit.typeIdentification
      ),
    },
  })

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPATCHTokenBlueI({
          url: `/v1/suppliers/${registerToEdit.id}`,
          body: {
            ...data,
            typeContributor: data.typeContributor.value,
            typeIdentification: data.typeIdentification.value,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro actualizado con exito!" })
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
        <ButtonsEdit>
          <ButtonsEditCancel
            href={`${SupplierConstCli.listUrl({})}`}
            query={getParamsToBack(searchParams, SupplierConstCli.getPerst())}
          />
        </ButtonsEdit>
      </form>
    </>
  )
}
