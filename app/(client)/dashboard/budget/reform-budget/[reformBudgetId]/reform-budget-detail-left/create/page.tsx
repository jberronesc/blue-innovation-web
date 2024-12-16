import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { notFound } from "next/navigation"
import ReformBudgetDetailLeftConst from "../domain/constantClient"
import ReformBudgetDetailLeftCreateForm from "./components/CreateForm"
import { ReformBudgetDetailLeftBudgetPartidaEntity } from "../domain/interfaces/ReformBudgetDetailLeftBudgetPartidaEntity"

const constant = ReformBudgetDetailLeftConst

export default async function Page({
  params,
}: {
  params: { reformBudgetId: string }
}) {
  const [reformBudgetRes, leftBudgetPartidaRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/reform-budgets/${params.reformBudgetId}/find`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/reform-budgets/${params.reformBudgetId}/reform-budget-detail-lefts/budget-partidas`,
    }).exec(),
  ])

  const reformBudget = reformBudgetRes.isRight()
    ? (reformBudgetRes.getRight().data as ReformBudgetFindEntity)
    : notFound()

  const leftBudgetPartida = leftBudgetPartidaRes.isRight()
    ? (leftBudgetPartidaRes.getRight()
        .data as ReformBudgetDetailLeftBudgetPartidaEntity)
    : notFound()

  return (
    <CreateBase
      title={"Nuevo registro de reforma de presupuestario detalle izquierda"}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={constant.listUrl({ ...params })}
              persists={constant.getPerst()}
            />
          }
        />
      }
    >
      <ReformBudgetDetailLeftCreateForm
        params={params}
        reformBudget={reformBudget}
        leftBudgetPartida={leftBudgetPartida}
      />
    </CreateBase>
  )
}
