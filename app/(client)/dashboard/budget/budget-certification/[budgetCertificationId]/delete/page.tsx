import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import BudgetCertificationConst from "@budget/budget-certification/domain/constantClient"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { DeleteBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetCertificationDeleteForm from "./components/DeleteForm"

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
    <DeleteBase
      title={"Eliminar registro."}
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
      <BudgetCertificationDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  )
}
