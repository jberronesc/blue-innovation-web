import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";
import { ListBase } from "@component/crud";
import { randomUUID } from "crypto";
import { notFound } from "next/navigation";
import MenuConst from "../domain/constantClient";
import MenuSearch from "./components/Search";
import MenuTable from "./components/Table";
import { Pagination } from "@component/pagination";

const constant = MenuConst;

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string };
}) {
  const searchP = await searchParams;
  const query = searchP?.[constant.pQ.query.key] || "";
  const page = Number(searchP?.[constant.pQ.page.key]) || 1;
  const provokeBack = randomUUID().toString();

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/menus/list",
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
      title="Menus"
      info={<MenuSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <MenuTable registers={registersData.results} />
    </ListBase>
  );
}
