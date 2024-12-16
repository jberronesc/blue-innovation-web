"use client"

import { useSelector } from "react-redux"
import { ReformBudgetFindEntity } from "@budget/reform-budget/domain/interfaces/ReformBudgetFindEntity"
import { ButtonLink } from "@component/button"
import { AppStore } from "@rdtkl/store"
import ReformBudgetDetailRightConst from "../../domain/constantClient"

const constant = ReformBudgetDetailRightConst

const ReformBudgetDetailRightSearch = ({
  params,
  provokeBack: _,
  reformBudget,
}: {
  provokeBack?: string
  params: { reformBudgetId: string }
  reformBudget: ReformBudgetFindEntity
}) => {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <form className="w-full">
      <div className="flex flex-row justify-between">
        <div className="grid gap-6 grid-cols-3"></div>
        <div className="flex justify-end items-center mt-3">
          {permissions?.addReformbudgetdetailright &&
            reformBudget.isStatusAssignedOrReviewed && (
              <span className="ml-3">
                <ButtonLink
                  href={constant.createUrl({
                    reformBudgetId: params.reformBudgetId,
                  })}
                />
              </span>
            )}
        </div>
      </div>
    </form>
  )
}

export default ReformBudgetDetailRightSearch
