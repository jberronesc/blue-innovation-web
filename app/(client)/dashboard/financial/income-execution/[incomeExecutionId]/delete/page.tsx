import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import BudgetCommitmentDeleteForm from "@budget/budget-certification/[budgetCertificationId]/delete/components/delete-form"
import BudgetCommitmentConstCli from "@budget/budget-certification/domain/constantClient"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { DeleteBase } from "@component/crud"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"

export default async function Page({
  params,
}: {
  params: { incomeExecutionId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-executions/${params.incomeExecutionId}`,
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
              url={BudgetCommitmentConstCli.listUrl({})}
              persists={BudgetCommitmentConstCli.getPerst()}
            />
          }
        />
      }
    >
      <BudgetCommitmentDeleteForm registerToEdit={registerToEdit} />
    </DeleteBase>
  )
}
