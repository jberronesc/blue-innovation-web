import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { IncomeExecutionGetEntity } from "@financial/income-execution/domain/interfaces/IncomeExecutionGetEntity"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import IncomeAffectationConstCli from "../domain/constantClient"
import { IncomeAffectationAccountAccountantEntity } from "../domain/interfaces/IncomeAffectationAccountAccountantEntity"
import IncomeAffectationCreateForm from "./components/create-form"

export default async function Page({
  params,
}: {
  params: { incomeExecutionId: string }
}) {
  const [incomeExecutionResponse, accountAccountantsRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-executions/${params.incomeExecutionId}`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-affectations/income-executions/${params.incomeExecutionId}/account-accountants`,
    }).exec(),
  ])

  const incomeExecution: IncomeExecutionGetEntity =
    incomeExecutionResponse.isRight()
      ? (incomeExecutionResponse.getRight().data as IncomeExecutionGetEntity)
      : notFound()

  console.log(accountAccountantsRes)

  const accountAccountants = accountAccountantsRes.isRight()
    ? (accountAccountantsRes.getRight()
        .data as IncomeAffectationAccountAccountantEntity[])
    : []

  return (
    <CreateBase
      title={"Nuevo registro de afectacion de ingresos"}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={IncomeAffectationConstCli.listUrl({ ...params })}
              persists={IncomeAffectationConstCli.getPerst()}
            />
          }
        />
      }
    >
      <IncomeAffectationCreateForm
        params={params}
        accountAccountants={accountAccountants}
      />
    </CreateBase>
  )
}
