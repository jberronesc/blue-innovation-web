import { CreateBase } from "@component/crud"
import BudgetPartidaIncomeConst from "../domain/constantClient"
import BudgetPartidaIncomeCreateForm from "./components/CreateForm"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"

const constant = BudgetPartidaIncomeConst

export default async function Page() {
  return (
    <CreateBase
      title={"Nuevo registro de partida presupuestaria de ingreso"}
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
      <BudgetPartidaIncomeCreateForm />
    </CreateBase>
  )
}
