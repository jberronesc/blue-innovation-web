import { randomUUID } from "crypto"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { ListBase } from "@component/crud"
import { Pagination } from "@nextui-org/react"
import TransactionConstCli from "../domain/constantClient"
import SupplierSearch from "./components/search"
import SupplierTable from "./components/table"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const query = searchParams?.[TransactionConstCli.pQ.query] || ""
  const page = Number(searchParams?.[TransactionConstCli.pQ.page]) || 1
  const sequence = searchParams?.[TransactionConstCli.pQ.sequence] || ""
  const sequenceType = searchParams?.[TransactionConstCli.pQ.sequenceType] || ""
  const type = searchParams?.[TransactionConstCli.pQ.type] || ""
  const classRegister =
    searchParams?.[TransactionConstCli.pQ.classRegister] || ""
  const dateStart = searchParams?.[TransactionConstCli.pQ.dateStart] || ""
  const dateEnd = searchParams?.[TransactionConstCli.pQ.dateEnd] || ""
  const provokeBack = randomUUID().toString()

  const shearhParams = () => {
    let result: { [x: string]: string } = {
      page: page.toString(),
    }
    if (query) result["query"] = query
    if (sequence) result["sequence"] = sequence
    if (sequenceType) result["sequenceType"] = sequenceType
    if (type) result["type"] = type
    if (classRegister) result["classRegister"] = classRegister
    if (dateStart) result["dateStart"] = dateStart
    if (dateEnd) result["dateEnd"] = dateEnd

    return result
  }

  const [response] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/v1/transactions",
      shearhParams: shearhParams(),
    }).exec(),
  ])

  if (response.isLeft()) notFound()

  const responseJson = response.getRight().data

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Suppliers"
      info={<SupplierSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+responseJson.meta.itemCount}
          pageName={TransactionConstCli.pQ.page}
        />
      }
    >
      <SupplierTable registers={responseJson.data} />
    </ListBase>
  )
}
