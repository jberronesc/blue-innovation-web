"use client";

import { createSlice } from "@reduxjs/toolkit";
import { ReduxToolKinConstant } from "../contants";

interface GeneralLedgerI {
  id: number;
  dateOpen: string;
  dateClose: string;
  isClosed: boolean;
  dateIsClosed: boolean;
  month: string;
  monthDisplay: string;
}

export interface UserStateI {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  names: string;
  namesShort: string;
}

export interface GroupStateI {
  id: number;
  name: string;
}

export interface ModuleStateI {
  id: number;
  name: string;
  url: string;
  urlMatch: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface AuthMenuStateI {
  id: number;
  name: string;
  icon: string;
  isSelected: boolean;
  isColored: boolean;
  modules: ModuleStateI[];
}

export interface ExerciseI {
  id: number;
  year: number;
}

export interface AuthStateI {
  user: UserStateI;
  group: GroupStateI;
  menus: AuthMenuStateI[];
  permissions: { [x: string]: string };
  accessToken: string;
  generalLedger: GeneralLedgerI;
  generalLedgers: GeneralLedgerI[];
  exercise: ExerciseI;
}

const initialState: AuthStateI = {
  user: {
    id: 0,
    username: "Anonimo",
    firstName: "Anonimo",
    lastName: "Anonimo",
    email: "anonimo@gmail.com",
    names: "Anonimo",
    namesShort: "Anonimo",
  },
  group: {
    id: 0,
    name: "Sin Grupo/Role",
  },
  accessToken: "",
  menus: [],
  permissions: {},
  generalLedger: {
    id: 0,
    dateOpen: "2024-01-01",
    dateClose: "2024-01-01",
    isClosed: true,
    dateIsClosed: true,
    month: "NA",
    monthDisplay: "NA",
  },
  generalLedgers: [],
  exercise: {
    id: 0,
    year: 0,
  },
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    updateAll: (state, action) => {
      const data = { ...state, ...action.payload };

      localStorage.setItem(
        ReduxToolKinConstant.localStorage.keyData,
        JSON.stringify(data),
      );

      return data;
    },
    updateGeneralLedger: (state, action) => {
      const data = {
        ...state,
        generalLedger: action.payload.generalLedger,
        accessToken: action.payload.accessToken,
      };

      localStorage.setItem(
        ReduxToolKinConstant.localStorage.keyData,
        JSON.stringify(data),
      );

      return data;
    },
    openMenu: (state, { payload: { pathname, menuId } }) => {
      return {
        ...state,
        menus: state.menus.map((menu) => {
          if (menu.id == menuId)
            return {
              ...menu,
              isSelected: true,
              isColored: true,
            };

          const isSelected =
            pathname == "/dashboard"
              ? false
              : menu.modules.some(
                  (module) =>
                    module.urlMatch.length > 10 &&
                    pathname.indexOf(module.urlMatch) >= 0,
                );

          return {
            ...menu,
            isSelected: false,
            isColored: isSelected,
          };
        }),
      };
    },
    goDahsboard: (state) => ({
      ...state,
      isSelected: false,
      isColored: false,
    }),
    defaultFirst: (state, { payload: { pathname } }) => {
      return {
        ...state,
        menus: state.menus.map((menu) => {
          const isSelected =
            pathname == "/dashboard"
              ? false
              : menu.modules.some(
                  (module) =>
                    module.urlMatch.length > 10 &&
                    pathname.indexOf(module.urlMatch) >= 0,
                );

          return {
            ...menu,
            isSelected,
            isColored: isSelected,
          };
        }),
      };
    },
    reset: () => initialState,
  },
});

export default AuthSlice;
