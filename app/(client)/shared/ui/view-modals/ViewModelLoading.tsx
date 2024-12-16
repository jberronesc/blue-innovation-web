"use client"

import {
  ErrorDefault,
  SuccessResult,
} from "@/app/backend/shared/utils/either/errorCustomEither"
import ConfigSystemSlice from "../reduxt-toolkit/slices/configSystemSlice"
import { useDispatch } from "react-redux"
import ToastifyUtil from "../../utils/toastify/toastify"
import { useCallback } from "react"

export const ViewModelLoading = ({}) => {
  const dispatch = useDispatch()

  const loadingSimple = () => {
    dispatch(ConfigSystemSlice.actions.updateLoading(true))
  }
  const errorSimple = ({ error }: { error: ErrorDefault }) => {
    dispatch(ConfigSystemSlice.actions.updateLoading(false))
    ToastifyUtil.error(error.message)
  }

  const errorMessage = ({ message }: { message: string }) => {
    dispatch(ConfigSystemSlice.actions.updateLoading(false))
    ToastifyUtil.error(message)
  }

  const succesSimple = useCallback(
    ({
      value,
      message = "Registro actualizado con exito!",
    }: {
      value?: SuccessResult
      message?: string
    }) => {
      ToastifyUtil.info(message)
      dispatch(ConfigSystemSlice.actions.updateLoading(false))
      dispatch(ConfigSystemSlice.actions.updateLoadingSide(true))
    },
    []
  )

  const succesSimpleWithoutLoadings = useCallback(
    ({
      value,
      message = "Registro actualizado con exito!",
    }: {
      value?: SuccessResult
      message?: string
    }) => {
      ToastifyUtil.info(message)
      dispatch(ConfigSystemSlice.actions.updateLoading(false))
      dispatch(ConfigSystemSlice.actions.updateLoadingSide(false))
    },
    []
  )

  const succesNoMessageWithoutLoadings = useCallback(() => {
    dispatch(ConfigSystemSlice.actions.updateLoading(false))
    dispatch(ConfigSystemSlice.actions.updateLoadingSide(false))
  }, [])

  return {
    loadingSimple,
    errorSimple,
    errorMessage,
    succesSimple,
    succesSimpleWithoutLoadings,
    succesNoMessageWithoutLoadings,
  }
}
