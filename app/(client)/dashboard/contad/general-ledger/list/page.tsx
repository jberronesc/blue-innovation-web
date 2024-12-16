import { ListBase } from "@component/crud"
import { randomUUID } from "crypto"
import { unstable_noStore as noStore } from "next/cache"
import GeneralLedgerTable from "./components/table"

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string }
}) {
  noStore()
  const provokeBack = randomUUID().toString()

  return (
    <ListBase provokeBack={provokeBack} title="Libro mayor">
      <GeneralLedgerTable />
    </ListBase>
  )
}
