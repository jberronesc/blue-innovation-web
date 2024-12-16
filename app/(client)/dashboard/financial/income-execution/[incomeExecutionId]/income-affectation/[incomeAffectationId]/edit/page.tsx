import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { IncomeExecutionGetEntity } from "@financial/income-execution/domain/interfaces/IncomeExecutionGetEntity"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import IncomeAffectationConstCli from "../../domain/constantClient"
import { IncomeAffectationAccountAccountantEntity } from "../../domain/interfaces/IncomeAffectationAccountAccountantEntity"
import IncomeAffectationEditForm from "./components/edit-form"

export default async function Page({
  params,
}: {
  params: {
    incomeExecutionId: string
    incomeAffectationId: string
  }
}) {
  const [
    registerToEditResponse,
    incomeExecutionResponse,
    accountAccountantsRes,
  ] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-affectations/${params.incomeAffectationId}`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-executions/${params.incomeExecutionId}`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-affectations/${params.incomeAffectationId}/account-accountants-with-detail`,
    }).exec(),
  ])

  const incomeExecution: IncomeExecutionGetEntity =
    incomeExecutionResponse.isRight()
      ? (incomeExecutionResponse.getRight().data as IncomeExecutionGetEntity)
      : notFound()

  const registerToEdit: any = registerToEditResponse.isRight()
    ? registerToEditResponse.getRight().data
    : notFound()

  const accountAccountants = accountAccountantsRes.isRight()
    ? (accountAccountantsRes.getRight()
        .data as IncomeAffectationAccountAccountantEntity[])
    : []

  return (
    <EditBase
      title={"Editar registro de compromiso de presupuestario detalle"}
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
      <IncomeAffectationEditForm
        registerToEdit={registerToEdit}
        params={params}
        accountAccountants={accountAccountants}
      />
    </EditBase>
  )
}
