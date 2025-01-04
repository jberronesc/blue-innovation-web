import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { ListBase } from "@component/crud";
import { randomUUID } from "crypto";
import { notFound } from "next/navigation";
import DecentralizedUnitConst from "../domain/constantClient";
import DecentralizedUnitSearch from "./components/Search";
import DecentralizedUnitTable from "./components/Table";
import { Pagination } from "@component/pagination";

const constant = DecentralizedUnitConst;

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string };
}) {
  const searchP = await searchParams;
  const page = Number(searchP?.[constant.pQ.page.key]) || 1;
  const query = searchP?.[constant.pQ.query.key] || "";
  const provokeBack = randomUUID().toString();

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/poa-parameter/v1/decentralized-units/list",
      shearhParams: {
        page: page.toString(),
        ...(query && { query }),
      },
    }).exec(),
  ]);

  const registersData = regitersRes.isRight()
    ? regitersRes.getRight().data
    : notFound();

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Unidad Desconcentradas"
      info={<DecentralizedUnitSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <DecentralizedUnitTable registers={registersData.results} />
    </ListBase>
  );
}
