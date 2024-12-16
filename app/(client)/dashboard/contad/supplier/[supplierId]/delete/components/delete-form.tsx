"use client"

import { ButtonsDelete, ButtonsDeleteCancel } from "@component/button"
import SupplierConstCli from "@contad/supplier/domain/constantClient"
import { SupplierGetEntity } from "@contad/supplier/domain/interfaces/SupplierGetEntity"
import { getParamsToBack } from "@utils/back-params/backParams"
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { useRouter, useSearchParams } from "next/navigation"

export default function SupplierDeleteForm({
  registerToEdit,
}: {
  registerToEdit: SupplierGetEntity
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      vmLoading.loadingSimple()

      return (
        await new FetchDELETETokenBlueI({
          url: `/v1/suppliers/${registerToEdit.id}`,
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro eliminado con exito!" })
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
      <div>
        <ButtonsDelete onClick={() => openModal()}>
          <ButtonsDeleteCancel
            href={`${SupplierConstCli.listUrl({})}`}
            query={getParamsToBack(searchParams, SupplierConstCli.getPerst())}
          />
        </ButtonsDelete>
      </div>
    </>
  )
}
