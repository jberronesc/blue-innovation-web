import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { CreateBase } from "@component/crud";
import BodyConst from "../domain/constantClient";
import BodyCreateForm from "./components/CreateForm";

const constant = BodyConst;

export default async function Page() {
  return (
    <CreateBase
      title="Nuevo registro de organismos"
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
      <BodyCreateForm />
    </CreateBase>
  );
}
