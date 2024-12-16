export type FetchBaseParams = {
  url: string
  configExtra?: { [x: string]: any }
}

export type FetchBaseParamsGET = {
  shearhParams?: { [x: string]: any }
}

export type FetchParamsGET = FetchBaseParams & FetchBaseParamsGET

export type FetchBaseParamsPOST = {
  body: { [x: string]: any }
}

export type FetchParamsPOST = FetchBaseParams & FetchBaseParamsPOST

export type FetchParamsDELETE = FetchBaseParams
