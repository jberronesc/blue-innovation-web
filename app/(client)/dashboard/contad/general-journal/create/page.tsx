import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"
import { CreateBase } from "@component/crud"
import { AccountAccountantTypePertain } from "@contad/account-accountant/domain/constantClient"
import { AccountAccountantActiveEntity } from "@contad/account-accountant/domain/interfaces/AccountAccountantActiveEntity"
import { CenterCostAllActiveWithoutMainEntity } from "@contad/center-cost/domain/interfaces/CenterCostAllActiveWithoutMainEntity"
import { notFound } from "next/navigation"
import {
  GeneralJournalInfo,
  GeneralJournalBudgetPartida,
} from "../domain/interfaces/GeneralJournalInfoEntity"
import GeneralJournalCreateForm from "./components/create-form"

export default async function Page() {
  const [generalJournalInfoRes, accountAccountantRes, centerCostRes] =
    await Promise.all([
      await new FetchBackGETTokenBlueI({
        url: "/v1/general-journals/info",
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: "/v1/account-accountants/actives",
        shearhParams: {
          typePertain: AccountAccountantTypePertain.ACCOUNT_LEVEL_2.value,
        },
      }).exec(),
      await new FetchBackGETTokenBlueI({
        url: "/v1/center-costs/all-active-without-main",
      }).exec(),
    ])

  const generalJournalInfo = generalJournalInfoRes.isRight()
    ? (generalJournalInfoRes.getRight().data as GeneralJournalInfo)
    : notFound()

  const budgetPartidas: GeneralJournalBudgetPartida[] =
    generalJournalInfo.budgetPartidas

  const accountAccountants = accountAccountantRes.isRight()
    ? (accountAccountantRes.getRight().data as AccountAccountantActiveEntity[])
    : []

  const centerCosts = centerCostRes.isRight()
    ? (centerCostRes.getRight().data as CenterCostAllActiveWithoutMainEntity[])
    : []

  return (
    <CreateBase title={"Diario General"}>
      <GeneralJournalCreateForm
        budgetPartidas={budgetPartidas}
        accountAccountants={accountAccountants}
        generalJournalInfo={generalJournalInfo}
      />
    </CreateBase>
  )
}
