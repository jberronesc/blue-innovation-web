"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ConfigSystemSlice, { ConfigStateI } from "./slices/configSystemSlice"
import AuthSlice, { AuthStateI } from "./slices/authSlice"

import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist"

import thunk from "redux-thunk"

export interface AppStore {
  configSystem: ConfigStateI
  auth: AuthStateI
}

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const rootReducer = combineReducers({
  configSystem: ConfigSystemSlice.reducer,
  auth: AuthSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
// https://redux-toolkit.js.org/usage/usage-guide
/*
const store = configureStore<AppStore>({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
})
*/

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk],
})

export default store
export const persistor = persistStore(store)
