import { randomUUID } from "crypto";
import { notFound } from "next/navigation";
import { ListBase } from "@component/crud";
import UserConst from "../domain/constantClient";
import UserSearch from "./components/Search";
import { Pagination } from "@component/pagination";
import UserTable from "./components/Table";
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation";

const constant = UserConst;

export default async function Page({
  searchParams,
}: {
  searchParams?: { [x: string]: string };
}) {
  const searchP = await searchParams;
  const query = searchP?.[constant.pQ.query.key] || "";
  const page = Number(searchP?.[constant.pQ.page.key]) || 1;
  const dateStart = searchP?.[constant.pQ.dateStart.key] || "";
  const dateEnd = searchP?.[constant.pQ.dateEnd.key] || "";
  const provokeBack = randomUUID().toString();

  const [regitersRes] = await Promise.all([
    await new FetchBackGETTokenBlueI({
      url: "/security/v1/users/list",
      shearhParams: {
        page: page.toString(),
        ...(query && { query }),
        ...(dateStart && { dateStart }),
        ...(dateEnd && { dateEnd }),
      },
    }).exec(),
  ]);

  const registersData = regitersRes.getRight()
    ? regitersRes.getRight().data
    : notFound();

  return (
    <ListBase
      provokeBack={provokeBack}
      title="Usuarios"
      info={<UserSearch provokeBack={provokeBack} />}
      pagination={
        <Pagination
          itemCount={+registersData.count}
          pageName={constant.pQ.page.key}
        />
      }
    >
      <UserTable registers={registersData.results} />
    </ListBase>
  );
}
