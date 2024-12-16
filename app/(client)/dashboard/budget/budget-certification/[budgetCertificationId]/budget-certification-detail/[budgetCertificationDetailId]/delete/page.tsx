import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { DeleteBase } from "@component/crud"
import { notFound } from "next/navigation"
import BudgetCertificationDetailConst from "../../domain/constantClient"
import BudgetCertificationDetailDeleteForm from "./components/DeleteForm"

const constant = BudgetCertificationDetailConst

export default async function Page({
  params,
}: {
  params: {
    budgetCertificationId: string
    budgetCertificationDetailId: string
  }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/budget/v1/budget-certification-details/${params.budgetCertificationDetailId}/find`,
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
              url={constant.listUrl({ ...params })}
              persists={constant.getPerst()}
            />
          }
        />
      }
    >
      <BudgetCertificationDetailDeleteForm
        registerToEdit={registerToEdit}
        params={params}
      />
    </DeleteBase>
  )
}
