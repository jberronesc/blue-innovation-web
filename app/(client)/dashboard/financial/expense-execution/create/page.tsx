import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { SupplierAllEntity } from "@contad/supplier/domain/interfaces/SupplierAllEntity"
import { TransactionInfoToValidateEntity } from "@contad/transaction/domain/interfaces/TransactionListEntity"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import ExpenseExecutionConstCli from "../domain/constantClient"
import ExpenseExecutionCreateForm from "./components/create-form"

export default async function Page() {
  const [transactionInfoToValidateRes, supplierRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/v1/transactions/info-to-validate",
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/v1/suppliers/all",
    }).exec(),
  ])

  const transactionInfoToValidate = transactionInfoToValidateRes.isRight()
    ? (transactionInfoToValidateRes.getRight()
        .data as TransactionInfoToValidateEntity)
    : notFound()

  const suppliers = supplierRes.isRight()
    ? (supplierRes.getRight().data as SupplierAllEntity[])
    : []

  return (
    <CreateBase
      title={"Nuevo registro de ejecucion de gasto."}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={ExpenseExecutionConstCli.listUrl({})}
              persists={ExpenseExecutionConstCli.getPerst()}
            />
          }
        />
      }
    >
      <ExpenseExecutionCreateForm
        transactionInfoToValidate={transactionInfoToValidate}
        suppliers={suppliers}
      />
    </CreateBase>
  )
}
