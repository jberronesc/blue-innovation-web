"use client"

import { useSelector } from "react-redux"
import BudgetConst from "@budget/budget/domain/constantClient"
import { ButtonLink } from "@component/button"
import { AppStore } from "@rdtkl/store"

const constant = BudgetConst

const BudgetSearch = ({}: { provokeBack?: string }) => {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <form className="w-full">
      <div className="flex flex-row justify-between">
        <div className="flex justify-end items-center mt-3">
          {permissions?.addBudget && (
            <span>
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

export default BudgetSearch
