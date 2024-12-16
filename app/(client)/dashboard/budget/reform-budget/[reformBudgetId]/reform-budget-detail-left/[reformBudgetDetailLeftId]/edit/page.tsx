import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { notFound } from "next/navigation"
import ReformBudgetDetailLeftConst from "../../domain/constantClient"
import ReformBudgetDetailLeftEditForm from "./components/EditForm"
import { ReformBudgetDetailLeftBudgetPartidaEntity } from "../../domain/interfaces/ReformBudgetDetailLeftBudgetPartidaEntity"

const constant = ReformBudgetDetailLeftConst

export default async function Page({
  params,
}: {
  params: {
    reformBudgetId: string
    reformBudgetDetailLeftId: string
  }
}) {
  const [registerToEditRes, reformBudgetRes, leftBudgetPartidaRes] =
    await Promise.all([
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/reform-budget-detail-lefts/${params.reformBudgetDetailLeftId}/find`,
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/reform-budgets/${params.reformBudgetId}/find`,
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/reform-budget-detail-lefts/${params.reformBudgetDetailLeftId}/budget-partidas/with-detail`,
      }).exec(),
    ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  const reformBudget = reformBudgetRes.isRight()
    ? (reformBudgetRes.getRight().data as ReformBudgetFindEntity)
    : notFound()

  const leftBudgetPartida = leftBudgetPartidaRes.isRight()
    ? (leftBudgetPartidaRes.getRight()
        .data as ReformBudgetDetailLeftBudgetPartidaEntity)
    : notFound()

  return (
    <EditBase
      title={"Editar registro de reforma de presupuestario detalle izquierda"}
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
      <ReformBudgetDetailLeftEditForm
        params={params}
        registerToEdit={registerToEdit}
        reformBudget={reformBudget}
        leftBudgetPartida={leftBudgetPartida}
      />
    </EditBase>
  )
}
