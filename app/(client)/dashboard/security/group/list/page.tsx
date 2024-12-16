import { randomUUID } from "crypto";
import { notFound } from "next/navigation";
import { ListBase } from "@component/crud";
import GroupConst from "../domain/constantClient";
import GroupSearch from "./components/Search";
import GroupTable from "./components/Table";
import { Pagination } from "@component/pagination";
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";

const constant = GroupConst;

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string };
}) {
  const searchP = await searchParams;
  const page = Number(searchP?.[constant.pQ.page.key]) || 1;
  const provokeBack = randomUUID().toString();

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/groups/list",
      shearhParams: {
        page: page.toString(),
      },
    }).exec(),
  ]);

  const registersData = regitersRes.isRight()
    ? regitersRes.getRight().data
    : notFound();

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Grupos"
      info={<GroupSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <GroupTable registers={registersData.results} />
    </ListBase>
  );
}
