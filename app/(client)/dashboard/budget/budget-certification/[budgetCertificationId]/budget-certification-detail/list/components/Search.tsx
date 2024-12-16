"use client"

import { useSelector } from "react-redux"
import { BudgetCertificationFindEntity } from "@budget/budget-certification/domain/interfaces/BudgetCertificationFindEntity"
import { ButtonLink } from "@component/button"
import { AppStore } from "@rdtkl/store"
import BudgetCertificationDetailConst from "../../domain/constantClient"

const constant = BudgetCertificationDetailConst

const BudgetCertificationDetailSearch = ({
  params,
  provokeBack,
  budgetCertification,
}: {
  provokeBack?: string
  params: { budgetCertificationId: string }
  budgetCertification: BudgetCertificationFindEntity
}) => {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <form className="w-full">
      <div className="flex flex-row justify-between">
        <div className="grid gap-6 grid-cols-3"></div>
        <div className="flex justify-end items-center mt-3">
          {permissions?.addBudgetcertificationdetail &&
            budgetCertification.isStatusAssignedOrReviewed && (
              <span className="ml-3">
                <ButtonLink
                  href={constant.createUrl({
                    budgetCertificationId: params.budgetCertificationId,
                  })}
                />
              </span>
            )}
        </div>
      </div>
    </form>
  )
}

export default BudgetCertificationDetailSearch
