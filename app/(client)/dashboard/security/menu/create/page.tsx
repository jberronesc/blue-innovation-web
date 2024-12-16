import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import MenuConst from "../domain/constantClient"
import MenuCreateForm from "./components/CreateForm"

const constant = MenuConst

export default async function Page() {
  return (
    <CreateBase
      title={"Nuevo registro de menus"}
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
      <MenuCreateForm />
    </CreateBase>
  )
}
