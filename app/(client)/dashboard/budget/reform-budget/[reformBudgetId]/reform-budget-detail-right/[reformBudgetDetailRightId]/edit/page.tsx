import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { notFound } from "next/navigation"
import ReformBudgetDetailRightConst from "../../domain/constantClient"
import ReformBudgetDetailRightEditForm from "./components/EditForm"
import { ReformBudgetDetailRightBudgetPartidaEntity } from "../../domain/interfaces/ReformBudgetDetailRightBudgetPartidaEntity"

const constant = ReformBudgetDetailRightConst

export default async function Page({
  params,
}: {
  params: {
    reformBudgetId: string
    reformBudgetDetailRightId: string
  }
}) {
  const [registerToEditRes, reformBudgetRes, rightBudgetPartidaRes] =
    await Promise.all([
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/reform-budget-detail-rights/${params.reformBudgetDetailRightId}/find`,
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/reform-budgets/${params.reformBudgetId}/find`,
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: `/budget/v1/reform-budget-detail-rights/${params.reformBudgetDetailRightId}/budget-partidas/with-detail`,
      }).exec(),
    ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  const reformBudget = reformBudgetRes.isRight()
    ? (reformBudgetRes.getRight().data as ReformBudgetFindEntity)
    : notFound()

  const rightBudgetPartida = rightBudgetPartidaRes.isRight()
    ? (rightBudgetPartidaRes.getRight()
        .data as ReformBudgetDetailRightBudgetPartidaEntity)
    : notFound()

  return (
    <EditBase
      title={"Editar registro de reforma de presupuestario detalle derecha"}
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
      <ReformBudgetDetailRightEditForm
        params={params}
        registerToEdit={registerToEdit}
        reformBudget={reformBudget}
        rightBudgetPartida={rightBudgetPartida}
      />
    </EditBase>
  )
}
