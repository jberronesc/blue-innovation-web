import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { DeleteBase } from "@component/crud"
import { Breadcrumbs } from "@nextui-org/react"
import { notFound } from "next/navigation"
import IncomeAffectationConstCli from "../../domain/constantClient"
import IncomeAffectationDeleteForm from "./components/delete-form"

export default async function Page({
  params,
}: {
  params: {
    incomeExecutionId: string
    incomeAffectationId: string
  }
}) {
  const [registerToEditRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: `/v1/income-affectations/${params.incomeAffectationId}`,
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
              url={IncomeAffectationConstCli.listUrl({ ...params })}
              persists={IncomeAffectationConstCli.getPerst()}
            />
          }
        />
      }
    >
      <IncomeAffectationDeleteForm
        registerToEdit={registerToEdit}
        params={params}
      />
    </DeleteBase>
  )
}
