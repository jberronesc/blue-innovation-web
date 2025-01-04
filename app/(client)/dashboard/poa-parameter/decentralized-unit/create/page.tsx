import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb";
import { CreateBase } from "@component/crud";
import DecentralizedUnitConst from "../domain/constantClient";
import DecentralizedUnitCreateForm from "./components/CreateForm";

const constant = DecentralizedUnitConst;

export default async function Page() {
  return (
    <CreateBase
      title="Nuevo registro de Unidad Desconcentrada"
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
      <DecentralizedUnitCreateForm />
    </CreateBase>
  );
}
