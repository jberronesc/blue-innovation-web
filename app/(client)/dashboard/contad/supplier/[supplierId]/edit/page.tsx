import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import SupplierConstCli from "@contad/supplier/domain/constantClient"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import SupplierEditForm from "./components/edit-form"

export default async function Page({
  params,
}: {
  params: { supplierId: string }
}) {
  const [registerToEditResponse] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/suppliers/${params.supplierId}`,
    }).exec(),
  ])

  const registerToEdit: any = registerToEditResponse.isRight()
    ? registerToEditResponse.getRight().data
    : notFound()

  return (
    <EditBase
      title={"Editar registro de provedores"}
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
      <SupplierEditForm registerToEdit={registerToEdit} />
    </EditBase>
  )
}
