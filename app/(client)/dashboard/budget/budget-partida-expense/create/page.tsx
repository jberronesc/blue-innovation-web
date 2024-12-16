import { CreateBase } from "@component/crud"
import BudgetPartidaExpenseConst from "../domain/constantClient"
import BudgetPartidaExpenseCreateForm from "./components/CreateForm"
import { BreadcrumbBtnBack, Breadcrumbs } from "@component/breadcrumb"

const constant = BudgetPartidaExpenseConst

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
      <BudgetPartidaExpenseCreateForm />
    </CreateBase>
  )
}
