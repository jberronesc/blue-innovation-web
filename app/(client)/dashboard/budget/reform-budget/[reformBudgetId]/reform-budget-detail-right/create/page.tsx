import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { notFound } from "next/navigation"
import ReformBudgetDetailRightConst from "../domain/constantClient"
import ReformBudgetDetailRightCreateForm from "./components/CreateForm"
import { ReformBudgetDetailRightBudgetPartidaEntity } from "../domain/interfaces/ReformBudgetDetailRightBudgetPartidaEntity"

const constant = ReformBudgetDetailRightConst

export default async function Page({
  params,
}: {
  params: { reformBudgetId: string }
}) {
  const [reformBudgetRes, rightBudgetPartidaRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/reform-budgets/${params.reformBudgetId}/find`,
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/reform-budgets/${params.reformBudgetId}/reform-budget-detail-rights/budget-partidas`,
    }).exec(),
  ])

  const reformBudget = reformBudgetRes.isRight()
    ? (reformBudgetRes.getRight().data as ReformBudgetFindEntity)
    : notFound()

  const rightBudgetPartida = rightBudgetPartidaRes.isRight()
    ? (rightBudgetPartidaRes.getRight()
        .data as ReformBudgetDetailRightBudgetPartidaEntity)
    : notFound()

  return (
    <CreateBase
      title={"Nuevo registro de reforma de presupuestario detalle derecha"}
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
      <ReformBudgetDetailRightCreateForm
        params={params}
        reformBudget={reformBudget}
        rightBudgetPartida={rightBudgetPartida}
      />
    </CreateBase>
  )
}
