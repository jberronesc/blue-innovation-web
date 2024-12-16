import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"
import { CreateBase } from "@component/crud"
import BudgetCertificationConst from "../domain/constantClient"
import BudgetCertificationCreateForm from "./components/CreateForm"

const constant = BudgetCertificationConst

export default async function Page() {
  return (
    <CreateBase
      title={"Nuevo registro de certificacion presupuestaria"}
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
      <BudgetCertificationCreateForm />
    </CreateBase>
  )
}
