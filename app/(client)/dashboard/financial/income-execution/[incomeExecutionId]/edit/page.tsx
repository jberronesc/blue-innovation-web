import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { SupplierAllEntity } from "@contad/supplier/domain/interfaces/SupplierAllEntity"
import IncomeExecutionConstCli from "@financial/income-execution/domain/constantClient"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import IncomeExecutionEditForm from "./components/edit-form"

export default async function Page({
  params,
}: {
  params: { incomeExecutionId: string }
}) {
  const [registerToEditRes, supplierRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-executions/${params.incomeExecutionId}`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/v1/suppliers/all",
    }).exec(),
  ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  const suppliers = supplierRes.isRight()
    ? (supplierRes.getRight().data as SupplierAllEntity[])
    : []

  return (
    <EditBase
      title={"Editar registro de reforma presupuestaria"}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={IncomeExecutionConstCli.listUrl({})}
              persists={IncomeExecutionConstCli.getPerst()}
            />
          }
        />
      }
    >
      <IncomeExecutionEditForm
        registerToEdit={registerToEdit}
        suppliers={suppliers}
      />
    </EditBase>
  )
}
