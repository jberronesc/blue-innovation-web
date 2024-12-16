"use client"

import { ButtonLink } from "@component/button"
import { ExpenseExecutionGetEntity } from "@financial/expense-execution/domain/interfaces/ExpenseExecutionGetEntity"
import { AppStore } from "@rdtkl/store"
import { useSelector } from "react-redux"
import ExpenseExecutionBudgetCommitmentConstCli from "../../domain/constantClient"

const IncomeAffectationSearch = ({
  params,
  expenseExecution,
}: {
  provokeBack?: string
  params: { expenseExecutionId: string }
  expenseExecution: ExpenseExecutionGetEntity
}) => {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <>
      <form className="w-full">
        <div className="flex flex-row justify-between">
          <div className="flex justify-end items-center mt-3">
            {permissions?.IncomeAffectationCreate &&
              expenseExecution.isStatusExecution && (
                <span className="ml-3">
                  <ButtonLink
                    href={ExpenseExecutionBudgetCommitmentConstCli.createUrl({
                      expenseExecutionId: params.expenseExecutionId,
                    })}
                  />
                </span>
              )}
          </div>
        </div>
      </form>
    </>
  )
}

export default IncomeAffectationSearch
