"use client"

import { createSlice } from "@reduxjs/toolkit"

interface DetailErrors {
  message: ""
  errors: any[]
}

export interface ConfigStateI {
  checkingMain: boolean
  isLoading: boolean
  isLoading1: boolean
  isLoading2: boolean
  isLoading3: boolean
  isLoading4: boolean
  isOpenSidebar: boolean

  isLoadingSide: boolean

  editDetailErrors: DetailErrors
  createDetailErrors: DetailErrors
  deleteDetailErrors: DetailErrors
}

const initialDetailErrors: DetailErrors = {
  message: "",
  errors: [],
}

const initialState: ConfigStateI = {
  checkingMain: true,
  isLoading: false,
  isLoading1: false,
  isLoading2: false,
  isLoading3: false,
  isLoading4: false,
  isOpenSidebar: true,

  isLoadingSide: false,

  editDetailErrors: initialDetailErrors,
  createDetailErrors: initialDetailErrors,
  deleteDetailErrors: initialDetailErrors,
}

export const ConfigSystemSlice = createSlice({
  name: "configSystem",
  initialState,
  reducers: {
    updateLoading: (state, action) => ({ ...state, isLoading: action.payload }),
    changeOpenSidebar: (state) => ({
      ...state,
      isOpenSidebar: !state.isOpenSidebar,
    }),
    checkingInChecking: (state) => ({ ...state, checkingMain: true }),
    checkingInNoChecking: (state) => ({ ...state, checkingMain: false }),

    updateLoadingSide: (state, action) => ({
      ...state,
      isLoadingSide: action.payload,
    }),

    updateLoadingAndLoadingSide: (state, action) => ({
      ...state,
      isLoadingSide: action.payload,
      isLoading: action.payload,
    }),

    editDetailErrorsUpdate: (state, action) => ({
      ...state,
      editDetailErrors: { ...state.editDetailErrors, ...action.payload },
    }),
    editDetailErrorsReset: (state) => ({
      ...state,
      editDetailErrors: initialDetailErrors,
    }),

    createDetailErrorsUpdate: (state, action) => ({
      ...state,
      createDetailErrors: { ...state.createDetailErrors, ...action.payload },
    }),
    createDetailErrorsReset: (state) => ({
      ...state,
      createDetailErrors: initialDetailErrors,
    }),

    deleteDetailErrorsUpdate: (state, action) => ({
      ...state,
      deleteDetailErrors: { ...state.deleteDetailErrors, ...action.payload },
    }),
    deleteDetailErrorsReset: (state) => ({
      ...state,
      deleteDetailErrors: initialDetailErrors,
    }),

    reset: () => initialState,
  },
})

export default ConfigSystemSlice
