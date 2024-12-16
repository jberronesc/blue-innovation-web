import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { ListBase } from "@component/crud"
import ExpenseExecutionConstCli from "@financial/expense-execution/domain/constantClient"
import { ExpenseExecutionGetEntity } from "@financial/expense-execution/domain/interfaces/ExpenseExecutionGetEntity"
import { Breadcrumbs } from "@nextui-org/react"
import { randomUUID } from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import ExpenseExecutionBudgetCommitmentConstCli from "../domain/constantClient"
import { ExpenseExecutionBudgetCommitmentListEntity } from "../domain/interfaces/ExpenseExecutionBudgetCommitmentListEntity"

export default async function Page({
  params,
  searchParams,
}: {
  params: { expenseExecutionId: string }
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const query =
    searchParams?.[ExpenseExecutionBudgetCommitmentConstCli.pQ.query] || ""
  const page =
    Number(searchParams?.[ExpenseExecutionBudgetCommitmentConstCli.pQ.page]) ||
    1
  const provokeBack = randomUUID().toString()

  const shearhParams = () => {
    let result: { [x: string]: string } = {
      page: page.toString(),
    }
    if (query) result["query"] = query
    return result
  }

  const [response, expenseExecutionRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/expense-execution-budget-commitments/expense-executions/${params.expenseExecutionId}`,
      shearhParams: shearhParams(),
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/v1/expense-executions/${params.expenseExecutionId}`,
    }).exec(),
  ])

  const responseJson: any = response.getRight()
    ? (response.getRight().data as ExpenseExecutionBudgetCommitmentListEntity[])
    : []
  const expenseExecution: ExpenseExecutionGetEntity =
    expenseExecutionRes.isRight()
      ? (expenseExecutionRes.getRight().data as ExpenseExecutionGetEntity)
      : notFound()
  console.log({
    msg: "respuesta",
    value: responseJson,
  })

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Compromisos presupuestarios"
      info={
        <ExpenseAffectationSearch
          provokeBack={provokeBack}
          params={params}
          expenseExecution={expenseExecution}
        />
      }
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
      <ExpenseAffectationTable
        registers={responseJson}
        params={params}
        expenseExecution={expenseExecution}
      />
    </ListBase>
  )
}
