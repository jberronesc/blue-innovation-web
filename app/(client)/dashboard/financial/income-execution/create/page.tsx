import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { SupplierAllEntity } from "@contad/supplier/domain/interfaces/SupplierAllEntity"
import { Breadcrumbs } from "@nextui-org/react"
import IncomeExecutionConstCli from "../domain/constantClient"
import IncomeExecutionCreateForm from "./components/create-form"

export default async function Page() {
  const [supplierRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/v1/suppliers/all",
    }).exec(),
  ])

  const suppliers = supplierRes.isRight()
    ? (supplierRes.getRight().data as SupplierAllEntity[])
    : []

  return (
    <CreateBase
      title={"Nuevo registro de ejecucion de ingreso."}
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
      <IncomeExecutionCreateForm suppliers={suppliers} />
    </CreateBase>
  )
}
