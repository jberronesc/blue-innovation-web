import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import BudgetConst from "../domain/constantClient"
import BudgetCreateForm from "./components/CreateForm"
import { BudgetExerciseNextCreateEntity } from "../domain/interfaces/BudgetExerciseNextCreateEntity"
import { notFound } from "next/navigation"

const constant = BudgetConst

export default async function Page() {
  const [exerciseNextCreateRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/budget/v1/budgets/exercise-next-create",
    }).exec(),
  ])

  const exercise = exerciseNextCreateRes.isRight()
    ? (exerciseNextCreateRes.getRight().data as BudgetExerciseNextCreateEntity)
    : notFound()

  return (
    <CreateBase
      title={"Nuevo registro de presupuesto"}
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
      <BudgetCreateForm exercise={exercise} />
    </CreateBase>
  )
}
