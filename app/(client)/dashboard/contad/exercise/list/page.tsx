import { randomUUID } from "crypto"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { ListBase } from "@component/crud"
import ExerciseConst from "../domain/constantClient"
import ExerciseTable from "./components/Table"
import { Pagination } from "@component/pagination"
import ExerciseSearch from "./components/Search"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

const constant = ExerciseConst

export default async function Page({
  searchParams: searchP,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const page = Number(searchP?.[constant.pQ.page.key]) || 1
  const provokeBack = randomUUID().toString()

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/contad/v1/exercises/list",
      shearhParams: {
        page: page.toString(),
      },
    }).exec(),
  ])

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound()

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Ejercicios"
      info={<ExerciseSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <ExerciseTable registers={registersData.results} />
    </ListBase>
  )
}
