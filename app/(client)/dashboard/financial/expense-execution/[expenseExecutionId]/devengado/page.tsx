import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import BudgetCommitmentForm from "@budget/budget-certification/[budgetCertificationId]/approved/components/form"
import BudgetCommitmentConstCli from "@budget/budget-certification/domain/constantClient"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { EditBase } from "@component/crud"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"

export default async function Page({
  params,
}: {
  params: { expenseExecutionId: string }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/expense-executions/${params.expenseExecutionId}`,
    }).exec(),
  ])

  const registerToEdit: any = registerToEditRes.isRight()
    ? registerToEditRes.getRight().data
    : notFound()

  return (
    <EditBase
      title={"Ejecutar devengado"}
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
      <BudgetCommitmentForm registerToEdit={registerToEdit} />
    </EditBase>
  )
}
