import React from "react"
import { ReformBudgetDetailLeftListEntity } from "../../domain/interfaces/ReformBudgetDetailLeftListEntity"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"

export const TablePresentateBudgetPartida = ({
  register,
  reformBudget,
}: {
  register: ReformBudgetDetailLeftListEntity
  reformBudget: ReformBudgetFindEntity
}) => {
  const isIncome = reformBudget.isClassModificationIncomeOrExpense
    ? reformBudget.isClassModificationIncome
    : true

  return (
    <>
      {isIncome ? (
        <>
          <b>{register.budgetPartidaIncome!.partida}</b>
          <br />
          {register.budgetPartidaIncome!.name}
        </>
      ) : (
        <>
          <b>{register.budgetPartidaExpense!.partida}</b>
          <br />
          {register.budgetPartidaExpense!.name}
        </>
      )}
    </>
  )
}
