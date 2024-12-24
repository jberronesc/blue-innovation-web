"use client"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ConfigSystemSlice from "../../reduxt-toolkit/slices/configSystemSlice"
import { AppStore } from "../../reduxt-toolkit/store"
import { AlertErrors } from "@component/alert"

interface PropsParams {
  title?: string

  breadcrumbs?: JSX.Element

  children: JSX.Element

  header?: JSX.Element
}

export const DeleteBase = (props: PropsParams) => {
  const dispatch = useDispatch()
  const { deleteDetailErrors } = useSelector(
    (store: AppStore) => store.configSystem
  )

  useEffect(() => {
    dispatch(ConfigSystemSlice.actions.deleteDetailErrorsReset())
    dispatch(ConfigSystemSlice.actions.updateLoadingSide(false))
  }, [])

  return (
    <>
      <div className="w-full px-28 pt-5">
        <div className="flex w-full items-center justify-between">
          {props.breadcrumbs}
        </div>
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold text-default-900 lg:text-3xl">
            {props.title}
          </h1>
        </div>

        {(deleteDetailErrors.message != "" ||
          deleteDetailErrors.errors.length != 0) && (
          <AlertErrors
            message={deleteDetailErrors.message}
            errors={deleteDetailErrors.errors}
          />
        )}
        <div className="mt-20">{props.children}</div>
      </div>
    </>
  )
}