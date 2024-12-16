import React from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import ConfigSystemSlice from "../../reduxt-toolkit/slices/configSystemSlice"

export const ButtonsEditReplaceCancel = ({ url }: { url: string }) => {
  const { replace } = useRouter()
  const dispatch = useDispatch()

  return (
    <button
      className={`btn-danger`}
      onClick={() => {
        dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
        replace(url)
      }}
      type="button"
    >
      Cancelar
    </button>
  )
}
