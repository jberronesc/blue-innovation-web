import React from "react"
import { ReformBudgetDetailRightListEntity } from "../../domain/interfaces/ReformBudgetDetailRightListEntity"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"

export const TablePresentateBudgetPartida = ({
  register,
  reformBudget,
}: {
  register: ReformBudgetDetailRightListEntity
  reformBudget: ReformBudgetFindEntity
}) => {
  const isExpense = reformBudget.isClassModificationIncomeOrExpense
    ? reformBudget.isClassModificationExpense
    : true

  return (
    <>
      {isExpense ? (
        <>
          <b>{register.budgetPartidaExpense!.partida}</b>
          <br />
          {register.budgetPartidaExpense!.name}
        </>
      ) : (
        <>
          <b>{register.budgetPartidaIncome!.partida}</b>
          <br />
          {register.budgetPartidaIncome!.name}
        </>
      )}
    </>
  )
}
