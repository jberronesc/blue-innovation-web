import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { CreateBase } from "@component/crud"
import { SupplierAllEntity } from "@contad/supplier/domain/interfaces/SupplierAllEntity"
import { TransactionInfoToValidateEntity } from "@contad/transaction/domain/interfaces/TransactionListEntity"
import { notFound } from "next/navigation"
import IncomeXCobrarCreateForm from "./components/create-form"

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
    <CreateBase title={"Cobros"}>
      <IncomeXCobrarCreateForm
        transactionInfoToValidate={transactionInfoToValidate}
        suppliers={suppliers}
      />
    </CreateBase>
  )
}
