import { BreadcrumbBtnBack } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import { Breadcrumbs } from "@nextui-org/react"
import SupplierConstCli from "../domain/constantClient"
import SupplierCreateForm from "./components/create-form"

export default async function Page() {
  return (
    <CreateBase
      title={"Nuevo registro de suppliers"}
      breadcrumbs={
        <Breadcrumbs
          right={
            <BreadcrumbBtnBack
              url={SupplierConstCli.listUrl({})}
              persists={SupplierConstCli.getPerst()}
            />
          }
        />
      }
    >
      <SupplierCreateForm />
    </CreateBase>
  )
}
