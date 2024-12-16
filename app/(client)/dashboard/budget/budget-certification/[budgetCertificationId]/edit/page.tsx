import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import BudgetCertificationConst from "@budget/budget-certification/domain/constantClient"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetCertificationEditForm from "./components/EditForm"

const constant = BudgetCertificationConst

export default async function Page({
  params,
}: {
  params: { budgetCertificationId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-certifications/${params.budgetCertificationId}/find`,
    }).exec(),
  ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  return (
    <EditBase
      title={"Editar registro de certificacion presupuestaria"}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={constant.listUrl({})}
              persists={constant.getPerst()}
            />
          }
        />
      }
    >
      <BudgetCertificationEditForm registerToEdit={registerToEdit} />
    </EditBase>
  )
}
