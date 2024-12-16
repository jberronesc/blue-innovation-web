import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import ExerciseConst from "../domain/constantClient"
import ExerciseCreateForm from "./components/CreateForm"
import { ExerciseNextCreateInfoEntity } from "../domain/interfaces/ExerciseNextCreateInfoEntity"
import { notFound } from "next/navigation"

const constant = ExerciseConst

export default async function Page() {
  const [exerciseRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/contad/v1/exercises/next-create-info",
    }).exec(),
  ])

  const exerciseNextCreateInfo: ExerciseNextCreateInfoEntity =
    exerciseRes.isRight()
      ? (exerciseRes.getRight().data as ExerciseNextCreateInfoEntity)
      : notFound()

  return (
    <CreateBase
      title={"Nuevo registro de ejercicio"}
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
      <ExerciseCreateForm exerciseNextCreateInfo={exerciseNextCreateInfo} />
    </CreateBase>
  )
}
