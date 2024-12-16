"use client"

import { useSelector } from "react-redux"
import { ButtonLink } from "@component/button"
import { AppStore } from "@rdtkl/store"
import ExerciseConst from "@contad/exercise/domain/constantClient"

const constant = ExerciseConst

const ExerciseSearch = ({}: { provokeBack?: string }) => {
  const { permissions } = useSelector((store: AppStore) => store.auth)

  return (
    <form className="w-full">
      <div className="flex flex-row justify-between">
        <div className="flex justify-end items-center mt-3">
          {permissions?.addExercise && (
            <span>
              <ButtonLink href={constant.createUrl({})} />
            </span>
          )}
        </div>
      </div>
    </form>
  )
}

export default ExerciseSearch
