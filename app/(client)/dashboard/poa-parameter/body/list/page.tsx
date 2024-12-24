import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { ListBase } from "@component/crud";
import { randomUUID } from "crypto";
import { notFound } from "next/navigation";
import BodyConst from "../domain/constantClient";
import BodySearch from "./components/Search";
import BodyTable from "./components/Table";
import { Pagination } from "@component/pagination";

const constant = BodyConst;

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
      url: "/poa-parameter/v1/bodies/list",
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
      title="Organismos"
      info={<BodySearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <BodyTable registers={registersData.results} />
    </ListBase>
  );
}
