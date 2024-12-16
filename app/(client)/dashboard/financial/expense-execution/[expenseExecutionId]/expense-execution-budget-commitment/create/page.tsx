import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { AccountAccountantTypePertain } from "@contad/account-accountant/domain/constantClient"
import { AccountAccountantActiveEntity } from "@contad/account-accountant/domain/interfaces/AccountAccountantActiveEntity"
import { ExpenseExecutionGetEntity } from "@financial/expense-execution/domain/interfaces/ExpenseExecutionGetEntity"
import { TypeRetentionActiveEntity } from "@financial/type-retention/domain/interfaces/TypeRetentionActiveEntity"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import ExpenseExecutionBudgetCommitmentConstCli from "../domain/constantClient"
import { ExpenseExecutionBudgetCommitmentActiveEntity } from "../domain/interfaces/ExpenseExecutionBudgetCommitmentActiveEntity"
import ExpenseExecutionBudgetCommitmentCreateForm from "./components/create-form"

export default async function Page({
  params,
}: {
  params: { expenseExecutionId: string }
}) {
  const [
    expenseExecutionRes,
    expenseExecutionBudgetCommitmentActivesRes,
    typeRetentionActivesRes,
    accountAccountantRes,
  ] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/expense-executions/${params.expenseExecutionId}`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/v1/expense-execution-budget-commitments/expense-executions/${params.expenseExecutionId}/actives`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/v1/type-retentions/actives`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/v1/account-accountants/actives",
      shearhParams: {
        typePertain: AccountAccountantTypePertain.ACCOUNT_LEVEL_2.value,
      },
    }).exec(),
  ])

  const expenseExecution: ExpenseExecutionGetEntity =
    expenseExecutionRes.isRight()
      ? (expenseExecutionRes.getRight().data as ExpenseExecutionGetEntity)
      : notFound()

  const expenseExecutionBudgetCommitmentActives =
    expenseExecutionBudgetCommitmentActivesRes.isRight()
      ? (expenseExecutionBudgetCommitmentActivesRes.getRight()
          .data as ExpenseExecutionBudgetCommitmentActiveEntity[])
      : []

  const typeRetentionActives = typeRetentionActivesRes.isRight()
    ? (typeRetentionActivesRes.getRight().data as TypeRetentionActiveEntity[])
    : []

  const accountAccountants = accountAccountantRes.isRight()
    ? (accountAccountantRes.getRight().data as AccountAccountantActiveEntity[])
    : []

  return (
    <CreateBase
      title={"Adicionar compromiso presupuestario"}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={ExpenseExecutionBudgetCommitmentConstCli.listUrl({
                ...params,
              })}
              persists={ExpenseExecutionBudgetCommitmentConstCli.getPerst()}
            />
          }
        />
      }
    >
      <ExpenseExecutionBudgetCommitmentCreateForm
        params={params}
        expenseExecutionBudgetCommitmentActives={
          expenseExecutionBudgetCommitmentActives
        }
        typeRetentionActives={typeRetentionActives}
        accountAccountants={accountAccountants}
      />
    </CreateBase>
  )
}
