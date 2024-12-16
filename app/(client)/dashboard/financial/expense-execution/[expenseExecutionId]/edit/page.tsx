import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { SupplierAllEntity } from "@contad/supplier/domain/interfaces/SupplierAllEntity"
import { TransactionInfoToValidateEntity } from "@contad/transaction/domain/interfaces/TransactionListEntity"
import ExpenseExecutionConstCli from "@financial/expense-execution/domain/constantClient"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import ExpenseExecutionEditForm from "./components/edit-form"

export default async function Page({
  params,
}: {
  params: { expenseExecutionId: string }
}) {
  const [transactionInfoToValidateRes, registerToEditRes, supplierRes] =
    await Promise.all([
      await new FetchBackGETTokenBlueI({
        url: "/v1/transactions/info-to-validate",
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: `/v1/expense-executions/${params.expenseExecutionId}`,
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: "/v1/suppliers/all",
      }).exec(),
    ])

  const transactionInfoToValidate = transactionInfoToValidateRes.isRight()
    ? (transactionInfoToValidateRes.getRight()
        .data as TransactionInfoToValidateEntity)
    : notFound()

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
              url={ExpenseExecutionConstCli.listUrl({})}
              persists={ExpenseExecutionConstCli.getPerst()}
            />
          }
        />
      }
    >
      <ExpenseExecutionEditForm
        transactionInfoToValidate={transactionInfoToValidate}
        registerToEdit={registerToEdit}
        suppliers={suppliers}
      />
    </EditBase>
  )
}
