"use client"

import ConfigSystemSlice from "@rdtkl/slices/configSystemSlice"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

const Load = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ConfigSystemSlice.actions.createDetailErrorsReset())
    dispatch(ConfigSystemSlice.actions.updateLoadingSide(false))
  }, [])

  return <div></div>
}

export default Load
