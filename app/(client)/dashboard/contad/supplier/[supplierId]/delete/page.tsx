import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { DeleteBase } from "@component/crud"
import SupplierConstCli from "@contad/supplier/domain/constantClient"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import SupplierDeleteForm from "./components/delete-form"

export default async function Page({
  params,
}: {
  params: { supplierId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/suppliers/${params.supplierId}`,
    }).exec(),
  ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  return (
    <DeleteBase
      title={"Eliminar registro."}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={SupplierConstCli.listUrl({})}
              persists={SupplierConstCli.getPerst()}
            />
          }
        />
      }
    >
      <SupplierDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  )
}
