import { randomUUID } from "crypto";
import { notFound } from "next/navigation";
import { ListBase } from "@component/crud";
import { MenuActiveEntity } from "@security/menu/domain/interfaces/MenuActiveEntity";
import ModuleConst from "../domain/constantClient";
import ModuleSearch from "./components/Search";
import ModuleTable from "./components/Table";
import { Pagination } from "@component/pagination";
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";

const constant = ModuleConst;

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string };
}) {
  const searchP = await searchParams;
  const page = Number(searchP?.[constant.pQ.page.key]) || 1;
  const query = searchP?.[constant.pQ.query.key] || "";
  const menu = searchP?.[constant.pQ.menu.key] || "";
  const provokeBack = randomUUID().toString();

  const [regitersRes, menuRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/modules/list",
      shearhParams: {
        page: page.toString(),
        ...(query && { query }),
        ...(menu && { menu }),
      },
    }).exec(),
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/menus/actives",
    }).exec(),
  ]);

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound();
  const menus = menuRes.getRight()
    ? (menuRes.getRight().data as MenuActiveEntity[])
    : [];

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Modulos"
      info={<ModuleSearch menus={menus} provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <ModuleTable registers={registersData.results} />
    </ListBase>
  );
}
